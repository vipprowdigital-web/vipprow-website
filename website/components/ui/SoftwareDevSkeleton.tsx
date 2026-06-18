"use client";

import { useEffect, useState } from "react";

const CODE_LINES = [
  {
    id: 1,
    always: true,
    content: (
      <>
        <span className="text-[#ff7b72]">import</span>{" "}
        <span className="text-[#e6edf3]">{"{ "}</span>
        <span className="text-[#d2a8ff]">useState</span>
        <span className="text-[#e6edf3]">{" }"}</span>{" "}
        <span className="text-[#ff7b72]">from</span>{" "}
        <span className="text-[#a5d6ff]">&apos;react&apos;</span>
      </>
    ),
  },
  { id: 2, always: true, content: <></> },
  {
    id: 3,
    always: true,
    content: (
      <>
        <span className="text-[#ff7b72]">export</span>{" "}
        <span className="text-[#ff7b72]">function</span>{" "}
        <span className="text-[#d2a8ff]">App</span>
        <span className="text-[#e6edf3]">{"() {"}</span>
      </>
    ),
  },
  {
    id: 4,
    always: false,
    content: (
      <>
        <span className="text-[#e6edf3]">&nbsp;&nbsp;</span>
        <span className="text-[#ff7b72]">const</span>{" "}
        <span className="text-[#e6edf3]">[</span>
        <span className="text-[#ffa657]">data</span>
        <span className="text-[#e6edf3]">, </span>
        <span className="text-[#ffa657]">setData</span>
        <span className="text-[#e6edf3]">] =</span>
      </>
    ),
  },
  {
    id: 5,
    always: false,
    content: (
      <>
        <span className="text-[#e6edf3]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="text-[#d2a8ff]">useState</span>
        <span className="text-[#e6edf3]">(</span>
        <span className="text-[#79c0ff]">null</span>
        <span className="text-[#e6edf3]">)</span>
      </>
    ),
  },
  {
    id: 6,
    always: false,
    content: (
      <>
        <span className="text-[#e6edf3]">&nbsp;&nbsp;</span>
        <span className="text-[#ff7b72]">return</span>{" "}
        <span className="text-[#e6edf3]">&lt;</span>
        <span className="text-[#d2a8ff]">Dashboard</span>{" "}
        <span className="text-[#e6edf3]">/&gt;</span>
      </>
    ),
  },
  {
    id: 7,
    always: false,
    content: (
      <>
        <span className="text-[#e6edf3]">{"}"}</span>
      </>
    ),
  },
];

type PipelineStage = "done" | "active" | "pending";

interface PipelineStep {
  label: string;
  state: PipelineStage;
}

const PIPELINE_CYCLES: PipelineStep[][] = [
  [
    { label: "build", state: "active" },
    { label: "test", state: "pending" },
    { label: "deploy", state: "pending" },
    { label: "live", state: "pending" },
  ],
  [
    { label: "build", state: "done" },
    { label: "test", state: "active" },
    { label: "deploy", state: "pending" },
    { label: "live", state: "pending" },
  ],
  [
    { label: "build", state: "done" },
    { label: "test", state: "done" },
    { label: "deploy", state: "active" },
    { label: "live", state: "pending" },
  ],
  [
    { label: "build", state: "done" },
    { label: "test", state: "done" },
    { label: "deploy", state: "done" },
    { label: "live", state: "active" },
  ],
];

export function SoftwareDevSkeleton() {
  const [visibleLines, setVisibleLines] = useState<number[]>([1, 2, 3]);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Animate code lines appearing one by one then reset
  useEffect(() => {
    const animatableIds = CODE_LINES.filter((l) => !l.always).map((l) => l.id);
    let lineIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function revealNext() {
      if (lineIdx < animatableIds.length) {
        const id = animatableIds[lineIdx];
        setVisibleLines((prev) => [...prev, id]);
        lineIdx++;
        timeout = setTimeout(revealNext, 400);
      } else {
        // Pause then reset
        timeout = setTimeout(() => {
          lineIdx = 0;
          setVisibleLines([1, 2, 3]);
          timeout = setTimeout(revealNext, 500);
        }, 1800);
      }
    }

    timeout = setTimeout(revealNext, 700);
    return () => clearTimeout(timeout);
  }, []);

  // Pipeline stage cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % PIPELINE_CYCLES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const pipeline = PIPELINE_CYCLES[cycleIndex];

  const pillClass = (state: PipelineStage) => {
    if (state === "done")
      return "bg-[rgba(35,134,54,0.25)] text-[#3fb950] border border-[rgba(63,185,80,0.3)]";
    if (state === "active")
      return "bg-[rgba(56,139,253,0.2)] text-[#58a6ff] border border-[rgba(88,166,255,0.35)]";
    return "bg-[rgba(255,255,255,0.04)] text-[#484f58] border border-[rgba(255,255,255,0.08)]";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 p-4">
      {/* Mini code editor */}
      <div className="w-[200px] bg-[#0d1117] rounded-lg border border-[rgba(59,130,246,0.25)] overflow-hidden font-mono text-[9px]">
        {/* Editor title bar */}
        <div className="bg-[#161b22] px-2.5 py-1.5 flex items-center gap-1.5 border-b border-[rgba(255,255,255,0.06)]">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-1.5 text-[#8b949e] text-[8px]">app.tsx</span>
        </div>

        {/* Code lines */}
        <div className="px-3 py-2 leading-[1.75]">
          {CODE_LINES.map((line) => {
            const isVisible = line.always || visibleLines.includes(line.id);
            const isLastVisible =
              !line.always &&
              line.id === Math.max(...visibleLines.filter((id) => id > 3));
            return (
              <div
                key={line.id}
                className="flex items-center transition-opacity duration-300"
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                <span className="text-[#30363d] mr-2 select-none w-3 text-right shrink-0">
                  {line.id}
                </span>
                <span>{line.content}</span>
                {isLastVisible && isVisible && (
                  <span
                    className="inline-block w-[2px] h-[10px] bg-[#58a6ff] ml-px align-middle"
                    style={{
                      opacity: cursorVisible ? 1 : 0,
                      transition: "opacity 0.1s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline status bar */}
      <div className="flex items-center gap-0 font-mono text-[8px]">
        {pipeline.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <span
              className={`px-2 py-0.5 rounded-full font-semibold tracking-wide ${pillClass(step.state)}`}
              style={{ transition: "all 0.4s ease" }}
            >
              {step.label}
            </span>
            {i < pipeline.length - 1 && (
              <span className="text-[#30363d] px-1">──</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
