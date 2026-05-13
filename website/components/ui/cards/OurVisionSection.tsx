"use client";

import { ArrowUpRight } from "lucide-react";

export default function OurVisionSection() {
  return (
    <section className="relative py-20 px-6 md:px-16 text-white overflow-hidden">
      {/* Subtle background glow */}
      {/* <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[120px]" /> */}

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm uppercase tracking-widest text-neutral-400 font-heading">
            Our Vision
          </span>

          <h2 className="mt-4 text-4xl md:text-4xl font-semibold leading-tight font-heading">
            Overflowing with Meaningful Growth
          </h2>

          <p className="mt-6 text-neutral-400 max-w-xl leading-relaxed font-heading text-sm">
            We believe digital growth should feel seamless yet powerful. Our
            vision is to create growth systems that scale with ambition—helping
            teams move faster, make smarter decisions, and stay focused on what
            truly matters.
          </p>

          

          {/* Vision bullets */}
          <div className="mt-12 space-y-8">
            <VisionItem
              title="Simplicity over Guesswork"
              description="We design clear, structured digital strategies and automation systems that remove confusion and inefficiency. By simplifying complex marketing and operational processes, we help businesses stay aligned, agile, and in control as they scale.."
            />
            <VisionItem
              title="
Decisions Powered by Data"
              description="Every action we take is backed by data. From performance marketing to SEO and automation, we transform real-time insights into informed decisions that drive measurable results. Transparency and analytics ensure clarity at every stage of growth.."
            />
            <VisionItem
              title="Built for  Sustainable growth"
              description="We create marketing strategies, automation workflows, and digital platforms that evolve with your business. Our solutions are designed for long-term scalability—supporting growth today while preparing you for the opportunities of tomorrow.."
            />
          </div>
        </div>

        {/* RIGHT GLASS PANEL */}
        <div className="relative">
          <div
            className="
            relative rounded-2xl border border-white/15
            bg-white/5 backdrop-blur-2xl backdrop-saturate-150
            shadow-[0_0_80px_-15px_rgba(139,92,246,0.35)]
            overflow-hidden
          "
          >
            {/* RIGHT GLASS PANEL */}
            <div className="relative">
              <div
                className="
      relative overflow-hidden rounded-2xl
      border border-white/15
      bg-white/5
      backdrop-blur-2xl backdrop-saturate-150
      shadow-[0_0_80px_-15px_rgba(139,92,246,0.35)]
    "
              >
                <img
                  src="/assets/images/company/mission.jpeg"
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- SUB COMPONENTS ----------------- */

function VisionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="font-semibold flex items-center gap-2 font-heading">
        {title}
        <ArrowUpRight className="h-4 w-4 text-blue-500" />
      </h4>
      <p className="mt-2 text-sm text-neutral-400 max-w-md">{description}</p>
    </div>
  );
}
