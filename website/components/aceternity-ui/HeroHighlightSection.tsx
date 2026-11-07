"use client";
import PrimaryHeading from "../ui/heading/PrimaryHeading";
import Threads from "../Threads";

export function HeroHighlightSection() {
  return (
    <section className="relative w-full h-[40vh] md:h-[600px] overflow-hidden">
      {/* Background Shader */}

      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        className="hidden md:block"
      >
        <Threads
          amplitude={2}
          distance={0}
          enableMouseInteraction
          color={[1, 1, 1]}
        />
      </div>
      {/* Centered Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center [&_p]:text-zinc-100! [&_h1]:[text-shadow:0_2px_18px_rgba(0,0,0,0.95)] [&_p]:[text-shadow:0_1px_12px_rgba(0,0,0,0.95)]">
        {/* a soft dark pad and a text shadow keep the words readable while the white lines stay bright */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[92%] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-black/60 blur-2xl" />
        <div className="relative">
        <PrimaryHeading
          heading="Where strategy meets intelligent execution"
          des="We deliver digital solutions that remove friction and unlock measurable performance."
        />
        </div>
      </div>
    </section>
  );
}
