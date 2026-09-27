import { handleMessage, endSession } from "../services/chatSession.service.js";

const SESSION_ID_RE = /^[A-Za-z0-9_-]{8,100}$/;
const MAX_MESSAGE_LENGTH = 1000;

/**
 * POST /api/v1/chat/message   { sessionId, message }  ->  { data: { reply } }
 */
export const sendMessage = async (req, res) => {
  const { sessionId, message } = req.body ?? {};

  if (typeof sessionId !== "string" || !SESSION_ID_RE.test(sessionId)) {
    return res
      .status(400)
      .json({ success: false, message: "A valid sessionId is required." });
  }
  if (typeof message !== "string" || !message.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Message is required." });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  try {
    const reply = await handleMessage(sessionId, message.trim());
    return res.status(200).json({ success: true, data: { reply } });
  } catch (err) {
    if (err.status === 429) {
      return res.status(429).json({ success: false, message: err.message });
    }
    console.error("[chat] message failed:", err.message);
    return res.status(502).json({
      success: false,
      message: "The assistant is unavailable right now. Please try again.",
    });
  }
};

/**
 * POST /api/v1/chat/end   { sessionId }
 * Called when the visitor closes the chat or leaves the page — saves the lead.
 * Responds immediately; the lead submission continues in the background so a
 * page unload doesn't have to wait on it.
 */
export const endChat = async (req, res) => {
  const { sessionId } = req.body ?? {};

  if (typeof sessionId !== "string" || !SESSION_ID_RE.test(sessionId)) {
    return res
      .status(400)
      .json({ success: false, message: "A valid sessionId is required." });
  }

  endSession(sessionId, "closed").catch(() => {});
  return res.status(202).json({ success: true });
};
