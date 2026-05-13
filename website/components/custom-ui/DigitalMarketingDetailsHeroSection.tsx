"use client";

import Beams from "../Beams";
import PrimaryHeading from "../ui/heading/PrimaryHeading";

type DigitalMarketingDetailsHeroSectionProp = {
  heading?: string | null;
  description?: string | null;
};

export default function DigitalMarketingDetailsHeroSection({
  heading = "N/A",
  description = "N/A",
}: DigitalMarketingDetailsHeroSectionProp) {
  return (
    <>
      <section className="relative w-screen h-[40vh] md:h-[400px] overflow-hidden">
        {/* Background Shader */}
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={6}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
          <PrimaryHeading
            heading={heading ?? "N/A"}
            des={description ?? "N/A"}
          />
        </div>
      </section>
    </>
  );
}
