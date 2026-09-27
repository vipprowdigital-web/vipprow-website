import readline from 'readline';
import { getResponse } from './intentExtractor.service.js';
import { submitLead } from './leadsClient.service.js';

/**
 * Local stand-in for the WhatsApp side: types you play the lead, Groq plays
 * Vipprow's rep. Same getResponse() call the WhatsApp webhook will use later
 * — only the input/output here is different (stdin/stdout vs. the Meta API).
 */
const QUIT_COMMANDS = new Set(['q', 'quit', 'exit']);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const history = [];
let lastIntent = null;

console.log('Chat tester ready. Type a message as the lead, or "q" to quit.\n');

function ask() {
  rl.question('You: ', async (input) => {
    const trimmed = input.trim();

    if (QUIT_COMMANDS.has(trimmed.toLowerCase())) {
      rl.close();
      return;
    }

    if (!trimmed) {
      ask();
      return;
    }

    history.push({ role: 'user', content: trimmed });

    try {
      const { reply, intent } = await getResponse(history);
      history.push({ role: 'assistant', content: reply });
      lastIntent = intent;

      console.log(`\nAI: ${reply}\n`);
      console.log('Extracted intent:', JSON.stringify(intent, null, 2));
      console.log();
    } catch (err) {
      console.error(`\n[error] ${err.message}\n`);
    }

    ask();
  });
}

ask();

rl.on('close', async () => {
  if (!lastIntent) {
    console.log('\nSession ended (nothing to submit).');
    return;
  }

  console.log('\nSubmitting lead...');
  try {
    const lead = await submitLead(lastIntent);
    console.log('Lead submitted:', JSON.stringify(lead, null, 2));
  } catch (err) {
    console.error(`[error] Failed to submit lead: ${err.message}`);
  }

  console.log('\nSession ended.');
});
