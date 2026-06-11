// website\components\client-sections\ClientPartnerBrandMarquee.tsx

"use client";

import dynamic from "next/dynamic";

const PartnerBrandMarquee = dynamic(
  () => import("@/components/magic-ui/PartnerBrandMarquee"),
  {
    ssr: false,
    loading: () => <div className="h-32 w-full max-w-7xl mx-auto" />,
  },
);

export default function ClientPartnerBrandMarquee() {
  return <PartnerBrandMarquee />;
}
