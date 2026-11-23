"use client";

import React, { memo, useEffect, useRef, useState } from "react";
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
const HQ: City = { name: "Vipprow HQ", lat: 23.1686, lng: 79.9339 };

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

  // Additional pins (all within the same 11 states)
  // Maharashtra
  { id: "nashik", name: "Nashik", lat: 19.9975, lng: 73.7898 },
  { id: "aurangabad", name: "Chhatrapati Sambhajinagar", lat: 19.8762, lng: 75.3433 },
  { id: "kolhapur", name: "Kolhapur", lat: 16.705, lng: 74.2433 },
  { id: "solapur", name: "Solapur", lat: 17.6599, lng: 75.9064 },
  // Gujarat
  { id: "ahmedabad", name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { id: "vadodara", name: "Vadodara", lat: 22.3072, lng: 73.1812 },
  { id: "rajkot", name: "Rajkot", lat: 22.3039, lng: 70.8022 },
  // Rajasthan
  { id: "udaipur", name: "Udaipur", lat: 24.5854, lng: 73.7125 },
  { id: "jodhpur", name: "Jodhpur", lat: 26.2389, lng: 73.0243 },
  { id: "kota", name: "Kota", lat: 25.2138, lng: 75.8648 },
  { id: "bikaner", name: "Bikaner", lat: 28.0229, lng: 73.3119 },
  { id: "ajmer", name: "Ajmer", lat: 26.4499, lng: 74.6399 },
  // Karnataka
  { id: "mysuru", name: "Mysuru", lat: 12.2958, lng: 76.6394 },
  { id: "hubballi", name: "Hubballi", lat: 15.3647, lng: 75.124 },
  { id: "mangaluru", name: "Mangaluru", lat: 12.9141, lng: 74.856 },
  // Telangana
  { id: "warangal", name: "Warangal", lat: 17.9689, lng: 79.5941 },
  // Assam
  { id: "guwahati", name: "Guwahati", lat: 26.1445, lng: 91.7362 },
  { id: "dibrugarh", name: "Dibrugarh", lat: 27.4728, lng: 94.912 },
  { id: "silchar", name: "Silchar", lat: 24.8333, lng: 92.7789 },
  // Bihar
  { id: "gaya", name: "Gaya", lat: 24.7914, lng: 85.0002 },
  { id: "bhagalpur", name: "Bhagalpur", lat: 25.2425, lng: 86.9842 },
  // Chhattisgarh
  { id: "bilaspur", name: "Bilaspur", lat: 22.0797, lng: 82.1409 },
  { id: "jagdalpur", name: "Jagdalpur", lat: 19.0748, lng: 82.008 },
  // Madhya Pradesh
  { id: "gwalior", name: "Gwalior", lat: 26.2183, lng: 78.1828 },
  { id: "sagar", name: "Sagar", lat: 23.8388, lng: 78.7378 },
  { id: "rewa", name: "Rewa", lat: 24.5362, lng: 81.3037 },
  // Uttar Pradesh
  { id: "lucknow", name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { id: "kanpur", name: "Kanpur", lat: 26.4499, lng: 80.3319 },
  { id: "agra", name: "Agra", lat: 27.1767, lng: 78.0081 },
  { id: "gorakhpur", name: "Gorakhpur", lat: 26.7606, lng: 83.3732 },
];

// Total client cities shown in the text and stat chip. The map only pins a
// selection of them, so this is set by hand rather than counted from pins.
const CITY_COUNT_LABEL = "115+";

// ─── PROJECTION ───────────────────────────────────────────────────────────────
const WIDTH = 700,
  HEIGHT = 780;
const LNG_MIN = 68.1,
  LNG_MAX = 97.5,
  LAT_MIN = 6.5,
  LAT_MAX = 35.7;

// The SVG viewBox is "-40 -40 760 860"; HTML overlays use percentages of it.
const VB_X = -40,
  VB_Y = -40,
  VB_W = 760,
  VB_H = 860;
const VIEWBOX = `${VB_X} ${VB_Y} ${VB_W} ${VB_H}`;

function mercY(d: number) {
  const r = (d * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + r / 2));
}
const Y_TOP = mercY(LAT_MAX);
const Y_BOT = mercY(LAT_MIN);

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * WIDTH;
  const y = HEIGHT - ((mercY(lat) - Y_BOT) / (Y_TOP - Y_BOT)) * HEIGHT;
  // Rounded so the server (Node) and browser produce identical strings:
  // Math.log/Math.tan can differ in the last digit between engines, which
  // made the pins' style attributes fail hydration.
  return {
    x,
    y,
    left: `${(((x - VB_X) / VB_W) * 100).toFixed(3)}%`,
    top: `${(((y - VB_Y) / VB_H) * 100).toFixed(3)}%`,
  };
}

// Quadratic bezier arc path string
function arcPath(x1: number, y1: number, x2: number, y2: number, curvature = 0.22) {
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  const dx = x2 - x1,
    dy = y2 - y1;
  return `M${x1},${y1} Q${mx - dy * curvature},${my + dx * curvature} ${x2},${y2}`;
}

// All geometry is static, so compute it once at module load instead of on
// every render.
const HQ_POS = project(HQ.lat, HQ.lng);

// One pin per client city (standalones + every city inside a state cluster)
const CITIES = [
  ...STANDALONES,
  ...CLUSTERS.flatMap((cl) =>
    cl.cities.map((c) => ({ ...c, id: `${cl.id}-${c.name.toLowerCase()}` })),
  ),
].map((s) => ({ ...s, ...project(s.lat, s.lng) }));

// Intro lines: client → HQ. Duration scales with distance so every line
// travels at roughly the same visual speed.
const INTRO_LINES = CITIES.map((c, i) => {
  const dx = c.x - HQ_POS.x,
    dy = c.y - HQ_POS.y;
  const len = Math.sqrt(dx * dx + dy * dy) * 1.35;
  return {
    id: c.id,
    d: arcPath(c.x, c.y, HQ_POS.x, HQ_POS.y),
    dur: Math.max(4, len / 100),
    // Spread the starts over ~6s however many pins there are, so every
    // line finishes drawing before the lines fade out at ~15s
    delay: (i * 6) / CITIES.length,
  };
});

// ─── PIN ICON ─────────────────────────────────────────────────────────────────
// Head centre (6,6) r=5, tip at (6,15). Viewbox is padded for the stroke.
const PIN_VIEWBOX = "-0.6 -0.6 13.2 16.4";
const PIN_PATH = "M6 15 L2.75 9.75 A5 5 0 1 1 9.25 9.75 Z";
const PIN_HEAD_TOP = `${(6.6 / 16.4) * 100}%`; // head centre, % from top of icon

function PinIcon({
  fill,
  strokeWidth,
  dotRadius = 1.8,
}: {
  fill: string;
  strokeWidth: number;
  dotRadius?: number;
}) {
  return (
    <svg viewBox={PIN_VIEWBOX} className="pin-icon block h-full w-full" aria-hidden="true">
      <path d={PIN_PATH} fill={fill} stroke="#fff" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="6" cy="6" r={dotRadius} fill="#fff" opacity="0.92" />
    </svg>
  );
}

// ─── THEMES ───────────────────────────────────────────────────────────────────
// "blue" is the main website; "purple" matches the portfolio page.
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
    statCell: "bg-gray-200/10 border border-slate-400/40 rounded-xl",
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

type Theme = (typeof THEMES)[MapTheme];

// ─── STATIC MAP ───────────────────────────────────────────────────────────────
// Everything expensive (176 state paths, 12 extruded layers, blur filters)
// lives here. It never re-renders and contains no animations, and it is
// promoted to its own compositor layer, so the browser rasterises it once
// instead of on every animation frame.
const StaticMap = memo(function StaticMap({ t }: { t: Theme }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className="block w-full"
      style={{ willChange: "transform" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="borderGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
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
        <filter id="landShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* land silhouette, reused for the shadow, extruded layers, top face and borders */}
        <g id="land-shape">
          {mapData.allPaths.map((d, i) => (
            <path key={i} id={i === 0 ? "land-outline" : undefined} d={d} />
          ))}
        </g>
      </defs>

      <rect x="-40" y="-40" width="780" height="860" fill="url(#mapAmbient)" />

      <g clipPath="url(#mapClip)">
        {/* soft ground shadow, then stacked layers = extruded thickness */}
        <use href="#land-shape" y="26" fill="#000" opacity="0.55" filter="url(#landShadow)" />
        {Array.from({ length: 12 }, (_, k) => 12 - k).map((n) => (
          <use
            key={n}
            href="#land-shape"
            y={n * 1.5}
            fill={n > 6 ? t.depth[0] : n > 3 ? t.depth[1] : t.depth[2]}
          />
        ))}
        <use href="#land-shape" fill="url(#landTop)" />
        {/* One filter pass for all borders, instead of one per path */}
        <use
          href="#land-shape"
          fill="none"
          stroke={t.border}
          strokeWidth="0.7"
          strokeLinejoin="round"
          filter="url(#borderGlow)"
          opacity="0.75"
        />
        <use
          href="#land-outline"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity="0.45"
        />
      </g>
    </svg>
  );
});

// ─── COMPONENT ────────────────────────────────────────────────────────────────
type ActiveCity = { id: string; name: string; x: number; y: number };

const REST_TILT = "perspective(1400px) rotateX(18deg) rotateY(0deg)";

export default function IndiaClientMap({ theme = "blue" }: { theme?: MapTheme }) {
  const t = THEMES[theme];
  const [active, setActive] = useState<ActiveCity | null>(null);

  // ── intro line animation state ──
  // "idle"    → waiting for map to enter viewport
  // "drawing" → lines are animating in (stroke-dashoffset)
  // "fading"  → lines are fading out via opacity transition
  // "done"    → lines are removed from the DOM
  const [linePhase, setLinePhase] = useState<"idle" | "drawing" | "fading" | "done">("idle");

  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltRectRef = useRef<DOMRect | null>(null);
  const tiltFrameRef = useRef(0);

  // ── Start the intro lines only once the map is on screen ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        // Give the browser time to finish painting the map and the pin drop
        // before the lines start, so the two don't compete for frames.
        timers.push(
          setTimeout(() => setLinePhase("drawing"), 700),
          setTimeout(() => setLinePhase("fading"), 15300),
          setTimeout(() => setLinePhase("done"), 17000),
        );
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      cancelAnimationFrame(tiltFrameRef.current);
    };
  }, []);

  // ── Tooltip ──
  // The map is tilted in 3D, so place the tooltip from the pin's real
  // on-screen box. Read synchronously and set state once, so the name shows
  // on the same frame as the tap / hover.
  function showCity(city: (typeof CITIES)[number], pin: HTMLElement) {
    const container = containerRef.current;
    const icon = pin.querySelector(".pin-icon") ?? pin;
    if (!container) return;
    const rc = container.getBoundingClientRect();
    const rp = icon.getBoundingClientRect();
    setActive({
      id: city.id,
      name: city.name,
      x: rp.left + rp.width / 2 - rc.left,
      y: rp.top - rc.top - 6,
    });
  }

  // ── Tilt toward the cursor (direct style writes, one per frame) ──
  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const clientX = e.clientX,
      clientY = e.clientY;
    const target = e.currentTarget;
    if (tiltFrameRef.current) return;
    tiltFrameRef.current = requestAnimationFrame(() => {
      tiltFrameRef.current = 0;
      const el = tiltRef.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = (tiltRectRef.current ??= target.getBoundingClientRect());
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1400px) rotateX(${18 - py * 10}deg) rotateY(${px * 14}deg)`;
    });
  }
  function handleTiltReset() {
    cancelAnimationFrame(tiltFrameRef.current);
    tiltFrameRef.current = 0;
    tiltRectRef.current = null;
    if (tiltRef.current) tiltRef.current.style.transform = REST_TILT;
  }

  return (
    <div className="relative w-full select-none font-sans px-3 sm:px-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* All looping animations use transform/opacity only, so they run on
           the compositor and never trigger a repaint of the map. */
        @keyframes indiaPinDrop {
          0%   { transform: translateY(-14px); opacity: 0; }
          65%  { transform: translateY(3px);   opacity: 1; }
          100% { transform: translateY(0);     opacity: 1; }
        }
        @keyframes indiaRing {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(1);   opacity: 0; }
        }
        @keyframes indiaLineDraw { to { stroke-dashoffset: 0; } }
        @keyframes indiaFadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mapFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .pin-drop { animation: indiaPinDrop 0.45s cubic-bezier(0.34,1.4,0.64,1) both; }
        .pin-ring {
          position: absolute; left: 50%; border-radius: 9999px;
          pointer-events: none; opacity: 0;
          animation: indiaRing 2s ease-out infinite;
        }
        .hq-pulse { animation-duration: 2.2s; }
        .pin-icon { transform-origin: 50% 100%; transition: transform 0.18s ease-out, filter 0.18s ease-out; }
        .india-pin { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .india-pin[data-active="true"] .pin-icon {
          transform: scale(1.18);
          filter: drop-shadow(0 0 4px rgba(198, 27, 27, 0.9));
        }
        .hq-pin:hover .pin-icon { transform: scale(1.16); }
        .tooltip-fade { animation: indiaFadeIn 0.12s ease-out both; }
        .map-float { animation: mapFloat 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .map-float, .pin-ring { animation: none; }
          .pin-drop { animation-duration: 0.01s; }
        }
      `,
        }}
      />

      {/* ── GRID: text left | map right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* ── LEFT: title + description ── */}
        <div className="flex flex-col justify-center gap-6 px-2 lg:px-0 order-1">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Serving Clients{" "}
            {t.headingAccent ? (
              <span className={t.headingAccent}>Across India</span>
            ) : (
              "Across India"
            )}
          </h2>

          <p className="text-neutral-400 leading-tight text-sm sm:text-base max-w-md">
            Vipprow helps businesses across India grow through Digital
            Marketing, Performance Marketing, Business Automation, Website
            Development, Mobile App Development, and Custom Software Solutions.
            We combine innovative technology with data-driven strategies to
            generate quality leads, strengthen brands, and streamline business
            operations. With clients across{" "}
            <span className="text-white font-medium">{CITY_COUNT_LABEL} cities</span>{" "}
            and <span className="text-white font-medium">11 states</span>,
            Vipprow serves as a trusted technology and growth partner,
            delivering scalable solutions that drive measurable business
            success.
          </p>

          {/* stat chips */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: CITY_COUNT_LABEL, label: "Client Cities" },
              { value: "11", label: "States Covered" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className={`flex flex-col items-center px-6 sm:px-10 sm:w-60 py-2.5 min-w-20 ${t.statCell}`}
              >
                <span className={`text-xl sm:text-2xl font-bold ${t.statValue}`}>{value}</span>
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
          // Tap anywhere off a pin closes the city name (touch screens)
          onClick={(e) => {
            if (!(e.target as Element).closest("[data-pin]")) setActive(null);
          }}
        >
          {/* glow pool under the map */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-[4%] left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full blur-3xl ${t.glowPool}`}
          />
          <div className="map-float w-full">
            <div
              ref={tiltRef}
              className="relative w-full"
              style={{
                transform: REST_TILT,
                transformOrigin: "50% 60%",
                transition: "transform 0.35s ease-out",
                willChange: "transform",
              }}
            >
              <StaticMap t={t} />

              {/* ── ONE-TIME INTRO LINES (own light layer, removed when done) ── */}
              {(linePhase === "drawing" || linePhase === "fading") && (
                <svg
                  viewBox={VIEWBOX}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                  style={{
                    willChange: "opacity",
                    opacity: linePhase === "fading" ? 0 : 1,
                    transition: "opacity 1.5s ease",
                  }}
                >
                  {INTRO_LINES.map((l) => (
                    <path
                      key={l.id}
                      d={l.d}
                      pathLength={1}
                      fill="none"
                      stroke={t.accent}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity="0.75"
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: 1,
                        animation: `indiaLineDraw ${l.dur}s cubic-bezier(0.4,0,0.6,1) ${l.delay}s forwards`,
                      }}
                    />
                  ))}
                </svg>
              )}

              {/* ── PINS (HTML, so pulses run on the GPU and tap targets can be big) ── */}
              <div className="absolute inset-0">
                {CITIES.map((city, idx) => {
                  const isActive = active?.id === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      data-pin
                      data-active={isActive}
                      aria-label={city.name}
                      className="india-pin absolute flex h-10 w-8 -translate-x-1/2 -translate-y-full cursor-pointer items-end justify-center outline-none sm:h-8 sm:w-7"
                      style={{ left: city.left, top: city.top, zIndex: isActive ? 20 : 1 }}
                      onPointerEnter={(e) => {
                        if (e.pointerType === "mouse") showCity(city, e.currentTarget);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "mouse") setActive(null);
                      }}
                      onClick={(e) => showCity(city, e.currentTarget)}
                      onFocus={(e) => showCity(city, e.currentTarget)}
                      onBlur={() => setActive(null)}
                    >
                      <span
                        className="pin-drop relative block h-[18px] w-[14px] sm:h-[18px] sm:w-[14px]"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                      >
                        <span
                          className="pin-ring h-6 w-6 border-2 border-white/90"
                          style={{ top: PIN_HEAD_TOP, animationDelay: `${idx * 0.25}s` }}
                        />
                        <span
                          className="pin-ring h-6 w-6 border border-white/90"
                          style={{ top: PIN_HEAD_TOP, animationDelay: `${idx * 0.25 + 0.8}s` }}
                        />
                        <PinIcon fill="#c61b1b" strokeWidth={0.9} />
                      </span>
                    </button>
                  );
                })}

                {/* ── HQ PIN ── */}
                <div
                  className="absolute"
                  style={{ left: HQ_POS.left, top: HQ_POS.top, zIndex: 15 }}
                >
                  <span
                    className="pin-ring hq-pulse top-0 h-10 w-10 border-[1.5px] sm:h-12 sm:w-12"
                    style={{ borderColor: t.hq }}
                  />
                  <span
                    className="pin-ring hq-pulse top-0 h-10 w-10 border sm:h-12 sm:w-12"
                    style={{ borderColor: t.hq, animationDelay: "0.9s" }}
                  />
                  <div className="hq-pin absolute bottom-0 left-0 flex -translate-x-1/2 cursor-pointer flex-col items-center">
                    <span
                      className="mb-1 font-mono text-[9px] font-extrabold tracking-[0.08em] sm:text-[10px]"
                      style={{ color: t.hqHover }}
                    >
                      VIPPROW
                    </span>
                    <span className="relative block h-5 w-4">
                      <span
                        className="pin-ring h-5 w-5 border"
                        style={{ top: PIN_HEAD_TOP, borderColor: t.hqHover }}
                      />
                      <span
                        className="pin-ring h-5 w-5 border"
                        style={{ top: PIN_HEAD_TOP, borderColor: t.hqHover, animationDelay: "0.8s" }}
                      />
                      <PinIcon fill={t.hq} strokeWidth={1.3} dotRadius={2.2} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CITY NAME TOOLTIP ── */}
          {active && (
            <div
              className="pointer-events-none absolute z-50"
              style={{ left: active.x, top: active.y, transform: "translate(-50%, -100%)" }}
            >
              <div className="tooltip-fade whitespace-nowrap bg-slate-950/95 border border-white/20 px-2.5 py-1.5 rounded-lg shadow-2xl font-mono text-xs sm:text-sm font-bold text-white">
                {active.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
