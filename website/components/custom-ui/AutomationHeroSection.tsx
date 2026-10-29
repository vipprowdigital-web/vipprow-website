"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import LaserFlow from "../LaserFlow";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  MessageCircle,
  Mail,
  Database,
  Receipt,
} from "lucide-react";

const AGENTS = [
  {
    icon: MessageCircle,
    name: "WhatsApp Reply Agent",
    blurb: "Answers customer chats instantly, 24/7",
    angle: -90,
  },
  {
    icon: Mail,
    name: "Email Triage Agent",
    blurb: "Sorts, drafts, and routes inbox replies",
    angle: 0,
  },
  {
    icon: Receipt,
    name: "Invoice Agent",
    blurb: "Generates and sends invoices automatically",
    angle: 90,
  },
  {
    icon: Database,
    name: "CRM Sync Agent",
    blurb: "Keeps leads and records up to date",
    angle: 180,
  },
];

const RADIUS = 130;

function AgentOrbit() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % AGENTS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto h-80 w-80 shrink-0 sm:h-90 sm:w-90">
      {/* Connector lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="-180 -180 360 360">
        {AGENTS.map((agent, idx) => {
          const rad = (agent.angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS;
          const y = Math.sin(rad) * RADIUS;
          return (
            <line
              key={agent.name}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke={idx === activeIdx ? "#22d3ee" : "#2a3340"}
              strokeWidth={idx === activeIdx ? 1.5 : 1}
              strokeDasharray="4 4"
              opacity={idx === activeIdx ? 0.9 : 0.4}
            />
          );
        })}
      </svg>

      {/* Center AI core */}
      <div className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-full rounded-full border border-cyan-400/40"
        />
        <Bot className="h-8 w-8 text-cyan-300" />
      </div>

      {/* Satellite agents */}
      {AGENTS.map((agent, idx) => {
        const rad = (agent.angle * Math.PI) / 180;
        const x = Math.cos(rad) * RADIUS;
        const y = Math.sin(rad) * RADIUS;
        const active = idx === activeIdx;
        const Icon = agent.icon;
        return (
          <div
            key={agent.name}
            className="absolute top-1/2 left-1/2 flex w-28 flex-col items-center gap-2 text-center"
            style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
          >
            <motion.div
              animate={{
                scale: active ? 1.12 : 1,
                boxShadow: active
                  ? "0 0 22px rgba(34,211,238,0.45)"
                  : "0 0 0px rgba(34,211,238,0)",
              }}
              transition={{ duration: 0.4 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#0a0f14]"
              style={{
                borderColor: active ? "#22d3ee" : "rgba(255,255,255,0.12)",
              }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: active ? "#67e8f9" : "#8b97a3" }}
              />
            </motion.div>
            <span
              className="font-heading text-[11px] leading-tight transition-colors duration-300"
              style={{ color: active ? "#e5f6fb" : "#6b7680" }}
            >
              {agent.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AutomationHeroSection() {
  const revealImgRef = useRef<HTMLImageElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-14 px-6 py-24 lg:flex-row lg:justify-between lg:gap-10 lg:py-0">
        {/* Left: copy */}
        <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
            Business Automation (A.I)
          </span>

          <h1 className="font-heading text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-6xl">
            Your AI workforce,
            <br />
            always on.
          </h1>

          <p className="font-heading max-w-md text-sm text-neutral-300 sm:text-base">
            From instant WhatsApp replies to invoice generation and CRM
            sync, Vipprow&apos;s AI agents handle the repetitive work around
            the clock — so your team only steps in when it actually matters.
          </p>

          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {AGENTS.map((agent) => (
              <span
                key={agent.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300"
              >
                <agent.icon className="h-3.5 w-3.5 text-cyan-300" />
                {agent.name}
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(34,211,238,0.25)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(34,211,238,0.4)]"
          >
            Talk to an Automation Expert
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right: AI agent orbit */}
        <AgentOrbit />
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
            zIndex: 1,
            mixBlendMode: "lighten",
            opacity: 0.25,
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
