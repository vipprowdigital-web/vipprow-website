"use client";

import { AvatarCirclesRow } from "@/components/magic-ui/AvatarCircles";
import PrimaryGlowButton from "@/components/ui/buttons/primary-glow-button";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const StarsBackgroundVipprow = dynamic(
  () =>
    import("@/components/ui/backgrounds-stars").then(
      (m) => m.StarsBackgroundVipprow,
    ),
  { ssr: false },
);

export default function HeroSection() {
  const router = useRouter();
  return (
    <>
      <main className="relative min-h-[93vh]  md:min-h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-black">
        {/* 🌌 Stars Background */}
        <StarsBackgroundVipprow />

        {/* 🎯 Hero Content */}
        <section className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
          {/* Social Proof */}
          <div className="mb-6 flex flex-col items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
            <AvatarCirclesRow />
            <span className="whitespace-nowrap">
              Join{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">99+</strong>{" "}
              other loving clients
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
          max-w-4xl font-heading
          text-4xl font-semibold leading-tight
          text-zinc-900 dark:text-white
          sm:text-5xl md:text-5xl
        "
          >
            Vipprow Managing Your Digital Business Ecosystem
          </h1>

          {/* Subtitle */}
          <p
            className="
          mt-6 max-w-xl
          text-sm leading-relaxed
          text-zinc-600 dark:text-zinc-400
          sm:text-md md:text-2xl
        "
          >
            The Best Platform to Grow your Business.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-row gap-4">
            <PrimaryGlowButton
              heading="Get Started Now"
              onClick={() => router.push("/contact")}
            />
            {/* <SecondaryButton heading="Book a Demo" /> */}
          </div>
        </section>

        {/* 🧩 Bottom Brand SVG */}
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 z-0 px-0 md:px-10">
          <Image
            src="/assets/images/logo/brand_outline.svg"
            alt="VIPPROW Brand"
            width={1000}
            height={500}
            loading="lazy"
            unoptimized
            style={{ height: "auto" }}
            className="
            mx-auto w-full max-w-none
            translate-y-1/3
            opacity-15 dark:opacity-50
            sm:w-full md:w-full
          "
          />
        </div>

        {/* 🌫 Bottom Fade */}
        <div
          className="
        pointer-events-none absolute bottom-0 left-0 z-10 h-20 w-full
        bg-linear-to-t
        from-zinc-50 via-zinc-50/90 to-transparent
        dark:from-black dark:via-black/70
      "
        />
      </main>
    </>
  );
}
