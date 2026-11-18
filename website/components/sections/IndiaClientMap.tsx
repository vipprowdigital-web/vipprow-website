"use client";

import React, { useState, useEffect, useRef } from "react";
import mapData from "./india-map-paths.json";

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
    id: "uttar-pradesh",
    label: "Uttar Pradesh",
    cities: [
      { name: "Moradabad", lat: 28.8386, lng: 78.7733 },
      { name: "Bareilly", lat: 28.367, lng: 79.4304 },
      { name: "Puranpur", lat: 28.5106, lng: 80.1473 },
      { name: "Prayagraj", lat: 25.4358, lng: 81.8463 },
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
  { id: "varanasi", name: "Varanasi", lat: 25.3176, lng: 82.9739 },
  { id: "patna", name: "Patna", lat: 25.5941, lng: 85.1376 },
  { id: "nagpur", name: "Nagpur", lat: 21.1458, lng: 79.0882 },
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

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// Colour themes. "blue" is the main website; "purple" matches the portfolio page.
export type MapTheme = "blue" | "purple";

const THEMES = {
  blue: {
    ambientA: "#0d1a3a",
    ambientB: "#060810",
    land: ["#12264d", "#0a1530", "#060c1e"],
    depth: ["#050a18", "#0a1830", "#10264a"],
    border: "#1e3a5f",
    accent: "#2563eb", // country outline + intro lines
    hq: "#3b82f6",
    hqHover: "#60a5fa",
    glowPool: "bg-blue-600/25",
    legendHq: "bg-blue-500 shadow-[0_0_6px_#3b82f6]",
    legendState: "bg-indigo-500 shadow-[0_0_6px_#6366f1]",
    statCell:
      "bg-gray-200/10 border border-slate-400/40 rounded-xl",
    statValue: "text-white",
    headingAccent: "",
  },
  purple: {
    ambientA: "#1a0a2e",
    ambientB: "#050508",
    land: ["#2a1650", "#170b30", "#0c0618"],
    depth: ["#06030c", "#100820", "#1d1038"],
    border: "#6d4fc4",
    accent: "#8b5cf6",
    hq: "#8b5cf6",
    hqHover: "#c084fc",
    glowPool: "bg-violet-600/25",
    legendHq: "bg-violet-500 shadow-[0_0_6px_#8b5cf6]",
    legendState: "bg-violet-700 shadow-[0_0_6px_#6d28d9]",
    statCell:
      "rounded-xl border border-violet-500/25 bg-violet-950/20 hover:bg-purple-900/20 transition-colors duration-300",
    statValue:
      "bg-gradient-to-br from-[#8B5CF6] to-[#c084fc] bg-clip-text text-transparent",
    headingAccent:
      "bg-gradient-to-br from-[#8B5CF6] to-[#c084fc] bg-clip-text text-transparent",
  },
} as const;

export default function IndiaClientMap({
  theme = "blue",
}: {
  theme?: MapTheme;
}) {
  const t = THEMES[theme];
  const [mounted, setMounted] = useState(false);
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
  const tiltRef = useRef<HTMLDivElement>(null);

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

  // The map is tilted in 3D, which getScreenCTM() can't see, so position the
  // tooltip from the pin's real on-screen bounding box instead.
  function handleCityEnter(id: string, group: SVGGElement) {
    setHoveredStandalone(id);
    // Defer geometry reads until after paint to avoid forced reflow
    requestAnimationFrame(() => {
      const container = containerRef.current;
      const pin = group.querySelector("path");
      if (!container || !pin) return;
      const rc = container.getBoundingClientRect();
      const rp = pin.getBoundingClientRect();
      setCardPos({
        x: rp.left + rp.width / 2 - rc.left,
        y: rp.top - rc.top - 4,
        containerWidth: 0,
      });
    });
  }

  // Tilt the map toward the cursor (direct style writes: no re-renders)
  const REST_TILT = "perspective(1400px) rotateX(18deg) rotateY(0deg)";
  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${18 - py * 10}deg) rotateY(${px * 14}deg)`;
  }
  function handleTiltReset() {
    if (tiltRef.current) tiltRef.current.style.transform = REST_TILT;
  }
  function handleCityLeave() {
    setHoveredStandalone(null);
    setCardPos(null);
  }

  const hq = project(HQ.lat, HQ.lng);
  const clusterData = CLUSTERS.map((cl) => ({
    ...cl,
    center: centroid(cl.cities),
  }));
  // One pin per client city (standalones + every city inside a state cluster)
  const standaloneData = [
    ...STANDALONES,
    ...CLUSTERS.flatMap((cl) =>
      cl.cities.map((c) => ({ ...c, id: `${cl.id}-${c.name.toLowerCase()}` })),
    ),
  ].map((s) => ({ ...s, ...project(s.lat, s.lng) }));

  // All origin points for the intro lines (standalones + cluster centroids)
  const introOrigins = standaloneData.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
  }));

  return (
    <div className="relative w-full select-none font-sans px-3 sm:px-10">
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
        @keyframes mapFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .map-float { animation: mapFloat 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .map-float { animation: none; }
        }
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
        <div className="flex flex-col justify-center gap-6 px-2 lg:px-0 order-1">
          {/* heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Serving Clients{" "}
            {t.headingAccent ? (
              <span className={t.headingAccent}>Across India</span>
            ) : (
              "Across India"
            )}
          </h2>

          {/* description */}
          <p className="text-neutral-400 leading-tight text-sm sm:text-base max-w-md">
            Vipprow helps businesses across India grow through Digital
            Marketing, Performance Marketing, Business Automation, Website
            Development, Mobile App Development, and Custom Software Solutions.
            We combine innovative technology with data-driven strategies to
            generate quality leads, strengthen brands, and streamline business
            operations. With clients across{" "}
            <span className="text-white font-medium">
              {STANDALONES.length +
                CLUSTERS.reduce((s, c) => s + c.cities.length, 0) +
                1}{" "}
              cities
            </span>{" "}
            and <span className="text-white font-medium">11 states</span>,
            Vipprow serves as a trusted technology and growth partner,
            delivering scalable solutions that drive measurable business
            success.
          </p>

          {/* stat chips */}
          <div className="flex flex-wrap gap-3">
            {[
              {
                value: `${STANDALONES.length + CLUSTERS.reduce((s, c) => s + c.cities.length, 0)}+`,
                label: "Client Cities",
              },
              { value: "11", label: "States Covered" },
              // { value: "1",   label: "Jabalpur" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className={`flex flex-col items-center px-6 sm:px-10 sm:w-60 py-2.5 min-w-20 ${t.statCell}`}
              >
                <span className={`text-xl sm:text-2xl font-bold ${t.statValue}`}>
                  {value}
                </span>
                <span className="text-xs text-slate-500 mt-0.5 font-mono tracking-wide whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="flex gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.legendHq}`} />
              Vipprow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] shrink-0" />
              Client Location
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.legendState}`} />
              State
            </span>
          </div>
        </div>

        {/* ── RIGHT: map ── */}
        <div
          ref={containerRef}
          className="relative w-full order-2 flex justify-center"
          onMouseMove={handleTilt}
          onMouseLeave={handleTiltReset}
        >
          {/* glow pool under the map */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-[4%] left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full blur-3xl ${t.glowPool}`}
          />
          <div className="map-float w-full">
            <div
              ref={tiltRef}
              className="w-full"
              style={{
                transform: REST_TILT,
                transformOrigin: "50% 60%",
                transition: "transform 0.35s ease-out",
                willChange: "transform",
              }}
            >
              <svg
                ref={svgRef}
                viewBox="-40 -40 760 860"
                className="w-full"
                style={{ display: "block" }}
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
                  <filter
                    id="pinGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
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
                  <filter
                    id="hqGlow"
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                  >
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
                    <stop offset="0%" stopColor={t.ambientA} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={t.ambientB} stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="mapClip">
                    <rect x="-40" y="-40" width="780" height="860" />
                  </clipPath>
                  <linearGradient id="landTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={t.land[0]} />
                    <stop offset="55%" stopColor={t.land[1]} />
                    <stop offset="100%" stopColor={t.land[2]} />
                  </linearGradient>
                  <filter
                    id="landShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="14" />
                  </filter>
                  {/* land silhouette, reused for the extruded layers + top face */}
                  <g id="land-shape">
                    {mapData.allPaths.map((d, i) => (
                      <path key={`shape-${i}`} d={d} />
                    ))}
                  </g>
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
                  {/* soft ground shadow, then stacked layers = extruded thickness */}
                  <use
                    href="#land-shape"
                    y="26"
                    fill="#000"
                    opacity="0.55"
                    filter="url(#landShadow)"
                  />
                  {Array.from({ length: 12 }, (_, k) => 12 - k).map((n) => (
                    <use
                      key={`depth-${n}`}
                      href="#land-shape"
                      y={n * 1.5}
                      fill={n > 6 ? t.depth[0] : n > 3 ? t.depth[1] : t.depth[2]}
                    />
                  ))}
                  <use href="#land-shape" fill="url(#landTop)" />
                  {mapData.allPaths.map((d, i) => (
                    <path
                      key={`border-${i}`}
                      d={d}
                      fill="none"
                      stroke={t.border}
                      strokeWidth="0.7"
                      strokeLinejoin="round"
                      filter="url(#borderGlow)"
                      opacity={0.75}
                    />
                  ))}
                  <path
                    d={mapData.allPaths[0]}
                    fill="none"
                    stroke={t.accent}
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
                        linePhase === "fading"
                          ? "opacity 1.5s ease"
                          : undefined,
                    }}
                  >
                    {introOrigins.map((origin, i) => {
                      // Arc starts at client, ends at HQ → stroke-dashoffset reveal
                      // travels from the client pin toward Vipprow HQ
                      const d = arcPath(origin.x, origin.y, hq.x, hq.y);
                      const dx = origin.x - hq.x,
                        dy = origin.y - hq.y;
                      const len = Math.round(
                        Math.sqrt(dx * dx + dy * dy) * 1.35,
                      );

                      // Duration scales with distance so all lines travel at the same visual speed.
                      // Base speed: ~30 SVG-units per second → longer lines take proportionally longer.
                      // ↑ Lower the divisor (e.g. 20) to slow down; raise it (e.g. 50) to speed up.
                      const dur = Math.max(4, len / 100);
                      const delay = i * 0.25; // 400 ms stagger between lines

                      return (
                        <path
                          key={`intro-${origin.id}`}
                          d={d}
                          fill="none"
                          stroke={t.accent}
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

                {/* ── STANDALONE LOCATION PINS ── */}
                <g id="standalone-nodes">
                  {/* Keep DOM order stable: re-ordering nodes on hover restarts
                  their CSS animations, which made every pin drop in again. */}
                  {standaloneData.map((city, idx) => {
                    const isHovered = hoveredStandalone === city.id;
                    const pinSize = isHovered ? 1.4 : 1.2;
                    const headY = city.y - 9 * pinSize; // centre of pin's circular head
                    return (
                      <g
                        key={city.id}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) =>
                          handleCityEnter(city.id, e.currentTarget)
                        }
                        onMouseLeave={handleCityLeave}
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
                      </g>
                    );
                  })}

                  {/* Hovered pin redrawn on top (static, no pointer events) so it
                  isn't covered by neighbours, without reordering the pins */}
                  {(() => {
                    const c = standaloneData.find(
                      (s) => s.id === hoveredStandalone,
                    );
                    if (!c) return null;
                    return (
                      <g style={{ pointerEvents: "none" }}>
                        <LocationPin
                          cx={c.x}
                          cy={c.y}
                          size={1.4}
                          fill="#c61b1b"
                          stroke="#fff"
                          strokeWidth={1.2}
                        />
                        <circle
                          cx={c.x}
                          cy={c.y - 9 * 1.4}
                          r={1.8 * 1.4}
                          fill="#fff"
                          opacity={0.9}
                        />
                      </g>
                    );
                  })()}
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
                    stroke={t.hq}
                    strokeWidth="1.5"
                    className="hq-pulse"
                  />
                  <circle
                    cx={hq.x}
                    cy={hq.y}
                    r="8"
                    fill="none"
                    stroke={t.hq}
                    strokeWidth="1"
                    className="hq-pulse"
                    style={{ animationDelay: "0.9s" }}
                  />

                  {hoveredStandalone === "hq" && (
                    <LocationPin
                      cx={hq.x}
                      cy={hq.y}
                      size={1.6}
                      fill={t.hq}
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
                    fill={hoveredStandalone === "hq" ? t.hqHover : t.hq}
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
                          stroke={t.hqHover}
                          strokeWidth="1"
                          className="pin-ring"
                        />
                        <circle
                          cx={hq.x}
                          cy={hy}
                          r="3"
                          fill="none"
                          stroke={t.hqHover}
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
                    fill={t.hqHover}
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="0.08em"
                    style={{ pointerEvents: "none" }}
                  >
                    VIPPROW
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* ── CITY NAME TOOLTIP (hover only) ── */}
          {hoveredStandalone && hoveredStandalone !== "hq" && cardPos && (
            <div
              className="absolute pointer-events-none z-50"
              style={{
                left: cardPos.x,
                top: cardPos.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="tooltip-fade whitespace-nowrap bg-slate-950/95 border border-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-2xl font-mono text-[10px] sm:text-sm font-bold text-white">
                {standaloneData.find((s) => s.id === hoveredStandalone)?.name}
              </div>
            </div>
          )}
        </div>
        {/* end map column */}
      </div>
      {/* end grid */}
    </div>
  );
}
