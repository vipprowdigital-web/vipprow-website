"use client";

import { useRouter } from "next/navigation";
import PrimaryGlowButton from "@/components/ui/buttons/primary-glow-button";

export function HeroCTA() {
  const router = useRouter();
  return (
    <div className="mt-10 flex flex-row gap-4">
      <PrimaryGlowButton
        heading="Get Started Now"
        onClick={() => router.push("/contact")}
      />
    </div>
  );
}
