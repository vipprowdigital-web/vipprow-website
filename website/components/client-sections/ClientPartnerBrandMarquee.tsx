// website\components\client-sections\ClientPartnerBrandMarquee.tsx

"use client";

import dynamic from "next/dynamic";

const PartnerBrandMarquee = dynamic(
  () => import("@/components/magic-ui/PartnerBrandMarquee"),
  { ssr: false },
);

export default function ClientPartnerBrandMarquee() {
  return <PartnerBrandMarquee />;
}
