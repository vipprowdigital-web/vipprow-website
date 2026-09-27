import Groq from 'groq-sdk';
import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import config from '../config/chatbot.js';

// Created lazily so a missing GROQ_API_KEY doesn't crash the whole server at
// boot — only chat requests fail until the key is set.
let groq;
const getGroq = () => (groq ??= new Groq({ apiKey: config.groq.apiKey }));

const SERVICES = [
  'crm_automation',
  'web_development',
  'ppc_advertising',
  'generative_ai_automation',
  'content_marketing',
  'graphic_design',
  'software_development',
  'social_media_marketing',
  'whatsapp_automation',
];

const SERVICES_DISPLAY = [
  'CRM Automation',
  'Web Development',
  'Pay Per Click Advertising',
  'Generative AI Automation',
  'Content Marketing',
  'Graphic Design',
  'Software Development',
  'Social Media Marketing',
  'WhatsApp Automation',
].join(', ');

/**
 * One schema covers both cases this bot will see on WhatsApp:
 * - a reply from a lead who already got an outreach message (`reply_classification`)
 * - a fresh, unprompted message from someone inquiring cold (`lead_inquiry`)
 * `reply` is the actual text to send back; `intent` is what gets stored against the lead.
 */
const ExtractionSchema = z.object({
  reply: z.string(),
  intent: z.object({
    type: z.enum(['reply_classification', 'lead_inquiry']),
    status: z.enum(['interested', 'not_interested', 'needs_info', 'other']).nullable(),
    name: z.string().nullable(),
    business: z.string().nullable(),
    serviceInterested: z.enum(SERVICES).nullable(),
    request: z.string().nullable(),
    urgency: z.enum(['low', 'medium', 'high']).nullable(),
    contactPhone: z.string().nullable(),
    contactEmail: z.string().nullable(),
    summary: z.string(),
  }),
});

const SYSTEM_PROMPT = `You are Vipprow's AI assistant, embedded directly in the chat widget on Vipprow's own website. The person you're talking to is already on vipprow.com — never tell them to "check out" or "visit" the website, or point them anywhere else for answers. You ARE the way they get answers here.

Vipprow's services are: ${SERVICES_DISPLAY}.

Pricing — read carefully:
- There is no fixed or published price for any service. Cost depends entirely on the visitor's specific scope, which only gets worked out on a call with the team.
- If they ask about price, cost, rate, quote, or "how much" anything is — say plainly that it depends on what they need and gets finalized after a quick call with the team, then ask for their name and phone number so someone can call them with a proper quote. Never invent or estimate a number, range, or "starting from" figure.

Capturing contact details:
- A visitor's phone number is the one thing you must try to get once they seem interested — always ask for it explicitly by name ("your phone number"), never settle for a vague "contact details".
- If they ask about a specific service, or ask a second question about what Vipprow does or how it works, proactively ask for their name and phone number so the team can follow up with specifics. Don't ask on their very first message — wait until they've shown real interest.
- If they decline or dodge the ask once, don't push it again — keep helping them normally.
- A real phone number is either a full international one with a country code ("+" followed by the code and number), or a local one that is exactly 10 digits and does NOT start with 0. Silently apply this — never explain the rule, the digit count, or the format to the visitor. If what they gave doesn't qualify, just say "Please provide a valid phone number." and nothing more. Only put a number in "contactPhone" once it actually looks valid by these rules.

In your replies:
- Never say "academy", "salon", or "business" — don't label or categorize what the visitor runs at all.
- Only mention specific services from the list above — never describe anything else (e.g. lead-capture chatbots, websites-as-a-concept) as something Vipprow offers.
- Talk naturally and helpfully, the way a genuinely useful human rep would — answer whatever they're actually asking, and don't pitch or list out services unprompted.

You will receive the conversation so far with a website visitor. Reply the way a helpful human sales rep would — short, warm, no corporate fluff — and in parallel extract structured intent for our CRM.

Classify "type" as:
- "reply_classification" if this is someone responding to outreach Vipprow already sent them elsewhere (e.g. WhatsApp)
- "lead_inquiry" if this is someone who came to the site and started the conversation themselves (the normal case here)

Respond with ONLY a JSON object matching this exact shape, no prose outside it:
{
  "reply": string,
  "intent": {
    "type": "reply_classification" | "lead_inquiry",
    "status": "interested" | "not_interested" | "needs_info" | "other" | null,
    "name": string | null,
    "business": string | null,
    "serviceInterested": ${SERVICES.map(s => `"${s}"`).join(' | ')} | null,
    "request": string | null,
    "urgency": "low" | "medium" | "high" | null,
    "contactPhone": string | null,
    "contactEmail": string | null,
    "summary": string
  }
}
"business" is the name of the lead's business, if they've given it.
"serviceInterested" is which single Vipprow service (from the exact list above) they've shown interest in. Use null until they've actually indicated interest in something specific.
"summary" is a one-sentence recap of the visitor's overall intent across the WHOLE conversation so far (not just their latest message) — this is what the team reads instead of the full transcript, so make it count.
Use null for any field you can't confidently fill in.`;

/**
 * Runs the conversation so far through Groq and returns a validated
 * { reply, intent } object. `history` is an array of { role, content }
 * messages (role: 'user' | 'assistant'), oldest first.
 */
async function getResponse(history) {
  const completion = await getGroq().chat.completions.create({
    model: config.groq.model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices[0]?.message?.content || '{}';

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Groq returned non-JSON output: ${raw}`);
  }

  const result = ExtractionSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Groq output failed schema validation: ${result.error.message}`);
  }

  return result.data;
}

// A local number with no country code has to look like a real subscriber
// number: exactly 10 digits, never starting with 0 (that's a trunk-prefix
// digit, not part of the actual number — 0987654321 or a 9-digit number
// are both rejected).
const LOCAL_NUMBER_RE = /^[1-9]\d{9}$/;

/**
 * Strips formatting and validates a phone number. Returns the normalized
 * number (E.164 for an international one, digits-only for a local one) or
 * `null` if it doesn't look like a real phone number. The model is told to
 * only extract numbers that look valid, but LLMs don't reliably enforce
 * that — this is the deterministic backstop that actually rejects it.
 */
function normalizePhone(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();

  if (trimmed.startsWith('+')) {
    // Has a country code — validate against that country's real numbering
    // plan (correct length, no invalid leading digits, etc.) instead of
    // just counting digits.
    const parsed = parsePhoneNumberFromString(trimmed);
    return parsed?.isValid() ? parsed.number : null;
  }

  const digits = trimmed.replace(/[\s\-()]/g, '');
  return LOCAL_NUMBER_RE.test(digits) ? digits : null;
}

export { getResponse, ExtractionSchema, normalizePhone };
