import { useEffect, useState } from "react";

export function useTypewriterLoop(
  text: string,
  speed = 100,
  delayAfterComplete = 1500
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));

        if (i >= text.length) {
          clearInterval(typingInterval);

          resetTimeout = setTimeout(() => {
            i = 0;
            setDisplayed("");
            startTyping(); // 🔁 LOOP
          }, delayAfterComplete);
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetTimeout);
    };
  }, [text, speed, delayAfterComplete]);

  return displayed;
}
