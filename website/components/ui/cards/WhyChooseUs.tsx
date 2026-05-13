"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="relative py-10 px-6 md:px-16 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_0_80px_-15px_rgba(139,92,246,0.35)]">
            <Image
              src="/assets/images/company/mission.jpeg"
              alt="Company Vision"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* RIGHT CONTENT */}
        <div>
          <span className="text-sm uppercase tracking-widest text-neutral-400 font-heading">
            {/* Our Vision */}
          </span>

          <h2 className="mt-4 text-4xl font-semibold leading-tight font-heading">
            Growth with Purpose, Not Just Progress
          </h2>

          <p className="mt-6 text-neutral-400 max-w-xl leading-relaxed font-heading text-sm">
            At Vipprow, we design scalable growth frameworks powered by data,
            automation, and strategic execution—so businesses can move faster
            and grow smarter.
          </p>

          {/* Vision bullets */}
          <div className="mt-12 space-y-8">
            <VisionItem
              title="We Deliver Measurable Results"
              description="Vipprow focuses on performance, not promises. Every strategy is built to generate leads, conversions, and real ROI."
            />

            <VisionItem
              title="Because We Simplify Complexity"
              description="We turn complicated marketing and operational processes into simple, automated systems.."
            />

            <VisionItem
              title="Because We Focus on Long-Term Growth"
              description="We don’t chase short-term wins — we build strategies designed for sustainable scales."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- SUB COMPONENT ----------------- */

function VisionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="font-semibold flex items-center gap-2 font-heading">
        {title}
        <ArrowUpRight className="h-4 w-4 text-blue-500" />
      </h4>
      <p className="mt-2 text-sm text-neutral-400 max-w-md">{description}</p>
    </div>
  );
}

// "use client";

// import { ArrowUpRight } from "lucide-react";

// export default function WhyChooseUs() {
//   return (
//     <section className="relative py-20 px-6 md:px-16 text-white overflow-hidden">
//       {/* Subtle background glow */}
//       {/* <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[120px]" /> */}

//       <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* LEFT CONTENT */}
//         <div>
//           {/* Vision bullets */}
//           <div className="mt-12 space-y-8">
//             <VisionItem
//               title="Because We Deliver Measurable Results"
//               description="Vipprow focuses on performance, not promises. Every strategy is built to generate leads, conversions, and real ROI."
//             />

//             <VisionItem
//               title="Because We Focus on Long-Term Growth"
//               description="We don’t chase short-term wins — we build strategies designed for sustainable scale."
//             />
//             <VisionItem
//               title="
// Because We Combine Marketing + Automation"
//               description="Vipprow integrates performance marketing with SaaS automation for smarter execution..."
//             />
//             <VisionItem
//               title="Because We Simplify Complexity"
//               description="We turn complicated marketing and operational processes into simple, automated systems..."
//             />
//             <VisionItem
//               title="Because Data Drives Our Decisions"
//               description="No guesswork. Every action is backed by analytics, insights, and measurable performance tracking."
//             />
//           </div>
//         </div>

//         {/* RIGHT GLASS PANEL */}
//         <div className="relative">
//           <div
//             className="
//             relative rounded-2xl border border-white/15
//             bg-white/5 backdrop-blur-2xl backdrop-saturate-150
//             shadow-[0_0_80px_-15px_rgba(139,92,246,0.35)]
//             overflow-hidden
//           "
//           >
//             {/* RIGHT GLASS PANEL */}
//             <div className="relative">
//               <div
//                 className="
//       relative overflow-hidden rounded-2xl
//       border border-white/15
//       bg-white/5
//       backdrop-blur-2xl backdrop-saturate-150
//       shadow-[0_0_80px_-15px_rgba(139,92,246,0.35)]
//     "
//               >
//                 <img
//                   src="/assets/images/company/mission.jpeg"
//                   alt="Product preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ----------------- SUB COMPONENTS ----------------- */

// function VisionItem({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div>
//       <h4 className="font-semibold flex items-center gap-2 font-heading">
//         {title}
//         <ArrowUpRight className="h-4 w-4 text-blue-500" />
//       </h4>
//       <p className="mt-2 text-sm text-neutral-400 max-w-md">{description}</p>
//     </div>
//   );
// }
