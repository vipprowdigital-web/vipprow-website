"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { Bot, Cpu, Zap } from "lucide-react";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground
      containerClassName="h-full w-full relative overflow-hidden rounded-xl"
      className="flex flex-col items-center justify-center gap-3"
      colors={["#7c3aed", "#6d28d9", "#a855f7", "#c084fc", "#4f46e5"]}
      backgroundFill="#0a0a0a"
      blur={6}
      speed="slow"
      waveOpacity={0.6}
    >
      <div className="flex items-center gap-4">
        {/* <Cpu className="h-6 w-6 text-purple-300" /> */}
        <Bot className="h-14 w-14 text-white" />
        {/* <Zap className="h-6 w-6 text-violet-300" /> */}
      </div>
      <p className="text-white/80 text-sm font-medium tracking-widest uppercase">
        Powered by A.I
      </p>
    </WavyBackground>
  );
}
