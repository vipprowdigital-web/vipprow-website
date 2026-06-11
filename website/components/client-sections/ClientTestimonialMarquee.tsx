// website\components\client-sections\ClientTestimonialMarquee.tsx

"use client";

import dynamic from "next/dynamic";

const TestimonialMarquee = dynamic(
  () => import("@/components/magic-ui/Testimonials"),
  {
    ssr: false,
    loading: () => <div className="w-full py-16 min-h-125" />,
  },
);

export default function ClientTestimonialMarquee() {
  return <TestimonialMarquee />;
}
