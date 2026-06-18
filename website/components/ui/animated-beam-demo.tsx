"use client";

import { forwardRef, useRef } from "react";
import { BarChart2, Mail, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  FacebookLogo,
  MetaIconOutline,
  YouTubeLogo,
  OpenAILogo,
  InstagramLogo,
} from "@/components/aceternity-ui/card/AnimatedSVGCard";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white dark:bg-neutral-800 p-2 shadow-md",
      className,
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const facebookRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-between px-8 py-4"
    >
      {/* Input channels */}
      <div className="flex flex-col items-center gap-4">
        <Circle ref={facebookRef}>
          <FacebookLogo className="h-7 w-7" />
        </Circle>
        <Circle ref={metaRef}>
          <MetaIconOutline className="h-7 w-7" />
        </Circle>
        <Circle ref={youtubeRef}>
          <YouTubeLogo className="h-7 w-7 text-red-500" />
        </Circle>
      </div>

      {/* Brand center */}
      <Circle
        ref={centerRef}
        className="h-14 w-14 border-2 border-blue-400 shadow-[0_0_15px_rgba(210,210,210,0.4)]"
      >
        <Image
          src="/assets/images/logo/vipprow-logo.png"
          width={100}
          height={100}
          alt="Vipprow Logo"
        />
      </Circle>

      {/* Output results */}
      <div className="flex flex-col items-center gap-4">
        <Circle ref={emailRef}>
          <Mail className="h-7 w-7 text-blue-500" />
        </Circle>
        <Circle ref={analyticsRef}>
          <InstagramLogo className="h-7 w-7 text-purple-500" />
        </Circle>
        <Circle ref={growthRef}>
          <TrendingUp className="h-7 w-7 text-green-500" />
          {/* <OpenAILogo className="h-7 w-7 text-gray-200" /> */}
        </Circle>
      </div>

      {/* Beams: channels → center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={facebookRef}
        toRef={centerRef}
        curvature={0}
        duration={2.5}
        delay={0}
        gradientStartColor="#1877F2"
        gradientStopColor="#06b6d4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={metaRef}
        toRef={centerRef}
        curvature={0}
        duration={2.5}
        delay={0.5}
        gradientStartColor="#0082fb"
        gradientStopColor="#06b6d4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={youtubeRef}
        toRef={centerRef}
        curvature={0}
        duration={2.5}
        delay={1}
        gradientStartColor="#ef4444"
        gradientStopColor="#06b6d4"
      />

      {/* Beams: center → results */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={emailRef}
        curvature={50}
        duration={2.5}
        delay={0.2}
        reverse
        gradientStartColor="#06b6d4"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={analyticsRef}
        curvature={0}
        duration={2.5}
        delay={0.7}
        reverse
        gradientStartColor="#06b6d4"
        gradientStopColor="#a855f7"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={growthRef}
        curvature={-50}
        duration={2.5}
        delay={1.2}
        reverse
        gradientStartColor="#06b6d4"
        gradientStopColor="#22c55e"
      />
    </div>
  );
}
