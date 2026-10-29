"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { teamMembers } from "@/data/founder";
import { Avatar } from "./FounderProfileSection";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TeamMembersSection() {
  const reduce = useReducedMotion();

  return (
    <section className="px-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((m, i) => (
          <motion.article
            key={`${m.name}-${i}`}
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.1, ease: EASE }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-blue-500/50 group-hover:shadow-[0_20px_40px_-20px_#3b82f666] dark:border-zinc-800">
              <Avatar
                name={m.name}
                image={m.image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="aspect-4/5 w-full"
                imageClassName="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-5 pt-16">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {m.name}
                </h3>
                <p className="text-sm text-zinc-300">{m.designation}</p>
              </div>

              {/* LinkedIn button slides in on hover / focus */}
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on LinkedIn`}
                className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-blue-500 hover:text-white focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
