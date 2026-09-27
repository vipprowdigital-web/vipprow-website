import "dotenv/config";

// Only what the website chat needs: the Groq LLM and the leads endpoint.
function required(name) {
  const val = process.env[name];
  if (!val) {
    console.warn(
      `[chatbot config] Warning: ${name} is not set in .env — chat features will fail until it is.`,
    );
  }
  return val;
}

export default {
  groq: {
    apiKey: required("GROQ_API_KEY"),
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  },
  leads: {
    url: required("LEADS_URL"),
  },
};
