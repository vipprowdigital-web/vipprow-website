"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export interface SaaSDetailsHeroSectionProps {
  heading: string;
  domain: string;
  image: string;
}

export default function SaaSDetailsHeroSection({
  heading,
  domain,
  image,
}: SaaSDetailsHeroSectionProps) {
  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-[#060613] pt-32 pb-10 font-light text-white antialiased md:pt-40 md:pb-16"
        style={{
          background: "linear-gradient(180deg, #0a0613 0%, #000 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 h-1/2 w-1/2"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(30,78,200, 0.15) 0%, rgba(30,78,200, 0) 60%)",
          }}
        />
        <div
          className="absolute top-0 left-0 h-1/2 w-1/2 -scale-x-100"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(30,78,200, 0.15) 0%, rgba(30,78,200, 0) 60%)",
          }}
        />

        <div className="relative z-10 container mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-heading group mx-auto w-fit rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent px-5 py-2 text-sm text-gray-400 mb-5">
              {domain ?? "Build products for everyone"}
              {/* <ArrowRight className="ml-2 inline h-4 w-4 duration-300 group-hover:translate-x-1" /> */}
            </h1>
            <h1 className="font-heading mx-auto mb-6 max-w-4xl text-4xl font-semibold md:text-5xl lg:text-6xl">
              {heading ?? "N/A"}
              {/* <span className="text-[#1E4EC8]">AI-Powered</span> Crypto Insights */}
            </h1>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative flex h-40 w-full overflow-hidden md:h-64">
              <Image
                width={1920}
                height={1080}
                src="https://i.postimg.cc/5NwYwdTn/earth.webp"
                alt="Earth"
                className="absolute top-0 left-1/2 -z-10 mx-auto -translate-x-1/2 px-4 opacity-80"
              />
            </div>
            <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(30,78,200,0.2)]">
              <Image
                src={image ?? "https://i.postimg.cc/FKKY5fRB/lunexa-db.webp"}
                alt="Lunexa Dashboard"
                width={1920}
                height={1080}
                className="h-auto w-full rounded-lg border border-white/10"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
