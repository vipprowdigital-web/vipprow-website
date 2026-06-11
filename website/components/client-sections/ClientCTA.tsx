// website\components\client-sections\ClientCTA.tsx

"use client";

import dynamic from "next/dynamic";

const CTA = dynamic(() => import("@/components/magic-ui/CTA"), {
  ssr: false,
  loading: () => (
    <div className="w-full px-6 py-0">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#050816]/50 animate-pulse h-65" />
    </div>
  ),
});

export default function ClientCTA() {
  return <CTA />;
}
