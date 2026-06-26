"use client";

import GlassBottomCard from "./GlassBottomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
}

export default function ClientCaseStudyGridScroller({
  clients,
}: {
  clients: ClientItem[];
}) {
  const shouldLoop = clients.length >= 6;

  return (
    <section className="relative py-20 bg-black overflow-hidden max-w-7xl mx-auto min-h-120">
      <div className="relative px-6 md:px-16">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          grabCursor
          centeredSlides={clients.length < 4}
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
              <GlassBottomCard href="#" {...client} />
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
