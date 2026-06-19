"use client";

import React, { useState, useRef, useEffect } from "react";
import { certificates } from "../../seeds/certificates";

/* ── Sample data ─────────────────────────────────────────────────────── */
// const LANDSCAPE_CERTS = [
//   {
//     id: 1,
//     title: "AWS Solutions Architect",
//     issuer: "Amazon Web Services",
//     date: "Jan 2024",
//     credentialId: "AWS-SA-2024-001",
//     color: "#FF9900",
//     icon: "☁️",
//     bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
//   },
//   {
//     id: 2,
//     title: "Google Cloud Professional",
//     issuer: "Google Cloud",
//     date: "Mar 2024",
//     credentialId: "GCP-PRO-2024-042",
//     color: "#4285F4",
//     icon: "🌐",
//     bg: "linear-gradient(135deg,#0a0a2e,#1a237e,#283593)",
//   },
//   {
//     id: 3,
//     title: "React Developer Certification",
//     issuer: "Meta",
//     date: "Jun 2024",
//     credentialId: "META-RD-2024-117",
//     color: "#61DAFB",
//     icon: "⚛️",
//     bg: "linear-gradient(135deg,#001122,#003355,#004477)",
//   },
//   {
//     id: 4,
//     title: "Kubernetes Administrator",
//     issuer: "CNCF",
//     date: "Aug 2024",
//     credentialId: "CNCF-CKA-2024-089",
//     color: "#326CE5",
//     icon: "⚙️",
//     bg: "linear-gradient(135deg,#0d0d2b,#1a1a4e,#2626660)",
//   },
//   {
//     id: 5,
//     title: "Docker Certified Associate",
//     issuer: "Docker Inc.",
//     date: "Oct 2024",
//     credentialId: "DCA-2024-055",
//     color: "#2496ED",
//     icon: "🐳",
//     bg: "linear-gradient(135deg,#0a1628,#0d2137,#112840)",
//   },
// ];

// const PORTRAIT_CERTS = [
//   {
//     id: 1,
//     title: "Machine Learning Specialization",
//     issuer: "Stanford / Coursera",
//     date: "Feb 2024",
//     credentialId: "ML-SPEC-2024-334",
//     icon: "🤖",
//     color: "#a78bfa",
//     bg: "linear-gradient(160deg,#0f0022,#1e0044,#2d0066)",
//   },
//   {
//     id: 2,
//     title: "Full Stack Web Development",
//     issuer: "The Odin Project",
//     date: "Apr 2024",
//     credentialId: "FSWD-2024-211",
//     color: "#c4b5fd",
//     icon: "💻",
//     bg: "linear-gradient(160deg,#0c0020,#1a003a,#260055)",
//   },
//   {
//     id: 3,
//     title: "UI / UX Design Foundations",
//     issuer: "Google",
//     date: "Jul 2024",
//     credentialId: "UIUX-GG-2024-077",
//     color: "#ddd6fe",
//     icon: "🎨",
//     bg: "linear-gradient(160deg,#08001e,#150036,#22004e)",
//   },
//   {
//     id: 4,
//     title: "Cybersecurity Analyst",
//     issuer: "IBM",
//     date: "Sep 2024",
//     credentialId: "IBM-CSA-2024-198",
//     color: "#8b5cf6",
//     icon: "🔐",
//     bg: "linear-gradient(160deg,#0a0018,#18002e,#260044)",
//   },
// ];

/* ── Landscape Card ─────────────────────────────────────────────────── */
// const LandscapeCard = ({ cert }) => {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div
//       onClick={() => setFlipped((f) => !f)}
//       className="relative w-95 h-55 cursor-pointer shrink-0 perspective-[1000px]"
//     >
//       <div
//         className={`relative w-full h-full duration-700 transition-transform transform-3d ${
//           flipped ? "transform-[rotateY(180deg)]" : "transform-[rotateY(0deg)]"
//         }`}
//       >
//         {/* FRONT */}
//         <div
//           className="absolute inset-0 rounded-[20px] border border-violet-500/25 p-7 flex flex-col justify-between overflow-hidden backface-hidden"
//           style={{ background: cert.bg }}
//         >
//           {/* Decorative Rings */}
//           <div
//             className="absolute -right-10 -top-10 w-45 h-45 rounded-full border-2 pointer-events-none"
//             style={{ borderColor: `${cert.color}22` }}
//           />
//           <div
//             className="absolute -right-4 -top-4 w-27.5 h-27.5 rounded-full border-2 pointer-events-none"
//             style={{ borderColor: `${cert.color}33` }}
//           />

//           <div className="flex justify-between items-start">
//             <div>
//               <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-violet-400/70">
//                 Certificate of Completion
//               </span>
//               <h3 className="mt-2 text-[19px] font-bold text-white leading-tight max-w-60">
//                 {cert.title}
//               </h3>
//             </div>
//             <span className="text-[38px] leading-none">{cert.icon}</span>
//           </div>

//           <div className="flex justify-between items-end">
//             <div>
//               <p className="m-0 text-[13px] text-white/50 font-medium">
//                 Issued by
//               </p>
//               <p
//                 className="mt-0.5 text-[15px] font-semibold"
//                 style={{ color: cert.color }}
//               >
//                 {cert.issuer}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="m-0 text-[12px] text-white/40">{cert.date}</p>
//               <p className="mt-1 text-[10px] text-violet-500/60 font-mono">
//                 {cert.credentialId}
//               </p>
//             </div>
//           </div>

//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-violet-500/45 tracking-[0.2em] uppercase">
//             tap to flip
//           </div>
//         </div>

//         {/* BACK */}
//         <div className="absolute inset-0 rounded-[20px] border border-violet-500/40 p-7 flex flex-col items-center justify-center gap-3 backface-hidden transform-[rotateY(180deg)] bg-linear-to-br from-[#1a0033] via-[#2d0066] to-[#1a0033]">
//           <div
//             className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-[28px]"
//             style={{
//               background: `${cert.color}22`,
//               borderColor: `${cert.color}55`,
//             }}
//           >
//             {cert.icon}
//           </div>
//           <h4 className="m-0 text-[17px] font-bold text-white text-center">
//             {cert.title}
//           </h4>
//           <p
//             className="m-0 text-[13px] font-semibold"
//             style={{ color: cert.color }}
//           >
//             {cert.issuer}
//           </p>

//           <div className="mt-2 bg-violet-500/10 border border-violet-500/25 rounded-xl py-2 px-5 text-center">
//             <p className="m-0 text-[9px] text-violet-400/60 tracking-widest uppercase">
//               Credential ID
//             </p>
//             <p className="mt-1 text-xs text-violet-200 font-mono">
//               {cert.credentialId}
//             </p>
//           </div>
//           <p className="m-0 text-xs text-white/35 font-medium tracking-wide">
//             Issued: {cert.date}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

/* ── Portrait Card ──────────────────────────────────────────────────── */
// const PortraitCard = ({ cert }) => {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div
//       onClick={() => setFlipped((f) => !f)}
//       className="relative w-60 h-80 cursor-pointer shrink-0 perspective-[1000px]"
//     >
//       <div
//         className={`relative w-full h-full duration-700 transition-transform transform-3d rounded-[20px] ${
//           flipped ? "transform-[rotateY(180deg)]" : "transform-[rotateY(0deg)]"
//         } bg-no-repeat bg-cover bg-center`}
//         style={{ backgroundImage: `url(${cert.img})` }}
//       >
//         {/* FRONT */}
//         <div
//           className="absolute inset-0 rounded-[20px] border border-violet-500/25 py-7 px-6 flex flex-col items-center justify-between overflow-hidden text-center backface-hidden"
//           // style={{ background: cert.bg }}
//         >
//           {/* <div
//             className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-50 h-50 rounded-full border-2 pointer-events-none"
//             style={{ borderColor: `${cert.color}22` }}
//           />

//           <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-violet-400/60">
//             Certificate
//           </span> */}

//           {/* <div
//             className="w-17 h-17 rounded-full border-2 flex items-center justify-center text-[34px]"
//             style={{
//               background: `${cert.color}15`,
//               borderColor: `${cert.color}44`,
//             }}
//           >
//             {cert.icon}
//           </div> */}

//           {/* <div>
//             <h3 className="m-0 text-base font-bold text-white leading-snug">
//               {cert.title}
//             </h3>
//             <p
//               className="mt-2 text-xs font-semibold"
//               style={{ color: cert.color }}
//             >
//               {cert.issuer}
//             </p>
//             <p className="mt-1.5 text-[11px] text-white/35 font-medium">
//               {cert.issuedOn}
//             </p>
//           </div> */}

//           <div className="text-[9px] text-violet-500/45 tracking-[0.2em] uppercase">
//             tap to flip
//           </div>
//         </div>

//         {/* BACK */}
//         <div className="absolute inset-0 rounded-[20px] border border-violet-500/40 p-6 flex flex-col items-center justify-center gap-2.5 text-center backface-hidden transform-[rotateY(180deg)] bg-linear-to-b from-[#1a0033] via-[#2d0066] to-[#1a0033]">
//           <div className="text-4xl mb-1">{cert.icon}</div>
//           <h4 className="m-0 text-[15px] font-bold text-white leading-snug">
//             {cert.title}
//           </h4>
//           <p
//             className="m-0 text-xs font-semibold"
//             style={{ color: cert.color }}
//           >
//             {cert.issuer}
//           </p>

//           <div className="mt-1.5 bg-violet-500/10 border border-violet-500/25 rounded-xl py-2 px-4">
//             <p className="m-0 text-[9px] text-violet-400/60 tracking-widest uppercase">
//               Credential ID
//             </p>
//             <p className="mt-1 text-[11px] text-violet-200 font-mono">
//               {cert.credentialId}
//             </p>
//           </div>
//           <p className="m-0 text-[11px] text-white/35 font-medium tracking-wide">
//             Issued: {cert.issuedOn}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

const PortraitCard = ({ cert }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      // Added 'group' to the parent container
      className="relative w-60 h-80 cursor-pointer shrink-0 perspective-[1000px] group"
    >
      <div
        className={`relative w-full h-full duration-700 transition-transform transform-3d rounded-4xl ${
          flipped ? "rotate-y-180" : "rotate-y-0"
        } bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${cert.img})` }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 rounded-4xl border border-violet-500/25 flex flex-col items-center justify-end pb-8 overflow-hidden text-center backface-hidden transition-all duration-300 group-hover:bg-black/40">
          {/* This text only appears on hover */}
          <div className="text-[10px] text-white tracking-[0.2em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-violet-600/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            tap to flip
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-4xl border border-violet-500/40 p-6 flex flex-col items-center justify-center gap-2.5 text-center backface-hidden rotate-y-180 bg-linear-to-b from-[#1a0033] via-[#2d0066] to-[#1a0033]">
          <div className="text-4xl mb-1">{cert.icon}</div>
          <h4 className="m-0 text-[15px] font-bold text-white leading-snug">
            {cert.title}
          </h4>
          <p
            className="m-0 text-xs font-semibold"
            style={{ color: cert.color }}
          >
            {cert.issuer}
          </p>

          <div className="mt-1.5 bg-violet-500/10 border border-violet-500/25 rounded-xl py-2 px-4">
            <p className="m-0 text-[9px] text-violet-400/60 tracking-widest uppercase">
              Credential ID
            </p>
            <p className="mt-1 text-[11px] text-violet-200 font-mono">
              {cert.credentialId}
            </p>
          </div>
          <p className="m-0 text-[11px] text-white/35 font-medium tracking-wide">
            Issued: {cert.issuedOn}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Carousel ───────────────────────────────────────────────────────── */
const Carousel = ({ children, gap = 24 }) => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkBounds = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkBounds, { passive: true });
    checkBounds();
    return () => el.removeEventListener("scroll", checkBounds);
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto [scroll-snap-type:x_mandatory] pb-3 px-15 no-scrollbar"
        style={{ gap: `${gap}px` }}
      >
        {React.Children.map(children, (child) => (
          <div className="snap-center shrink-0">{child}</div>
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-center gap-3 mt-6">
        {[
          { dir: -1, label: "←", active: canPrev },
          { dir: 1, label: "→", active: canNext },
        ].map(({ dir, label, active }) => (
          <button
            key={dir}
            onClick={() => scroll(dir)}
            disabled={!active}
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all duration-200 ${
              active
                ? "bg-violet-500/15 border-violet-500/45 text-violet-400 cursor-pointer"
                : "bg-violet-500/5 border-violet-500/15 text-violet-500/30 cursor-default"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Main Section ───────────────────────────────────────────────────── */
const CertificatesSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#030014] flex flex-col items-center py-20 pb-25">
      {/* Ambient blobs */}
      <div className="absolute w-130 h-130 rounded-full -top-20 -right-15 pointer-events-none bg-violet-500/10 blur-[130px] opacity-35" />
      <div className="absolute w-95 h-95 rounded-full bottom-10 -left-20 pointer-events-none bg-violet-800/10 blur-[130px] opacity-25" />

      {/* Header */}
      <div className="z-10 text-center mb-16 px-6">
        <div className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 border border-violet-500/30 bg-violet-700/10 text-[11px] font-bold tracking-[0.25em] uppercase text-violet-400 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Achievements
        </div>
        <h2 className="font-extrabold text-[clamp(28px,5vw,48px)] text-white m-0">
          Our{" "}
          <span className="bg-linear-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Certifications
          </span>
        </h2>
        {/* <p className="mt-4 text-base text-white/45 max-w-120 mx-auto">
          Industry-recognized credentials across cloud, development & design.
        </p> */}
      </div>

      {/* Landscape Section */}
      {/* <div className="w-full mb-18">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400/55">
            ▬ Landscape Certificates ▬
          </span>
        </div>
        <Carousel>
          {LANDSCAPE_CERTS.map((c) => (
            <LandscapeCard key={c.id} cert={c} />
          ))}
        </Carousel>
      </div> */}

      {/* Divider */}
      <div className="w-3/5 max-w-150 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent mb-18" />

      {/* Portrait Section */}
      <div className="w-full">
        {/* <div className="text-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400/55">
            ▬ Portrait Certificates ▬
          </span>
        </div> */}
        <Carousel>
          {certificates.map((c) => (
            <PortraitCard key={c.id} cert={c} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CertificatesSection;
