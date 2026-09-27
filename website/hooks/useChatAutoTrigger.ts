"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "vipprow_chat_auto_opened";
const DWELL_DELAY_MS = 10_000;

/**
 * Fires `onTrigger` once per browser session, ~`DWELL_DELAY_MS` after the
 * visitor lands on the page. Tracked via sessionStorage so it never fires
 * twice in the same session (e.g. after navigating to another page or
 * closing the widget).
 */
export function useChatAutoTrigger(onTrigger: () => void) {
  const firedRef = useRef(false);
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => {
      if (firedRef.current) return;
      firedRef.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      onTriggerRef.current();
    }, DWELL_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);
}
