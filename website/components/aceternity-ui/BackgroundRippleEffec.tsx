"use client";
import React from "react";
import { BackgroundRippleEffect as BRE } from "@/components/ui/background-ripple-effect";
import { CoverCase } from "./CoverEffect";

export function BackgroundRippleEffect() {
  return (
    <div className="relative flex min-h-auto w-full flex-col items-start justify-start overflow-hidden px-2 mb-10 md:mb-40 bg-gradient-to-b from-blue-600/80">
      <BRE cols={100} />
      <div className="mt-40 md:mt-60 w-full">
        {/* <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100 font-heading leading-tight">
          Interactive Background Boxes Ripple Effect
        </h2> */}

        <CoverCase />
        <p className="relative z-10 mx-auto mt-6 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Driving measurable growth through performance marketing, SaaS automation, and smart digital strategies.
        </p>
      </div>
    </div>
  );
}
