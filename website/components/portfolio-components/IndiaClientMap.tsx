"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapData from "../sections/india-map-paths.json";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface City {
  name: string;
  lat: number;
  lng: number;
}
interface ClusterDef {
  id: string;
  label: string;
  cities: City[];
}
interface StandaloneCity extends City {
  id: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const HQ: City & { isHQ: true } = {
  name: "Vipprow HQ",
  lat: 23.1686,
  lng: 79.9339,
  isHQ: true,
};

const CLUSTERS: ClusterDef[] = [
  {
    id: "uttarakhand",
    label: "Uttarakhand",
    cities: [
      { name: "Dehradun", lat: 30.3165, lng: 78.0322 },
      { name: "Haldwani", lat: 29.2183, lng: 79.513 },
      { name: "Bajpur", lat: 29.0102, lng: 79.0079 },
      { name: "Rudrapur", lat: 28.9845, lng: 79.4028 },
      { name: "Ramnagar", lat: 29.394, lng: 79.128 },
    ],
  },
  {
    id: "madhya-pradesh",
    label: "Madhya Pradesh",
    cities: [
      { name: "Indore", lat: 22.7196, lng: 75.8577 },
      { name: "Itarsi", lat: 22.6122, lng: 77.7641 },
      { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
      { name: "Jabalpur", lat: 23.1815, lng: 79.9864 },
    ],
  },
];

const STANDALONES: StandaloneCity[] = [
  { id: "tezpur", name: "Tezpur", lat: 26.6338, lng: 92.7926 },
  { id: "hyderabad", name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { id: "bangalore", name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { id: "jaipur", name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { id: "shahada", name: "Shahada", lat: 21.5462, lng: 74.47 },
  { id: "raipur", name: "Raipur", lat: 21.2514, lng: 81.6296 },
  { id: "mumbai", name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { id: "noida", name: "Noida", lat: 28.5355, lng: 77.391 },
  { id: "pune", name: "Pune", lat: 18.5204, lng: 73.8567 },
  { id: "surat", name: "Surat", lat: 21.1702, lng: 72.8311 },
  { id: "kamareddy", name: "Kamareddy", lat: 18.322, lng: 78.34 },
];

// ─── PROJECTION ───────────────────────────────────────────────────────────────
const WIDTH = 700,
  HEIGHT = 780;
const LNG_MIN = 68.1,
  LNG_MAX = 97.5,
  LAT_MIN = 6.5,
  LAT_MAX = 35.7;

function mercY(d: number) {
  const r = (d * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + r / 2));
}
const Y_TOP = mercY(LAT_MAX);
const Y_BOT = mercY(LAT_MIN);

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * WIDTH;
  const y = HEIGHT - ((mercY(lat) - Y_BOT) / (Y_TOP - Y_BOT)) * HEIGHT;
  return { x, y };
}

function centroid(cities: City[]) {
  const avgLat = cities.reduce((s, c) => s + c.lat, 0) / cities.length;
  const avgLng = cities.reduce((s, c) => s + c.lng, 0) / cities.length;
  return project(avgLat, avgLng);
}

// Quadratic bezier arc path string
function arcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature = 0.22,
) {
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  const dx = x2 - x1,
    dy = y2 - y1;
  return `M${x1},${y1} Q${mx - dy * curvature},${my + dx * curvature} ${x2},${y2}`;
}

// ─── LOCATION PIN SVG ─────────────────────────────────────────────────────────
function LocationPin({
  cx,
  cy,
  size = 1,
  fill = "#b61818ff",
  stroke = "#fff",
  strokeWidth = 1,
  opacity = 1,
  filter,
}: {
  cx: number;
  cy: number;
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  filter?: string;
}) {
  const r = 5 * size;
  const bodyY = cy - 9 * size;
  const d = [
    `M ${cx} ${cy}`,
    `L ${cx - r * 0.65} ${bodyY + r * 0.75}`,
    `A ${r} ${r} 0 1 1 ${cx + r * 0.65} ${bodyY + r * 0.75}`,
    "Z",
  ].join(" ");
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      opacity={opacity}
      filter={filter}
    />
  );
}

const grad = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const cell = {
  borderRight: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function IndiaClientMap() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);
  const [hoveredStandalone, setHoveredStandalone] = useState<string | null>(
    null,
  );
  const [cardPos, setCardPos] = useState<{
    x: number;
    y: number;
    containerWidth: number;
  } | null>(null);

  // ── intro line animation state ──
  // "idle"     → waiting for map to enter viewport
  // "drawing"  → lines are animating in (stroke-dashoffset)
  // "fading"   → lines are fading out via opacity transition
  // "done"     → lines are gone permanently
  const [linePhase, setLinePhase] = useState<
    "idle" | "drawing" | "fading" | "done"
  >("idle");

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerWidthRef = useRef<number>(0);

  useEffect(() => {
    const handleSetMounted = () => setMounted(true);
    handleSetMounted();
  }, []);

  // ── IntersectionObserver: start animation only when map scrolls into view ──
  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Only ever fire once
          observer.disconnect();

          // Small delay so the user actually sees the map first
          const t0 = setTimeout(() => setLinePhase("drawing"), 400);

          // Duration is proportional to distance (len/28, min 4 s).
          // Furthest city (Tezpur ~380 px straight-line → len ~513 → dur ~18 s).
          // Last line (highest index) finishes at: index*0.4 + dur ≈ 12*0.4+18 = 22.8 s worst case.
          // Hold 2 s → fade at 25 s, done at 27 s.
          const t1 = setTimeout(() => setLinePhase("fading"), 15000);
          const t2 = setTimeout(() => setLinePhase("done"), 27000);

          timersRef.current = [t0, t1, t2];
        }
      },
      { threshold: 0.3 }, // fire when 30 % of map is visible
    );

    observer.observe(el);

    // Cache container width via ResizeObserver — reads layout passively,
    // never during a hover interaction, so no forced reflow
    const ro = new ResizeObserver((entries) => {
      containerWidthRef.current = entries[0].contentRect.width;
    });
    ro.observe(el);
    // Seed the initial value immediately
    containerWidthRef.current = el.offsetWidth;

    return () => {
      observer.disconnect();
      ro.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, [mounted]);

  if (!mounted) return null;

  function svgToContainer(svgX: number, svgY: number) {
    const svg = svgRef.current,
      container = containerRef.current;
    if (!svg || !container) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = svgX;
    pt.y = svgY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!);
    const rc = container.getBoundingClientRect();
    return { x: sp.x - rc.left, y: sp.y - rc.top };
  }

  function handleClusterEnter(id: string, cx: number, cy: number) {
    // Set hovered state immediately (no layout read)
    setHoveredCluster(id);
    // Defer the geometry reads to after the browser has painted — avoids forced reflow
    requestAnimationFrame(() => {
      const pos = svgToContainer(cx + 18, cy - 10);
      setCardPos({
        ...pos,
        containerWidth:
          containerWidthRef.current ||
          containerRef.current?.offsetWidth ||
          9999,
      });
    });
  }
  function handleClusterLeave() {
    setHoveredCluster(null);
    setCardPos(null);
  }

  const hq = project(HQ.lat, HQ.lng);
  const clusterData = CLUSTERS.map((cl) => ({
    ...cl,
    center: centroid(cl.cities),
  }));
  const standaloneData = STANDALONES.map((s) => ({
    ...s,
    ...project(s.lat, s.lng),
  }));

  // All origin points for the intro lines (standalones + cluster centroids)
  const introOrigins = [
    ...standaloneData.map((s) => ({ id: s.id, x: s.x, y: s.y })),
    ...clusterData.map((cl) => ({ id: cl.id, x: cl.center.x, y: cl.center.y })),
  ];

  return (
    <div className="relative w-full select-none font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* ── pin drop ── */
        @keyframes indiaPinDrop {
          0%   { transform: translateY(-14px); opacity: 0; }
          65%  { transform: translateY(3px);   opacity: 1; }
          100% { transform: translateY(0);     opacity: 1; }
        }
        /* ── pin head blink ring ── */
        @keyframes pinRingPulse {
          0%   { r: 3;  opacity: 0.85; }
          100% { r: 14; opacity: 0;    }
        }
        /* ── cluster badge blink ── */
        @keyframes clusterPulse {
          0%   { r: 9;  opacity: 0.7; }
          100% { r: 26; opacity: 0;   }
        }
        /* ── HQ pulse ── */
        @keyframes hqPulse {
          0%   { r: 8;  opacity: 0.8; }
          100% { r: 28; opacity: 0;   }
        }
        /* ── intro line draw-in ── */
        @keyframes lineDraw {
          from { stroke-dashoffset: var(--line-len); }
          to   { stroke-dashoffset: 0; }
        }
        /* ── tooltip fade ── */
        @keyframes indiaFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cityPopIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1);   }
        }
        .pin-drop {
          animation: indiaPinDrop 0.45s cubic-bezier(0.34,1.4,0.64,1) both;
          transform-box: fill-box; transform-origin: center bottom;
        }
        .pin-ring {
          animation: pinRingPulse 2s ease-out infinite;
          transform-box: fill-box; transform-origin: center;
        }
        .hq-pulse {
          animation: hqPulse 2s ease-out infinite;
          transform-box: fill-box; transform-origin: center;
        }
        .cluster-pulse {
          animation: clusterPulse 2.4s ease-out infinite;
          transform-box: fill-box; transform-origin: center;
        }
        .tooltip-fade { animation: indiaFadeIn 0.18s ease-out both; }
        .city-pop {
          animation: cityPopIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both;
          transform-box: fill-box; transform-origin: center;
        }
      `,
        }}
      />

      {/* ── GRID: text left | map right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* ── LEFT: title + description ── */}
        <motion.div
          className="flex flex-col justify-center gap-6 px-2 lg:px-0 order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* heading */}
          <h2 className="font-sora text-3xl md:text-5xl font-extrabold tracking-tight sm:mb-5">
            Serving Clients <span style={grad}>Across India</span>
          </h2>

          {/* description */}
          <p className="text-neutral-400 leading-tight text-sm sm:text-base max-w-md">
            Vipprow helps businesses grow through Digital Marketing, Performance
            Marketing, Business Automation, Website & App Development, and
            Custom Software Solutions — powered by data-driven strategies that
            generate leads and strengthen brands. Trusted by clients across{" "}
            <span className="text-white font-medium">
              {STANDALONES.length +
                CLUSTERS.reduce((s, c) => s + c.cities.length, 0) +
                1}{" "}
              cities
            </span>{" "}
            and <span className="text-white font-medium">10 states</span> across
            India.
          </p>

          {/* stat chips */}
          <div className="flex flex-wrap">
            {[
              {
                value: `${STANDALONES.length + CLUSTERS.reduce((s, c) => s + c.cities.length, 0)}+`,
                label: "Client Cities",
              },
              { value: "10", label: "States Covered" },
              // { value: "1",   label: "Jabalpur" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="sm:w-50 w-35 px-4 sm:px-6 py-5 transition-colors duration-300 hover:bg-purple-900/10 flex flex-col"
                style={cell}
              >
                <span
                  className="font-sora text-3xl font-extrabold mb-2 leading-none"
                  style={grad}
                >
                  {value}
                </span>
                <span className="text-sm text-white/40 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="flex gap-5 text-[9px] sm:text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_6px_#8b5cf6] shrink-0" />
              Vipprow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] shrink-0" />
              Client Location
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-700 shadow-[0_0_6px_#6d28d9] shrink-0" />
              State
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: map ── */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative w-full order-2 flex justify-center"
        >
          <svg
            ref={svgRef}
            viewBox="-40 -40 760 860"
            className="w-full"
            style={{
              display: "block",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="borderGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1.5"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2.5"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="hqGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="mapAmbient" cx="45%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#1a0a2e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#050508" stopOpacity="0" />
              </radialGradient>
              <clipPath id="mapClip">
                <rect x="-40" y="-40" width="780" height="860" />
              </clipPath>
            </defs>

            <rect
              x="-40"
              y="-40"
              width="780"
              height="860"
              fill="url(#mapAmbient)"
            />

            {/* ── INDIA MAP ── */}
            <g id="india-map" clipPath="url(#mapClip)">
              {mapData.allPaths.map((d, i) => (
                <path key={`fill-${i}`} d={d} fill="#050508" stroke="none" />
              ))}
              <g filter="url(#borderGlow)" opacity={0.75}>
                {mapData.allPaths.map((d, i) => (
                  <path
                    key={`border-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(139,92,246,0.3)"
                    strokeWidth="0.7"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
              <path
                d={mapData.allPaths[0]}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1.2"
                strokeLinejoin="round"
                opacity={0.45}
              />
            </g>

            {/* ── ONE-TIME INTRO LINES ── */}
            {linePhase !== "idle" && linePhase !== "done" && (
              <g
                id="intro-lines"
                style={{
                  opacity: linePhase === "fading" ? 0 : 1,
                  transition:
                    linePhase === "fading" ? "opacity 1.5s ease" : undefined,
                }}
              >
                {introOrigins.map((origin, i) => {
                  // Arc starts at client, ends at HQ → stroke-dashoffset reveal
                  // travels from the client pin toward Vipprow HQ
                  const d = arcPath(origin.x, origin.y, hq.x, hq.y);
                  const dx = origin.x - hq.x,
                    dy = origin.y - hq.y;
                  const len = Math.round(Math.sqrt(dx * dx + dy * dy) * 1.35);

                  // Duration scales with distance so all lines travel at the same visual speed.
                  // Base speed: ~30 SVG-units per second → longer lines take proportionally longer.
                  // ↑ Lower the divisor (e.g. 20) to slow down; raise it (e.g. 50) to speed up.
                  const dur = Math.max(4, len / 100);
                  const delay = i * 0.7; // 400 ms stagger between lines

                  return (
                    <path
                      key={`intro-${origin.id}`}
                      d={d}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      style={
                        {
                          "--line-len": len, // CSS var read by @keyframes lineDraw
                          strokeDasharray: len,
                          strokeDashoffset: len, // initial hidden state
                          animation: `lineDraw ${dur}s cubic-bezier(0.4,0,0.6,1) forwards`,
                          animationDelay: `${delay}s`,
                          opacity: 0.75,
                        } as React.CSSProperties
                      }
                    />
                  );
                })}
              </g>
            )}

            {/* ── CLUSTER PINS ── */}
            {clusterData.map((cl) => {
              const isOpen = hoveredCluster === cl.id;
              return (
                <g
                  key={cl.id}
                  onMouseEnter={() =>
                    handleClusterEnter(cl.id, cl.center.x, cl.center.y)
                  }
                  onMouseLeave={handleClusterLeave}
                  style={{ cursor: "pointer" }}
                >
                  {/* Pulse ring */}
                  <circle
                    cx={cl.center.x}
                    cy={cl.center.y}
                    r="9"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    className="cluster-pulse"
                    opacity={isOpen ? 0 : 1}
                  />
                  {/* Badge */}
                  <circle
                    cx={cl.center.x}
                    cy={cl.center.y}
                    r={isOpen ? 10 : 8}
                    fill={isOpen ? "#7c3aed" : "#6d28d9"}
                    stroke="#fff"
                    strokeWidth="1.5"
                    filter={isOpen ? "url(#pinGlow)" : undefined}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {/* Count */}
                  <text
                    x={cl.center.x}
                    y={cl.center.y + 4}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="ui-sans-serif, sans-serif"
                    style={{ pointerEvents: "none" }}
                  >
                    {cl.cities.length}
                  </text>
                  {/* Label above */}
                  <text
                    x={cl.center.x}
                    y={cl.center.y - 16}
                    textAnchor="middle"
                    fill={isOpen ? "#ffffff" : "#e9d5ff"}
                    // fontSize="10"
                    fontWeight={isOpen ? "700" : "600"}
                    fontFamily="ui-monospace, monospace"
                    style={{
                      pointerEvents: "none",
                      transition: "fill 0.15s ease",
                    }}
                    className="text-md sm:text-lg"
                  >
                    {cl.label}
                  </text>
                </g>
              );
            })}

            {/* ── STANDALONE LOCATION PINS ── */}
            <g id="standalone-nodes">
              {standaloneData.map((city, idx) => {
                const isHovered = hoveredStandalone === city.id;
                const pinSize = isHovered ? 1.4 : 1.2;
                const headY = city.y - 9 * pinSize; // centre of pin's circular head
                return (
                  <g
                    key={city.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredStandalone(city.id)}
                    onMouseLeave={() => setHoveredStandalone(null)}
                  >
                    <g
                      className="pin-drop"
                      style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                      {/* Blinking ring around pin head */}
                      <circle
                        cx={city.x}
                        cy={headY}
                        r="10"
                        fill="none"
                        stroke="#f8f8f8ff"
                        strokeWidth="2"
                        className="pin-ring"
                        style={{ animationDelay: `${idx * 0.25}s` }}
                      />
                      {/* Second offset blink for layered effect */}
                      <circle
                        cx={city.x}
                        cy={headY}
                        r="10"
                        fill="none"
                        stroke="#fbfbfbff"
                        strokeWidth="1"
                        className="pin-ring"
                        style={{ animationDelay: `${idx * 0.25 + 0.8}s` }}
                      />

                      {/* Glow behind pin when hovered */}
                      {isHovered && (
                        <LocationPin
                          cx={city.x}
                          cy={city.y}
                          size={1.65}
                          fill="#c61b1b"
                          stroke="none"
                          opacity={0.22}
                          filter="url(#pinGlow)"
                        />
                      )}
                      {/* Main pin */}
                      <LocationPin
                        cx={city.x}
                        cy={city.y}
                        size={pinSize}
                        fill="#c61b1b"
                        stroke="#fff"
                        strokeWidth={isHovered ? 1.2 : 0.9}
                      />
                      {/* White dot inside head */}
                      <circle
                        cx={city.x}
                        cy={headY}
                        r={1.8 * pinSize}
                        fill="#fff"
                        opacity={0.9}
                        style={{ pointerEvents: "none" }}
                      />
                    </g>

                    {/* Label */}
                    <text
                      x={city.x + 9}
                      y={city.y - 5}
                      fill={isHovered ? "#ffffff" : "#e2e8f0"}
                      fontSize={isHovered ? "20" : "18"}
                      fontWeight={isHovered ? "700" : "500"}
                      fontFamily="ui-monospace, monospace"
                      style={{
                        pointerEvents: "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ── HQ PIN ── */}
            <g
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredStandalone("hq")}
              onMouseLeave={() => setHoveredStandalone(null)}
            >
              {/* Pulse rings */}
              <circle
                cx={hq.x}
                cy={hq.y}
                r="8"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1.5"
                className="hq-pulse"
              />
              <circle
                cx={hq.x}
                cy={hq.y}
                r="8"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1"
                className="hq-pulse"
                style={{ animationDelay: "0.9s" }}
              />

              {hoveredStandalone === "hq" && (
                <LocationPin
                  cx={hq.x}
                  cy={hq.y}
                  size={1.6}
                  fill="#8b5cf6"
                  stroke="none"
                  opacity={0.3}
                  filter="url(#hqGlow)"
                />
              )}

              {/* HQ pin */}
              <LocationPin
                cx={hq.x}
                cy={hq.y}
                size={hoveredStandalone === "hq" ? 1.45 : 1.25}
                fill={hoveredStandalone === "hq" ? "#c084fc" : "#8b5cf6"}
                stroke="#fff"
                strokeWidth={1.5}
              />

              {/* Blinking ring on HQ pin head */}
              {(() => {
                const s = hoveredStandalone === "hq" ? 1.45 : 1.25;
                const hy = hq.y - 9 * s;
                return (
                  <>
                    <circle
                      cx={hq.x}
                      cy={hy}
                      r="3"
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="1"
                      className="pin-ring"
                    />
                    <circle
                      cx={hq.x}
                      cy={hy}
                      r="3"
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="0.7"
                      className="pin-ring"
                      style={{ animationDelay: "0.8s" }}
                    />
                    {/* White dot */}
                    <circle
                      cx={hq.x}
                      cy={hy}
                      r={2.2 * s}
                      fill="#fff"
                      opacity={0.95}
                      style={{ pointerEvents: "none" }}
                    />
                  </>
                );
              })()}

              {/* Label */}
              <text
                x={hq.x}
                y={hq.y - 9 * 1.25 - 19}
                textAnchor="middle"
                fill="#c084fc"
                // fontSize="11"
                fontWeight="800"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
                style={{ pointerEvents: "none" }}
                className="text-md sm:text-2xl"
              >
                VIPPROW
              </text>
            </g>
          </svg>

          {/* ── CLUSTER CARD OVERLAY ── */}
          {hoveredCluster &&
            cardPos &&
            (() => {
              const cl = clusterData.find((c) => c.id === hoveredCluster)!;
              const flipLeft = cardPos.x + 165 > cardPos.containerWidth;
              return (
                <div
                  className="tooltip-fade pointer-events-none"
                  style={{
                    position: "absolute",
                    top: cardPos.y,
                    left: flipLeft ? cardPos.x - 165 - 36 : cardPos.x,
                    zIndex: 50,
                    minWidth: "155px",
                    background: "rgba(8,8,16,0.97)",
                    border: "1px solid rgba(139,92,246,0.55)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    style={{
                      // fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "#ffffffff",
                      marginBottom: "8px",
                      fontFamily: "ui-monospace, monospace",
                      borderBottom: "1px solid rgba(139,92,246,0.25)",
                      paddingBottom: "6px",
                    }}
                    className="text-[11px] sm:text-md"
                  >
                    {cl.label}
                  </div>
                  {cl.cities.map((city, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: i < cl.cities.length - 1 ? "6px" : 0,
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#6d28d9",
                          flexShrink: 0,
                          boxShadow: "0 0 5px rgba(139,92,246,0.55)",
                        }}
                      />
                      <span
                        style={{
                          // fontSize: "14px",
                          fontWeight: 600,
                          color: "#ffffff",
                          fontFamily: "ui-monospace, monospace",
                          whiteSpace: "nowrap",
                        }}
                        className="text-xs sm:text-sm"
                      >
                        {city.name}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}

          {/* ── STANDALONE TOOLTIP ── */}
          {hoveredStandalone && hoveredStandalone !== "hq" && (
            <div className="tooltip-fade absolute bottom-10 sm:bottom-40 right-4 sm:right-17 bg-slate-950/95 border border-violet-500/30 backdrop-blur-sm px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl shadow-2xl pointer-events-none">
              <span className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mb-0 sm:mb-1">
                Client Hub
              </span>
              <span className="flex items-center gap-2 text-[9px] sm:text-sm font-bold text-white">
                <span className="w-2 h-2 rounded-full shrink-0 bg-violet-400 shadow-[0_0_8px_#8b5cf6]" />
                {standaloneData.find((s) => s.id === hoveredStandalone)?.name}
              </span>
              {/* <span className="block text-[10px] text-emerald-400 mt-1 font-mono">✓ Service pipeline active</span> */}
            </div>
          )}
        </motion.div>
        {/* end map column */}
      </div>
      {/* end grid */}
    </div>
  );
}
