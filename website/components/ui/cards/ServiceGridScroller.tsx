"use client";

import { useEffect, useMemo, useState } from "react";
import GlassBottomCard from "./GlassBottomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";

import { usePublicDomains } from "@/app/features/domain/hook/useDomain";
import { usePublicServices } from "@/app/features/services/hook/useService";
import { Domain } from "@/types/domain";
import { Link } from "lucide-react";

interface ServiceGridScrollerProps {
  domainSlug?: string;
}

export default function ServiceGridScroller({
  domainSlug,
}: ServiceGridScrollerProps) {
  const { data: domainData, isLoading: domainLoading } = usePublicDomains();

const [activeDomainId, setActiveDomainId] = useState<string | null>(null);


  /* ---------- Filter Domains ---------- */
  const filteredDomains = useMemo<Domain[]>(() => {
    if (!domainData?.data) return [];

    if (domainSlug) {
      return domainData.data.filter(
        (d) => d.name.toLowerCase() === domainSlug.toLowerCase(),
      );
    }

    return domainData.data;
  }, [domainData, domainSlug]);

  /* ---------- Auto Select First Domain ---------- */
  useEffect(() => {
    if (filteredDomains.length > 0 && !activeDomainId) {
      setActiveDomainId(filteredDomains[0]._id);
    }
  }, [filteredDomains, activeDomainId]);


  const resolvedActiveDomainId =
  activeDomainId ?? filteredDomains[0]?._id ?? null;

  /* ---------- Fetch Services ---------- */
const { data: serviceData, isLoading: serviceLoading } =
  usePublicServices({
    domains: resolvedActiveDomainId
      ? [resolvedActiveDomainId]
      : undefined,
  });
  

  if (domainLoading)
    return <p className="text-white text-center py-20">Loading domains...</p>;

  if (!filteredDomains.length)
    return <p className="text-white text-center py-20">No domains found.</p>;

  return (
    <section className="relative py-20 bg-black overflow-hidden max-w-7xl mx-auto">
      {/* ------------------- TABS (Animated Glass Style) ------------------- */}
      <div className="px-2 md:px-0 mb-10 flex justify-center">
        <div className="relative inline-flex gap-5 p-1 rounded-full bg-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]">
          {filteredDomains.map((domain) => {
            const isActive = activeDomainId === domain._id;

            return (
              <button
                key={domain._id}
                onClick={() => setActiveDomainId(domain._id)}
                className="relative px-5 py-2 rounded-3xl text-sm font-medium cursor-pointer"
              >
                {/* Sliding Glass Pill */}
                {isActive && (
                  <motion.span
                    layoutId="glass-tab-indicator"
                    className="absolute inset-0 rounded-3xl bg-blue-800/30 backdrop-blur-xl border border-blue-400/30 shadow-lg"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                {/* Tab Text Animation */}
                <motion.span
                  className="relative z-10 capitalize"
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {domain.name}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------- SERVICES SWIPER (Animated) ------------------- */}
      <div className="relative px-6 md:px-16">
        {serviceLoading ? (
          <p className="text-white text-center">Loading services...</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomainId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={24}
                grabCursor
                loop
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="!overflow-visible"
              >
                {serviceData?.data?.map((service, index) => (
                  <SwiperSlide
                    key={service._id || index}
                    className="!w-[260px] md:!w-[280px]"
                  >
                    {/* Stagger Animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                        <GlassBottomCard
                          image={
                            service.thumbnail
                              ? service.thumbnail
                              : "/assets/images/articals/1x1.webp"
                          }
                          title={service.title}
                          subtitle={service.subHeading || ""}
                          tag={
                            service.domain && typeof service.domain === "object"
                              ? service.domain.name
                              : "N/A"
                          }
                          href={`/services/details/${service._id}`}
                        />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
