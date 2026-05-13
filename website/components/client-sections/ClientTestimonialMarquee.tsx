// website\components\client-sections\ClientTestimonialMarquee.tsx

"use client";

import dynamic from "next/dynamic";

const TestimonialMarquee = dynamic(
  () => import("@/components/magic-ui/Testimonials"),
  { ssr: false },
);

export default function ClientTestimonialMarquee() {
  return <TestimonialMarquee />;
}
