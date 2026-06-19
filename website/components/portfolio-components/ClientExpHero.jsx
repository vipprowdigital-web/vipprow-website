"use client";
// components/Hero.jsx

import { useRouter } from "next/navigation";

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function ClientExpHero({
  firstPart,
  secondPart,
  desc,

  // button configs
  primaryBtn,
  secondaryBtn,
}) {
  // universal handler
  const router = useRouter();

  const handleAction = (action) => {
    if (!action) return;

    // ✅ scroll
    if (action.type === "scroll") {
      const el = document.querySelector(action.target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    // ✅ external link
    if (action.type === "link") {
      // if (action.newTab) {
      window.open(action.href, "_blank");
      // } else {s
      // window.location.href = action.href;
      // }
    }

    // ✅ internal route (NEW)
    if (action.type === "route") {
      router.push(action.to);
    }

    // ✅ custom
    if (action.type === "custom" && typeof action.onClick === "function") {
      action.onClick();
    }
  };

  return (
    <section
      className="relative overflow-hidden min-h-180 flex flex-col
      items-center justify-center text-center px-6 pt-28 pb-20"
    >
      {/* ambient blobs */}
      <div
        className="absolute w-130 h-130 rounded-full -top-20 -right-16 pointer-events-none"
        style={{ background: "rgba(139,92,246,0.14)", filter: "blur(130px)" }}
      />
      <div
        className="absolute w-95 h-95 rounded-full top-80 -left-20 pointer-events-none"
        style={{ background: "rgba(99,58,200,0.09)", filter: "blur(130px)" }}
      />

      {/* pill */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 mb-8
        border border-purple-500/30 text-[11px] font-semibold tracking-widest uppercase text-violet-400"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        Growth Systems for real businesses
      </div>

      {/* heading */}
      <h1 className="font-sora font-extrabold leading-[1.08] tracking-tight text-4xl md:text-6xl max-w-4xl mb-6">
        {firstPart}
        <br />
        <span style={gradText}>{secondPart}</span>
      </h1>

      {/* desc */}
      <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md mb-10">
        {desc}
      </p>

      {/* buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Primary */}
        {primaryBtn && (
          <button
            onClick={() => handleAction(primaryBtn.action)}
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white
            bg-linear-to-br from-violet-700 to-violet-500
            hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {primaryBtn.text}
          </button>
        )}

        {/* Secondary */}
        {secondaryBtn && (
          <button
            onClick={() => handleAction(secondaryBtn.action)}
            className="px-7 py-3.5 rounded-xl text-sm font-medium text-white/70
            border border-purple-500/35 hover:border-purple-500/70
            hover:text-white transition-all"
          >
            {secondaryBtn.text}
          </button>
        )}
      </div>
    </section>
  );
}

// const gradText = {
//   background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
// };

// export default function ClientExpHero({
//   firstPart,
//   secondPart,
//   desc,
//   btnText1,
//   btnText2,
//   isRef,
//   onClkOne,
//   onClkTwo,
// }) {
//   return (
//     <section
//       className="relative overflow-hidden min-h-180 flex flex-col
//       items-center justify-center text-center px-6 pt-28 pb-20"
//     >
//       {/* ambient blobs */}
//       <div
//         className="absolute w-130 h-130 rounded-full -top-20 -right-16 pointer-events-none"
//         style={{ background: "rgba(139,92,246,0.14)", filter: "blur(130px)" }}
//       />
//       <div
//         className="absolute w-95 h-95 rounded-full top-80 -left-20 pointer-events-none"
//         style={{ background: "rgba(99,58,200,0.09)", filter: "blur(130px)" }}
//       />

//       {/* eyebrow pill */}
//       <div
//         className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 mb-8
//         border border-purple-500/30 text-[11px] font-semibold tracking-widest uppercase text-violet-400"
//       >
//         <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
//         Growth Systems for real businesses
//       </div>

//       <h1
//         className="font-sora font-extrabold leading-[1.08] tracking-tight
//         text-4xl md:text-6xl max-w-4xl mb-6"
//       >
//         {firstPart}
//         <br />
//         <span style={gradText}>{secondPart}</span>
//       </h1>

//       <p className="text-white/42 text-sm leading-relaxed max-w-md mb-10">
//         {desc}
//       </p>

//       <div className="flex flex-wrap items-center justify-center gap-4">
//         <button
//           className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white
//           bg-linear-to-br from-violet-700 to-violet-500 hover:opacity-85 transition-opacity"
//         >
//           {btnText1}
//         </button>
//         <button
//           className="px-7 py-3.5 rounded-xl text-sm font-medium text-white/65
//           border border-purple-500/35 hover:border-purple-500/70 hover:text-white transition-all"
//         >
//           {btnText2}
//         </button>
//       </div>
//     </section>
//   );
// }
