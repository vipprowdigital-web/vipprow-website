"use client";

import { useSendChatMessage } from "@/app/features/chatbot/hook/useChatbot";
import { endChatSession } from "@/app/features/chatbot/services/chatbot.api";
import { useChatAutoTrigger } from "@/hooks/useChatAutoTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "../ui/ChatBubble";

const SESSION_STORAGE_KEY = "vipprow_chat_session_id";
const GREETING =
  "Hi there! I'm the Vipprow assistant. Tell me a bit about what you're looking to grow or automate, and I'll point you in the right direction.";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const getSessionId = () => {
  if (typeof window === "undefined") return createId();
  let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!id) {
    id = createId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  }
  return id;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showLauncherHint, setShowLauncherHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sessionIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreetedRef = useRef(false);
  // true once the visitor has said something the server hasn't yet saved as a lead
  const pendingLeadRef = useRef(false);

  const { mutateAsync: sendMessage, isPending } = useSendChatMessage();

  const greet = () => {
    if (hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "assistant", content: GREETING },
    ]);
  };

  const openWidget = () => {
    setOpen(true);
    greet();
  };

  // Tell the server the visitor is done so it saves them as a lead.
  const endChat = () => {
    if (!pendingLeadRef.current) return;
    pendingLeadRef.current = false;
    endChatSession(sessionIdRef.current);
  };

  const closeWidget = () => {
    setOpen(false);
    endChat();
  };

  // Visitor leaves / refreshes the page mid-conversation
  useEffect(() => {
    const onPageHide = () => endChat();
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  });

  // Auto-open once per session, ~10s after the visitor lands on the page —
  // pops the full chat box open (with the greeting), not just a hint.
  useChatAutoTrigger(() => {
    openWidget();
  });

  // If the visitor dismisses the auto-open (or it never fires), keep a subtle
  // hint on the launcher so the widget doesn't feel dead.
  useEffect(() => {
    if (open) {
      setShowLauncherHint(false);
      return;
    }
    const timer = window.setTimeout(() => setShowLauncherHint(true), 12_000);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isPending]);

  const handleToggle = () => {
    if (open) {
      closeWidget();
      return;
    }
    openWidget();
    setShowLauncherHint(false);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isPending) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    pendingLeadRef.current = true;

    try {
      const res = await sendMessage({
        message: text,
        sessionId: sessionIdRef.current,
      });
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", content: res.reply },
      ]);
    } catch (err) {
      // Rate-limit / conversation-limit responses carry a real, user-facing
      // message from the server — show that instead of a generic fallback.
      const content =
        err instanceof Error && err.message
          ? err.message
          : "Sorry, I couldn't reach the assistant right now. Please try again in a moment.";
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", content },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-[70vh] max-h-140 w-[calc(100vw-2.5rem)] sm:w-95 flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-blue-900/40 to-transparent px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-medium text-white">
                    Vipprow Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeWidget}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  text={m.content}
                  side={m.role === "user" ? "right" : "left"}
                />
              ))}

              {isPending && (
                <div className="mr-auto flex items-center gap-1 rounded-2xl bg-neutral-800 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.2s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 border-t border-white/10 p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                rows={1}
                className="max-h-24 flex-1 resize-none rounded-xl bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-blue-500/50"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isPending}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <div className="relative">
        <AnimatePresence>
          {!open && showLauncherHint && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-neutral-900 px-3 py-1.5 text-xs text-white/80 shadow-lg"
            >
              Need help? Chat with us
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={handleToggle}
          aria-label={open ? "Close chat" : "Open chat"}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-blue-500/60 animate-ping" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
