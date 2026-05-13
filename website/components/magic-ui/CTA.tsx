"use client";

import { TextReveal } from "@/components/ui/text-reveal";
import PrimaryGlowButton from "../ui/buttons/primary-glow-button";
import SecondaryButton from "../ui/buttons/SecondaryButton";

export default function CTA() {
  return (
    <section className="w-full px-6 py-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#050816] px-6 py-16 md:px-12">

        {/* 🔥 Axioma Style Diagonal Glow */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rotate-45 bg-blue-600/40 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-purple-600/30 blur-[140px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Badge */}
          <span className="mb-6 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm text-gray-300 backdrop-blur-md">
            Welcome to VIPPROW
          </span>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white leading-tight">
            Refresh your brand and get ready{" "}
            <span className="italic text-blue-400">
              for what’s next.
            </span>
          </h2>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <PrimaryGlowButton heading="Get Started" />
            <SecondaryButton heading="Book a Demo" />
          </div>

        </div>
      </div>
    </section>
  );
}


// "use client";

// import { GradientBars } from "@/components/ui/gradient-bars";
// import { TextReveal } from "@/components/ui/text-reveal";
// import PrimaryGlowButton from "../ui/buttons/primary-glow-button";
// import SecondaryButton from "../ui/buttons/SecondaryButton";

// export default function CTA() {
//   return (
//     <div className="relative h-[320px] md:h-[520px] w-full overflow-hidden rounded-2xl bg-black">
//       <div className="flex h-full w-full flex-col items-center justify-center">
//         <GradientBars />
//         <TextReveal className="font-heading text-foreground text-center text-4xl">
//         Smart Automation, Real Growth!
//         </TextReveal>
//         {/* CTA Buttons */}
//         <div className="mt-10 flex flex-row gap-4 z-1">
//           <PrimaryGlowButton heading="Get Started Now" />
//           <SecondaryButton heading="Book a Demo" />
//         </div>
//       </div>
//     </div>
//   );
// }
