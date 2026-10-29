"use client";

import { useRef, CSSProperties } from "react";
import LaserFlow from "../LaserFlow";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CroissixHeroSection() {
  const revealImgRef = useRef<HTMLImageElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
      onMouseEnter={(e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onMouseMove={(e) => {
        const rect = rectRef.current;
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", "-9999px");
          el.style.setProperty("--my", "-9999px");
        }
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.2}
        verticalBeamOffset={0.0}
        color="#ef9a3b"
        horizontalSizing={0.2}
        verticalSizing={20}
        wispDensity={1}
        wispSpeed={15}
        wispIntensity={5}
        flowSpeed={0.35}
        flowStrength={0.11}
        fogIntensity={0.73}
        fogScale={0.22}
        fogFallSpeed={1.76}
        decay={2.6}
        falloffStart={1.6}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "75%",
          height: "60%",
          backgroundColor: "#100a00",
          borderRadius: "20px",
          border: "1px solid #ef9a3b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: 6,
        }}
      >
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <span className="inline-flex items-center rounded-full border border-[#ef9a3b]/40 bg-[#ef9a3b]/10 px-3 py-1 text-xs font-medium text-[#f6bd79]">
            Powered by Croissix
          </span>
          <h1 className="font-heading max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            AI-Powered Local
            <br />
            Marketing Automation.
          </h1>
          <p className="font-heading max-w-lg text-sm text-neutral-300 sm:text-base">
            Manage your Google Business Profile, Facebook, and Instagram in
            one place — with AI-generated content and automatic review
            replies that keep your local presence active around the clock.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-[#ef9a3b]/50 bg-[#ef9a3b]/15 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#ef9a3b]/30"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <Image
        height={1000}
        width={1000}
        ref={revealImgRef}
        src="/assets/images/backgrounds/automationherobg.webp"
        alt="Reveal effect"
        style={
          {
            position: "absolute",
            width: "100%",
            top: "-50%",
            zIndex: 5,
            mixBlendMode: "lighten",
            opacity: 0.3,
            pointerEvents: "none",
            "--mx": "-9999px",
            "--my": "-9999px",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          } as CSSProperties
        }
      />
    </div>
  );
}
