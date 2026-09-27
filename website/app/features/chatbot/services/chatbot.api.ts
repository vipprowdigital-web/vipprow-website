// website/app/features/chatbot/services/chatbot.api.ts

export interface SendChatMessageParams {
  message: string;
  sessionId: string;
}

export interface SendChatMessageResponse {
  reply: string;
}

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

// POST /chat/message — the server keeps the conversation history per sessionId
export const sendChatMessage = async ({
  message,
  sessionId,
}: SendChatMessageParams): Promise<SendChatMessageResponse> => {
  const res = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    // Surface the server's own message when it has one (e.g. a rate-limit
    // or conversation-limit notice) instead of a generic failure.
    throw new Error(json?.message || `Chat request failed with status ${res.status}`);
  }

  return json.data;
};

// POST /chat/end — tells the server the visitor closed the chat / left the
// page so it can save them as a lead. `keepalive` lets it survive a page unload.
export const endChatSession = (sessionId: string) => {
  try {
    fetch(`${BASE_URL}/chat/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // best-effort — the server also saves the lead after 1 min of inactivity
  }
};
