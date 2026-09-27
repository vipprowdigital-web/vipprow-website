// website/app/features/chatbot/hook/useChatbot.ts

"use client";

import { useMutation } from "@tanstack/react-query";
import {
  sendChatMessage,
  type SendChatMessageParams,
} from "../services/chatbot.api";

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: (params: SendChatMessageParams) => sendChatMessage(params),
  });
};
