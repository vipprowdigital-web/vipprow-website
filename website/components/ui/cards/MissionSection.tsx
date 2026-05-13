"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="relative w-full bg-black text-white py-20 px-6 md:px-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center md:text-justify">
        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm uppercase tracking-widest text-neutral-400">
            About Us
          </span>

          <h2 className="mt-4 text-4xl md:text-4xl font-semibold font-heading leading-tighter">
            How We Shape the Future of Business Growth
          </h2>

          <div className="mt-10 mb-10 space-y-6 text-neutral-400 leading-relaxed font-heading text-sm">
            <p>
             At Vipprow, our vision is to redefine digital growth by making it strategic, scalable, and measurable. We aim to empower businesses with performance-led marketing and automation systems that eliminate guesswork and deliver consistent results.
            </p>
            <p>
             
We believe growth should not depend on trial and error. Instead, it should be driven by data, clarity, and intelligent systems that adapt as businesses evolve. Our vision is to help brands move faster, make smarter decisions, and build a strong digital foundation that supports long-term success
            </p>

            <p>
              By combining performance marketing, SEO, and SaaS automation, Vipprow envisions a future where businesses operate efficiently, scale confidently, and stay ahead in a competitive digital landscape.
            </p>
          </div>

          <span className="text-sm uppercase tracking-widest text-neutral-400">
            OUR MISSION
          </span>

          <h2 className="mt-4 text-4xl md:text-4xl font-semibold font-heading leading-tighter">
           
How We Turn Strategy into Results
          </h2>

          <div className="mt-10 space-y-6 text-neutral-400 leading-relaxed font-heading text-sm">
            <p>
             Our mission at Vipprow is to help businesses achieve sustainable digital growth through performance marketing, automation, and technology-driven solutions.
            </p>

            <p>
            We are committed to understanding each client’s unique goals and challenges, and transforming them into actionable strategies that drive visibility, leads, and conversions. Through continuous optimization, analytics, and automation, we ensure every effort delivers measurable impact.
            </p>
          </div>
        </div>
        

        {/* RIGHT CARD */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
            <Image
              src="/assets/company/About.jpg"
              alt="Client testimonial"
              width={800}
              height={800}
              className="h-auto w-full object-cover rounded-2xl"
              priority
            />

            {/* OVERLAY */}

            {/* GLASS OVERLAY */}
            <div
              className="
  absolute inset-x-0 bottom-0
  bg-white/10
  backdrop-blur-xl backdrop-saturate-150
  border-t border-white/20
  py-3 px-6
  flex items-end justify-between
  rounded-bl-2xl
  rounded-br-2xl
"
            >
              <div>
                
                <p className="text-sm text-white/70">
                 Powered by Data. Driven by Performance.
                </p>
              </div>

              <div className="flex items-center gap-1">
                <p className="text-md text-white font-bold font-heading italic">
                  - Vipprow
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
