import Service from "../models/services/service.model.js";
import Domain from "../models/services/domain.model.js";
import Faq from "../models/faq.model.js";

/**
 * Builds the chatbot's knowledge of the website from the same database the
 * website renders from (services, service categories and FAQs managed in the
 * console). Because it's read live, the chatbot stays in sync with whatever
 * is published on the site — no second copy of the content to maintain.
 *
 * Cached for CACHE_MS so chat requests don't hit the database every time.
 * If a refresh fails, the last good copy keeps being used.
 */
const CACHE_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SERVICE_DESC = 400; // chars per service description
const MAX_FAQ_ANSWER = 500; // chars per FAQ answer
const MAX_TOTAL = 16000; // hard cap on the whole block (LLM cost / context)

let cache = { text: "", at: 0 };
let inflight = null;

// Service descriptions are written in a rich-text editor, so strip HTML.
function plain(text, max) {
  const clean = String(text ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

async function build() {
  const [domains, services, faqs] = await Promise.all([
    Domain.find({ isActive: true }).select("name description").lean(),
    Service.find({ isActive: true })
      .select("title subHeading description domain")
      .sort({ createdAt: 1 })
      .lean(),
    Faq.find({ isActive: true })
      .select("page question answer order")
      .sort({ page: 1, order: 1, createdAt: 1 })
      .lean(),
  ]);

  const domainName = new Map(domains.map((d) => [String(d._id), d.name]));
  const lines = [];

  if (services.length) {
    lines.push("SERVICES PUBLISHED ON THE WEBSITE:");
    for (const s of services) {
      const category = domainName.get(String(s.domain));
      const head = category ? `${s.title} (${category})` : s.title;
      const sub = s.subHeading ? ` — ${plain(s.subHeading, 200)}` : "";
      lines.push(`- ${head}${sub}: ${plain(s.description, MAX_SERVICE_DESC)}`);
    }
  }

  if (faqs.length) {
    lines.push("", "FAQS PUBLISHED ON THE WEBSITE:");
    const seen = new Set();
    for (const f of faqs) {
      const key = f.question.trim().toLowerCase();
      if (seen.has(key)) continue; // same FAQ shown on several pages
      seen.add(key);
      lines.push(`Q: ${plain(f.question, 300)}`, `A: ${plain(f.answer, MAX_FAQ_ANSWER)}`);
    }
  }

  let text = lines.join("\n");
  if (text.length > MAX_TOTAL) text = `${text.slice(0, MAX_TOTAL)}\n…`;
  return text;
}

/** Returns the website-content block for the system prompt ("" if unavailable). */
export async function getWebsiteKnowledge() {
  if (cache.text && Date.now() - cache.at < CACHE_MS) return cache.text;

  inflight ??= build()
    .then((text) => {
      cache = { text, at: Date.now() };
      return text;
    })
    .catch((err) => {
      console.error(`[chat] could not load website content: ${err.message}`);
      return cache.text; // keep the last good copy
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
