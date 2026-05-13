import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatBubble({
  text,
  side,
}: {
  text: string;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        side === "right"
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-neutral-800 text-neutral-200"
      )}
    >
      {text || "\u00A0"}
    </motion.div>
  );
}
