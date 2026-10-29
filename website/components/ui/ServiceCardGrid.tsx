"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { AnimatedSVGCard } from "@/components/aceternity-ui/card/AnimatedSVGCard";
import { AnimatedBeamDemo } from "@/components/ui/animated-beam-demo";
import { BusinessAutomationSkeleton } from "@/components/ui/BusinessAutomationSkeleton";
import { SoftwareDevSkeleton } from "./SoftwareDevSkeleton";
import { CroissixSkeleton } from "./CroissixSkeleton";

const SERVICES = [
  {
    href: "/digital-marketing",
    title: "Digital Marketing",
    description:
      "Performance-driven digital marketing strategies that build visibility, generate leads, and drive measurable business growth.",
    serviceType: "digital-marketing" as const,
    skeletonContent: <AnimatedBeamDemo />,
  },
  {
    href: "/software-as-a-service",
    title: "Software Development",
    description:
      "Custom-built software solutions designed to streamline operations, enhance efficiency, and scale with your business.",
    serviceType: "software-development" as const,
    skeletonContent: <SoftwareDevSkeleton />,
  },
  {
    href: "/automation",
    title: "Business Automation (A.I)",
    description:
      "Intelligent automation systems that simplify workflows, reduce manual effort, and accelerate business performance.",
    serviceType: "business-automation" as const,
    skeletonContent: <BusinessAutomationSkeleton />,
  },
  // {
  //   href: "/croissix",
  //   title: "Croissix",
  //   description:
  //     "AI-powered local marketing automation that manages your Google Business Profile, Facebook, and Instagram in one place.",
  //   serviceType: "croissix" as const,
  //   skeletonContent: <CroissixSkeleton />,
  // },
];

export default function ServiceCardGrid() {
  return (
    <div className="mt-15 p-5 md:p-0 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        grabCursor
        loop
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.href} className="h-auto py-2">
            <AnimatedSVGCard
              href={service.href}
              title={service.title}
              description={service.description}
              serviceType={service.serviceType}
              skeletonContent={service.skeletonContent}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
