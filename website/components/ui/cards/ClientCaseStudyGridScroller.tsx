"use client";

import React from "react";
import GlassBottomCard from "./GlassBottomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Marquee } from "@/components/ui/marquee";

/* ------------------ DATA ------------------ */

// const SERVICES = [
//   {
//     image: "/assets/images/services/marketing.jpg",
//     title: "Digital Marketing",
//     subtitle: "Growth-driven campaigns",
//     tag: "Growth",
//   },
//   {
//     image: "/assets/images/services/seo.jpg",
//     title: "SEO Optimization",
//     subtitle: "Search visibility",
//     tag: "SEO",
//   },
//   {
//     image: "/assets/images/services/branding.jpg",
//     title: "Brand Identity",
//     subtitle: "Visual branding",
//     tag: "Brand",
//   },
//   {
//     image: "/assets/images/services/marketing.jpg",
//     title: "Digital Marketing",
//     subtitle: "Growth-driven campaigns",
//     tag: "Growth",
//   },
//   {
//     image: "/assets/images/services/seo.jpg",
//     title: "SEO Optimization",
//     subtitle: "Search visibility",
//     tag: "SEO",
//   },
//   {
//     image: "/assets/images/services/branding.jpg",
//     title: "Brand Identity",
//     subtitle: "Visual branding",
//     tag: "Brand",
//   },
// ];

/* ------------------ COMPONENT ------------------ */
interface ClientItem {
  image: string;
  title: string;
  subtitle?: string;
  tag: string;
  bgColor?: string;
  href?: string;
}

export default function ClientCaseStudyGridScroller({
  clients,
}: {
  clients: ClientItem[];
}) {
  const shouldLoop = clients.length >= 6;
  // For small sets, just center them with flex — no Swiper needed
  const useGrid = clients.length < 6;

  // A single logo has nothing to slide past, so it just sits centred
  if (clients.length === 1) {
    return (
      <section className="relative py-10 bg-black max-w-7xl mx-auto">
        <div className="flex justify-center px-6">
          <div className="w-[260px] md:w-[280px] shrink-0">
            <GlassBottomCard {...clients[0]} href={clients[0].href ?? "#"} />
          </div>
        </div>
      </section>
    );
  }

  if (useGrid) {
    return (
      <section className="relative py-10 bg-black max-w-7xl mx-auto">
        {/* Large screens: a few cards fit, so they sit still and centred */}
        <div className="hidden justify-center gap-6 px-16 lg:flex">
          {clients.map((client, index) => (
            <div key={index} className="w-[280px] shrink-0">
              <GlassBottomCard {...client} href={client.href ?? "#"} />
            </div>
          ))}
        </div>

        {/* Phones and tablets: not all of them fit, so the row keeps sliding to the right */}
        <div className="relative overflow-hidden lg:hidden">
          <Marquee reverse pauseOnHover className="[--gap:1.5rem] [--duration:28s]">
            {clients.map((client, index) => (
              <div key={index} className="w-[260px] shrink-0 md:w-[280px]">
                <GlassBottomCard {...client} href={client.href ?? "#"} />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-black to-transparent" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-black overflow-hidden max-w-7xl mx-auto min-h-120">
      <div className="relative px-6 md:px-16">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          grabCursor
          loop={shouldLoop}
          autoplay={
            shouldLoop
              ? { delay: 2, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          speed={6000}
          className="overflow-visible!"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index} className="w-65! md:w-70!">
              <GlassBottomCard {...client} href={client.href ?? "#"} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
