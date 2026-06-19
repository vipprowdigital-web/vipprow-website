"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[][];
      loaded: boolean;
      version: string;
      push?: (...args: unknown[]) => void;
      _fbq?: Window["fbq"];
    };
    _fbq?: Window["fbq"];
  }
}

export default function LazyMetaPixel() {
  useEffect(() => {
    const load = () => {
      if (window.fbq?.loaded) return;

      // Install the command-queue stub BEFORE fbevents.js loads.
      // fbevents.js calls fbq() internally on line 20 — it needs this stub to exist.
      if (!window.fbq) {
        const fbq = function (...args: unknown[]) {
          if (fbq.callMethod) fbq.callMethod(...args);
          else fbq.queue.push(args);
        } as Window["fbq"];
        fbq.push = fbq;
        fbq.loaded = false;
        fbq.version = "2.0";
        fbq.queue = [];
        window.fbq = fbq;
        window._fbq = fbq;
      }

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.fbq("init", "1305760707629374");
        window.fbq("track", "PageView");
      };

      ["scroll", "mousemove", "keydown", "touchstart"].forEach((e) =>
        window.removeEventListener(e, load),
      );
    };

    ["scroll", "mousemove", "keydown", "touchstart"].forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true }),
    );
    return () =>
      ["scroll", "mousemove", "keydown", "touchstart"].forEach((e) =>
        window.removeEventListener(e, load),
      );
  }, []);
  return null;
}
