"use client";

import { useEffect, useMemo, useState } from "react";
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { FileIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme: string;
  darkTheme: string;
  highlightColor?: string;
}

export function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme,
  darkTheme,
  highlightColor = "#ff3333",
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState("");
  const [highlightedAfter, setHighlightedAfter] = useState("");
  const [hasLeftFocus, setHasLeftFocus] = useState(false);
  const [hasRightFocus, setHasRightFocus] = useState(false);

  const selectedTheme = useMemo(() => {
    const currentTheme = "dark";
    // const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme, darkTheme, lightTheme]);

  useEffect(() => {
    if (highlightedBefore || highlightedAfter) {
      setHasLeftFocus(highlightedBefore.includes('class="line focused"'));
      setHasRightFocus(highlightedAfter.includes('class="line focused"'));
    }
  }, [highlightedBefore, highlightedAfter]);

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const { transformerNotationHighlight } =
          await import("@shikijs/transformers");

        const before = await codeToHtml(beforeCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        });
        const after = await codeToHtml(afterCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${beforeCode}</pre>`);
        setHighlightedAfter(`<pre>${afterCode}</pre>`);
      }
    }
    highlightCode();
  }, [beforeCode, afterCode, language, selectedTheme]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          style={{ "--highlight-color": highlightColor } as React.CSSProperties}
          className={cn(
            "bg-background h-full w-full font-mono text-xs",
            "[&>pre]:h-full [&>pre]:w-screen! [&>pre]:py-2",
            "[&>pre>code]:inline-block! [&>pre>code]:w-full!",
            "[&>pre>code>span]:inline-block! [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:bg-(--highlight-color)!",
            "group-hover/left:[&>pre>code>:not(.focused)]:opacity-100! group-hover/left:[&>pre>code>:not(.focused)]:blur-none!",
            "group-hover/right:[&>pre>code>:not(.focused)]:opacity-100! group-hover/right:[&>pre>code>:not(.focused)]:blur-none!",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300",
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="bg-background text-foreground p-4 font-mono text-xs break-all">
          {code}
        </pre>
      );
    }
  };

  return (
    <div className="h-full w-full">
      <div className="group border-border relative h-full w-full overflow-hidden rounded-md border">
        <div className="relative grid h-full md:grid-cols-2">
          <div
            className={cn(
              "leftside group/left border-primary/20 flex flex-col overflow-hidden md:border-r",
              hasLeftFocus &&
                "[&_pre>code>:not(.focused)]:opacity-50! [&_pre>code>:not(.focused)]:blur-[0.095rem]!",
              "[&_pre>code>:not(.focused)]:transition-all [&_pre>code>:not(.focused)]:duration-300",
            )}
          >
            <div className="border-primary/20 bg-accent text-foreground flex shrink-0 items-center border-b p-2 text-sm">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              <span className="ml-auto hidden md:block">before</span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
              {renderCode(beforeCode, highlightedBefore)}
            </div>
          </div>
          <div
            className={cn(
              "rightside group/right border-primary/20 flex flex-col overflow-hidden border-t md:border-t-0",
              hasRightFocus &&
                "[&_pre>code>:not(.focused)]:opacity-50! [&_pre>code>:not(.focused)]:blur-[0.095rem]!",
              "[&_pre>code>:not(.focused)]:transition-all [&_pre>code>:not(.focused)]:duration-300",
            )}
          >
            <div className="border-primary/20 bg-accent text-foreground flex shrink-0 items-center border-b p-2 text-sm">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              <span className="ml-auto hidden md:block">after</span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
              {renderCode(afterCode, highlightedAfter)}
            </div>
          </div>
        </div>
        <div className="border-primary/20 bg-accent text-foreground absolute top-1/2 left-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border text-xs md:flex">
          VS
        </div>
      </div>
    </div>
  );
}
