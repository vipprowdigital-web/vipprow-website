// website\components\client-sections\ClientBentoGridSection.tsx

"use client";

import dynamic from "next/dynamic";

const BentoGridSection = dynamic(
  () => import("@/components/aceternity-ui/BentoGrid"),
  { ssr: false },
);

export default function ClientBentoGridSection() {
  return <BentoGridSection />;
}
