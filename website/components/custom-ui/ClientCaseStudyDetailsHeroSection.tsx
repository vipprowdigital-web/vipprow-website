"use client";

import Image from "next/image";
import Threads from "../Threads";
import PrimaryHeading from "../ui/heading/PrimaryHeading";

type ClientCaseStudyDetailsHeroSectionProps = {
  heading?: string | null;
  description?: string | null;
  image?: string | null;
  clientName?: string | null;
};

export default function ClientCaseStudyDetailsHeroSection({
  heading = "Client Case Study",
  description = "",
  image = null,
  clientName = null,
}: ClientCaseStudyDetailsHeroSectionProps) {
  return (
    <section className="relative w-full h-[100vh] md:h-[600px] overflow-hidden bg-black">
      {/* Background */}
      {image ? (
        <>
          <Image
            src={image}
            alt={clientName ?? heading ?? "Client case study"}
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/30" />
        </>
      ) : (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Threads
            amplitude={2}
            distance={0}
            enableMouseInteraction
            color={[1, 1, 1]}
          />
        </div>
      )}

      {/* Centered Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center [&_p]:text-zinc-100! [&_h1]:[text-shadow:0_2px_18px_rgba(0,0,0,0.95)] [&_p]:[text-shadow:0_1px_12px_rgba(0,0,0,0.95)]">
        {/* a soft dark pad and a text shadow keep the words readable while the white lines stay bright */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[94%] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-black/60 blur-2xl" />
        {clientName && (
          <span className="relative mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/80">
            {clientName}
          </span>
        )}
        <div className="relative">
          <PrimaryHeading
            heading={heading ?? "Client Case Study"}
            des={description ?? ""}
          />
        </div>
      </div>
    </section>
  );
}
