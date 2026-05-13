"use client";

import { useRef, CSSProperties } from "react";
import LaserFlow from "../LaserFlow";
import Image from "next/image";

export default function AutomationHeroSection() {
  const revealImgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
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
        color="#7a94e1"
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
          backgroundColor: "#060010",
          borderRadius: "20px",
          border: "1px solid #7a94e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "2rem",
          zIndex: 6,
        }}
      >
        {/* Your content here */}
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
