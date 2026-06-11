// website\components\client-sections\ClientBentoGridSection.tsx

"use client";

import dynamic from "next/dynamic";

const BentoGridSection = dynamic(
  () => import("@/components/aceternity-ui/BentoGrid"),
  {
    ssr: false,
    loading: () => (
      <div className="grid w-full max-w-7xl mx-auto auto-rows-[30rem] grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 py-12 md:py-22 px-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="col-span-3 lg:col-span-1 rounded-xl bg-neutral-900/50 animate-pulse"
          />
        ))}
      </div>
    ),
  },
);

export default function ClientBentoGridSection() {
  return <BentoGridSection />;
}
