"use client";

import dynamic from "next/dynamic";

const ServiceCardGrid = dynamic(
  () => import("@/components/ui/ServiceCardGrid"),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15 p-5 md:p-0">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl bg-neutral-900/50 animate-pulse h-96" />
        ))}
      </div>
    ),
  }
);

export default function ClientServiceCardGrid() {
  return <ServiceCardGrid />;
}
