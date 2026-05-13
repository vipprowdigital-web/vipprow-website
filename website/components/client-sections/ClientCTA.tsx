// website\components\client-sections\ClientCTA.tsx

"use client";

import dynamic from "next/dynamic";

const CTA = dynamic(() => import("@/components/magic-ui/CTA"), { ssr: false });

export default function ClientCTA() {
  return <CTA />;
}
