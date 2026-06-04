"use client";
import { motion } from "framer-motion";
import PrimaryGlowButton from "../ui/buttons/primary-glow-button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DigitalMarketingHeroSection() {
  const router = useRouter();
  return (
    <section className="bg-linear-to-b from-blue-600/80 bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="md:pt-0 pt-20 max-w-7xl mx-auto">
        <div className="">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold tracking-wider text-gray-200 uppercase">
                  PERFORMANCE-DRIVEN DIGITAL MARKETING
                </p>
                <h1 className="mt-4 text-4xl font-bold text-white lg:mt-8 sm:text-5xl xl:text-7xl font-heading">
                  Grow Your Business with Smart Digital Marketing
                </h1>
                <p className="mt-4 text-sm text-white lg:mt-8 sm:text-md">
                  Build, Scale, and Convert with Intelligent Digital Marketing.
                </p>

                <div className="mt-10 flex flex-row gap-4">
                  <PrimaryGlowButton
                    heading="Get Started Now"
                    onClick={() => router.push("/contact")}
                  />
                </div>
              </div>

              <div>
                <motion.div
                  className="w-full cursor-pointer"
                  animate={{
                    y: [0, -12, 0], // up → down → up
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <Image
                    src="/assets/digital/hero-img.png"
                    alt="Digital Marketing"
                    className="w-full"
                    width={1000}
                    height={500}
                    
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
