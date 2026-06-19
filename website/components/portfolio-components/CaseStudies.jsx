"use client";

// components/FeaturedCase.jsx
import { motion } from "framer-motion";
import { Rocket, Target, ChartArea, RefreshCcw } from "lucide-react";

const STRATEGY = [
  {
    num: "01",
    title: "High-Intent Google Ads",
    desc: "EPC & MMS keyword targeting",
  },
  {
    num: "02",
    title: "LinkedIn B2B Campaigns",
    desc: "Decision-maker targeting",
  },
  {
    num: "03",
    title: "Conversion Landing Pages",
    desc: "Focused on lead capture",
  },
  { num: "04", title: "Retargeting Funnel", desc: "Warm audience conversion" },
];

const EXECUTION = [
  {
    icon: <Rocket size={18} color="#8b5cf6" />,
    text: "Multi-platform campaign launch",
  },
  {
    icon: <Target size={18} color="#8b5cf6" />,
    text: "Audience testing & optimization",
  },
  {
    icon: <ChartArea size={18} color="#8b5cf6" />,
    text: "Funnel tracking & improvement",
  },
  {
    icon: <RefreshCcw size={18} color="#8b5cf6" />,
    text: "Continuous data-driven scaling",
  },
];

const RESULTS = [
  { num: "3×", label: "Lead Growth in 45 Days" },
  { num: "40%↓", label: "Cost Per Lead" },
  { num: "B2B", label: "High-Quality Inquiries" },
  {
    num: <RefreshCcw size={20} color="#c084fc" />,
    label: "Consistent Lead Flow",
  },
];

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// shared border-grid helpers
const outerBorder = {
  borderTop: "1px solid rgba(255,255,255,0.06)",
  borderLeft: "1px solid rgba(255,255,255,0.06)",
};
const cell = {
  borderRight: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

function BlockLabel({ children }) {
  return (
    <p
      className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase
      text-purple-500/70 mb-5"
    >
      <span className="inline-block w-4 h-px bg-purple-500/50" />
      {children}
    </p>
  );
}

export default function FeaturedCase() {
  return (
    <section id="featured-case" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-5">Featured Case Study</p>

          <h2
            className="font-sora font-extrabold text-4xl md:text-5xl tracking-tight
            leading-tight mb-6"
          >
            From zero system to
            <br />
            <span style={gradText}>3× leads in 45 days.</span>
          </h2>

          {/* Client pill */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.28)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center
              font-sora font-extrabold text-[10px] text-purple-300"
              style={{
                background: "rgba(139,92,246,0.25)",
                border: "1px solid rgba(139,92,246,0.4)",
              }}
            >
              SI
            </div>
            <div>
              <p className="text-md font-semibold text-white/80">
                Shivam Infracon
              </p>
              <p className="text-sm text-white/35">B2B Solar · Maharashtra</p>
            </div>
          </div>
        </motion.div>

        {/* ── Border grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2"
          style={outerBorder}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {/* Challenge */}
          <div className="p-9" style={cell}>
            <BlockLabel>The Challenge</BlockLabel>
            <div className="flex flex-col gap-3">
              {[
                "No consistent lead flow",
                "Low brand visibility in Maharashtra",
                "Difficulty targeting B2B solar companies",
                "No proper funnel or conversion system",
              ].map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 text-md text-white/50 leading-relaxed"
                >
                  <span
                    className="w-1 h-1 rounded-full bg-violet-500 shrink-0 mt-2
                    shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                  />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Strategy */}
          <div className="p-9" style={cell}>
            <BlockLabel>Our Strategy</BlockLabel>
            <div className="relative flex flex-col gap-0">
              {/* vertical line */}
              <div
                className="absolute left-3.25 top-3 bottom-3 w-px"
                style={{ background: "rgba(139,92,246,0.2)" }}
              />

              {STRATEGY.map((s) => (
                <div
                  key={s.num}
                  className="flex gap-4 items-start pb-5 last:pb-0"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center
                    font-sora font-extrabold text-sm text-violet-400 shrink-0 relative z-10"
                    style={{
                      background: "#080810",
                      border: "1px solid rgba(139,92,246,0.4)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div>
                    <p className="font-sora font-bold text-md text-white mb-0.5">
                      {s.title}
                    </p>
                    <p className="text-sm text-white/35">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution */}
          <div className="p-9" style={cell}>
            <BlockLabel>Execution</BlockLabel>
            <div className="grid grid-cols-2 gap-3">
              {EXECUTION.map((e) => (
                <div
                  key={e.text}
                  className="rounded-xl p-4 text-sm text-white/50 leading-snug
                    hover:text-white/80 hover:bg-purple-900/10 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="block text-sm mb-2">{e.icon}</span>
                  {e.text}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="p-9" style={cell}>
            <BlockLabel>Results</BlockLabel>
            <div className="grid grid-cols-2 gap-3">
              {RESULTS.map((r) => (
                <div
                  key={r.label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(139,92,246,0.08)",
                    border: "1px solid rgba(139,92,246,0.22)",
                  }}
                >
                  <p
                    className="font-sora font-extrabold text-2xl mb-1 leading-none text-center flex justify-center"
                    style={gradText}
                  >
                    {r.num}
                  </p>
                  <p className="text-sm text-white/38 leading-snug">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote — full width */}
          <div
            className="md:col-span-2 flex items-start gap-7 px-10 py-9"
            style={{ ...cell, background: "rgba(139,92,246,0.04)" }}
          >
            <span className="font-sora text-6xl leading-none text-purple-500/20 shrink-0">
              &quot;
            </span>
            <div>
              <p className="text-md text-white/60 leading-relaxed italic mb-4 max-w-2xl">
                Vipprow didn&apos;t just run ads — they built a system that
                consistently generates business inquiries for us.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center
                  font-sora font-extrabold text-[9px] text-purple-300 shrink-0"
                  style={{
                    background: "rgba(139,92,246,0.2)",
                    border: "1px solid rgba(139,92,246,0.35)",
                  }}
                >
                  SI
                </div>
                <div>
                  <p className="text-md font-semibold text-white/60">
                    Shivam Infracon
                  </p>
                  <p className="text-sm text-white/28">
                    B2B Solar · Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { TrendingUp, Users, Target, BarChart2 } from 'lucide-react'

// const CASES = [
//   {
//     tag: 'E-commerce / D2C',
//     title: 'Scaling a Fashion Brand from ₹5L to ₹50L Monthly Revenue',
//     industry: 'Fashion',
//     problem: 'Scaling plateaus and high customer acquisition cost were stalling growth.',
//     solution: 'Omnichannel funnel with high-intent creative strategy, retargeting layers & automated email flows.',
//     result: '7x ROAS',
//     metric: '10x Revenue in 6 months',
//     accent: '#8B5CF6',
//     channels: ['Meta Ads', 'Google', 'Email', 'Retargeting'],
//     stats: [
//       { icon: TrendingUp, label: 'ROAS',         value: '7x'    },
//       { icon: Users,      label: 'Revenue Lift',  value: '10x'   },
//       { icon: Target,     label: 'CAC Reduction', value: '52%'   },
//       { icon: BarChart2,  label: 'Conv. Rate',    value: '4.8%'  },
//     ],
//   },
//   {
//     tag: 'Ed-Tech',
//     title: 'Driving 15,000 Course Enrollments in Just 90 Days',
//     industry: 'Education',
//     problem: 'Low demo-to-paid conversion and expensive YouTube spend with minimal results.',
//     solution: 'VSL funnels, YouTube retargeting, landing page CRO and WhatsApp nurture sequences.',
//     result: '3.2x CAC Drop',
//     metric: '15K enrollments in 90 days',
//     accent: '#EC4899',
//     channels: ['YouTube', 'Meta', 'WhatsApp', 'CRO'],
//     stats: [
//       { icon: TrendingUp, label: 'Enrollments',   value: '15K'   },
//       { icon: Users,      label: 'Demo Rate',      value: '+68%'  },
//       { icon: Target,     label: 'CAC Reduction',  value: '3.2x'  },
//       { icon: BarChart2,  label: 'LTV Growth',     value: '+91%'  },
//     ],
//   },
//   {
//     tag: 'Real Estate',
//     title: 'Generating 2,500 Qualified Leads for a Premium Residential Project',
//     industry: 'Real Estate',
//     problem: 'Generic campaigns delivering poor-quality inquiries from non-serious buyers.',
//     solution: 'Intent-based Google Search, hyper-local targeting & automated lead scoring pipelines.',
//     result: '₹2Cr+ Pipeline',
//     metric: '2,500 qualified leads',
//     accent: '#06B6D4',
//     channels: ['Google Search', 'Meta', 'Lead Scoring', 'CRM'],
//     stats: [
//       { icon: TrendingUp, label: 'Pipeline Value', value: '₹2Cr+' },
//       { icon: Users,      label: 'Qual. Leads',    value: '2,500' },
//       { icon: Target,     label: 'Site Visits',    value: '+320%' },
//       { icon: BarChart2,  label: 'CPL Drop',       value: '61%'   },
//     ],
//   },
// ]

// // ── Mockup card inside case visual ─────────────────────────────────────────
// function MockupCard({ c }) {
//   return (
//     <motion.div
//       className="w-full max-w-[280px] rounded-2xl p-5"
//       style={{
//         background: 'rgba(255,255,255,0.04)',
//         border: '1px solid rgba(255,255,255,0.08)',
//         animation: 'float 3.2s ease-in-out infinite',
//       }}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <p className="font-sora text-[0.6rem] tracking-widest uppercase text-white/30 mb-4">
//         Campaign Dashboard
//       </p>

//       {/* Main metric */}
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <p className="font-sora text-3xl font-extrabold" style={{ color: c.accent }}>
//             {c.result}
//           </p>
//           <p className="text-[0.6rem] text-white/35 mt-0.5">Primary result</p>
//         </div>
//         <div className="text-right">
//           <p className="font-sora text-lg font-bold text-white">{c.metric.split(' ')[0]}</p>
//           <p className="text-[0.6rem] text-white/35 mt-0.5">Key metric</p>
//         </div>
//       </div>

//       {/* Progress bar */}
//       <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-4">
//         <motion.div
//           className="h-full rounded-full"
//           style={{ background: c.accent }}
//           initial={{ width: 0 }}
//           animate={{ width: '78%' }}
//           transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
//         />
//       </div>

//       {/* Channel pills */}
//       <div className="flex flex-wrap gap-1.5">
//         {c.channels.map((ch) => (
//           <span
//             key={ch}
//             className="text-[0.6rem] px-2 py-0.5 rounded-full"
//             style={{
//               background: 'rgba(255,255,255,0.05)',
//               border: '1px solid rgba(255,255,255,0.08)',
//               color: 'rgba(255,255,255,0.45)',
//             }}
//           >
//             {ch}
//           </span>
//         ))}
//       </div>
//     </motion.div>
//   )
// }

// // ── Main section ────────────────────────────────────────────────────────────
// export default function CaseStudies() {
//   const [active, setActive] = useState(0)
//   const c = CASES[active]

//   return (
//     <section id="cases" className="relative z-10 py-24 px-6 md:px-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.p
//           className="section-label mb-3"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           Results
//         </motion.p>

//         <motion.h2
//           className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.55, delay: 0.08 }}
//         >
//           Case <span style={{ color: '#8B5CF6' }}>Studies</span>
//         </motion.h2>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {CASES.map((cs, i) => (
//             <button
//               key={cs.tag}
//               onClick={() => setActive(i)}
//               className="text-xs font-medium px-5 py-2 rounded-full cursor-pointer
//                          transition-all duration-200 border"
//               style={
//                 active === i
//                   ? {
//                       background: 'rgba(139,92,246,0.15)',
//                       borderColor: '#8B5CF6',
//                       color: '#fff',
//                     }
//                   : {
//                       background: 'rgba(255,255,255,0.04)',
//                       borderColor: 'rgba(255,255,255,0.08)',
//                       color: 'rgba(255,255,255,0.5)',
//                     }
//               }
//             >
//               {cs.tag}
//             </button>
//           ))}
//         </div>

//         {/* Card */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={active}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -12 }}
//             transition={{ duration: 0.35, ease: 'easeOut' }}
//             className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[380px]"
//             style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
//           >
//             {/* Visual panel */}
//             <div
//               className="flex items-center justify-center p-10 relative"
//               style={{
//                 background: `linear-gradient(135deg, ${c.accent}18 0%, transparent 70%)`,
//               }}
//             >
//               <MockupCard c={c} />
//             </div>

//             {/* Info panel */}
//             <div className="p-8 md:p-10 flex flex-col justify-between">
//               <div>
//                 <p
//                   className="font-sora text-[0.65rem] tracking-[0.12em] uppercase font-semibold mb-3"
//                   style={{ color: c.accent }}
//                 >
//                   {c.tag}
//                 </p>

//                 <h3 className="font-sora text-xl md:text-2xl font-bold leading-snug mb-6 text-white">
//                   {c.title}
//                 </h3>

//                 {/* Problem / Solution */}
//                 <div className="flex flex-col gap-3 mb-6">
//                   <div
//                     className="px-4 py-3 rounded-lg"
//                     style={{
//                       borderLeft: `2px solid ${c.accent}`,
//                       background: 'rgba(255,255,255,0.025)',
//                     }}
//                   >
//                     <p className="text-[0.6rem] tracking-widest uppercase text-white/35 mb-1">Problem</p>
//                     <p className="text-sm text-white/65 leading-relaxed">{c.problem}</p>
//                   </div>
//                   <div
//                     className="px-4 py-3 rounded-lg"
//                     style={{
//                       borderLeft: `2px solid ${c.accent}`,
//                       background: 'rgba(255,255,255,0.025)',
//                     }}
//                   >
//                     <p className="text-[0.6rem] tracking-widest uppercase text-white/35 mb-1">VIPPROW Solution</p>
//                     <p className="text-sm text-white/65 leading-relaxed">{c.solution}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats row */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {c.stats.map(({ icon: Icon, label, value }) => (
//                   <div
//                     key={label}
//                     className="rounded-xl p-3 text-center"
//                     style={{ background: `${c.accent}12`, border: `1px solid ${c.accent}28` }}
//                   >
//                     <Icon size={14} color={c.accent} className="mx-auto mb-1" />
//                     <p className="font-sora font-bold text-sm text-white">{value}</p>
//                     <p className="text-[0.6rem] text-white/40 mt-0.5">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   )
// }
