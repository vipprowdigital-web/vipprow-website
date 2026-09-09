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
            color={[30, 78, 200]}
          />
        </div>
      )}

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        {clientName && (
          <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/80">
            {clientName}
          </span>
        )}
        <PrimaryHeading
          heading={heading ?? "Client Case Study"}
          des={description ?? ""}
        />
      </div>
    </section>
  );
}
