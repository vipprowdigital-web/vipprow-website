"use client";

import GlassBottomCard from "./GlassBottomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ------------------ DATA ------------------ */

const SERVICES = [
  {
    image: "/assets/images/services/marketing.jpg",
    title: "Digital Marketing",
    subtitle: "Growth-driven campaigns",
    tag: "Growth",
  },
  {
    image: "/assets/images/services/seo.jpg",
    title: "SEO Optimization",
    subtitle: "Search visibility",
    tag: "SEO",
  },
  {
    image: "/assets/images/services/branding.jpg",
    title: "Brand Identity",
    subtitle: "Visual branding",
    tag: "Brand",
  },
  {
    image: "/assets/images/services/marketing.jpg",
    title: "Digital Marketing",
    subtitle: "Growth-driven campaigns",
    tag: "Growth",
  },
  {
    image: "/assets/images/services/seo.jpg",
    title: "SEO Optimization",
    subtitle: "Search visibility",
    tag: "SEO",
  },
  {
    image: "/assets/images/services/branding.jpg",
    title: "Brand Identity",
    subtitle: "Visual branding",
    tag: "Brand",
  },
];

/* ------------------ COMPONENT ------------------ */

export default function ClientCaseStudyGridScroller() {
  return (
    <section className="relative py-20 bg-black overflow-hidden max-w-7xl mx-auto">
      <div className="relative px-6 md:px-16">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={24}
          grabCursor
          loop
          autoplay={{
            delay: 2, // 🔥 smooth continuous scroll
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={6000} // 🔥 controls scroll smoothness
          className="!overflow-visible"
        >
          {SERVICES.map((service, index) => (
            <SwiperSlide key={index} className="!w-[260px] md:!w-[280px]">
              <GlassBottomCard href="#" {...service} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
