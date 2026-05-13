"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTestimonials } from "@/app/features/testimonial/hook/useTestimonial";
import Link from "next/link";
import Image from "next/image";
import { BorderBeam } from "../ui/border-beam";

const reviews = [
  {
    name: "Belleza Beauty & Makeup Academy",
    username: "Client Dep. 1",
    body: `Vipprow’s ad strategy gave us a strong boost in leads and conversions.
    <span>What we liked most is their transparency and performance tracking approach.</span>
    We could clearly see how the digital marketing investment was converting into real inquiries.`,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    name: "The Mango Tree Staycation",
    username: "Client Dep. 2",
    body: `We wanted digital marketing that looks premium and feels authentic —
    <span>The content they created was aligned with our brand vibe.</span>
    Vipprow doesn’t just post content — they build brand value.`,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    name: "Odyssefy | Travel Agency",
    username: "Client Dep. 3",
    body: `Smooth onboarding and clear communication.
    <span>Their optimization improved our engagement significantly.</span>`,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
];

export default function TestimonialMarquee() {
  const { data, isLoading, isError } = useTestimonials({
    page: 1,
    limit: 12,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
  });

  const testimonials = data?.data || [];

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* States */}
        {isLoading && (
          <p className="text-center text-sm">Loading testimonials...</p>
        )}
        {isError && (
          <p className="text-center text-sm text-red-400">
            Failed to load testimonials.
          </p>
        )}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full"
        >
          {testimonials.length &&
            testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <Link href={"/client-case-study"}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-2 md:mx-20">
                    {/* LEFT CONTENT */}
                    <div className="text-white font-heading">
                      <p
                        className="text-lg leading-relaxed text-gray-300 [&_span]:text-white [&_span]:font-semibold mb-10"
                        dangerouslySetInnerHTML={{
                          __html: testimonial.description || "",
                        }}
                      />

                      <h3 className="text-md font-normal mb-2 italic">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-200 italic">
                        {testimonial.designation}
                      </p>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center md:justify-end">
                      <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden">
                        <Image
                          fill
                          src={testimonial.avatar ?? ""}
                          alt={testimonial.name}
                          className="w-full h-full object-cover border"
                        />
                        <BorderBeam
                          duration={6}
                          size={600}
                          borderWidth={8}
                          className="from-white via-blue-800 to-white"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* ✅ ADD STYLE HERE */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          opacity: 0;
          pointer-events: none;

          font-weight: bold;
          color: #ffffff;

          /* 🔵 Blue gradient */
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-radius: 9999px;
          padding: 12px;
          transform: scale(0.9);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            background-position 0.4s ease,
            box-shadow 0.3s ease;
        }
        /* 👆 Fade IN when hovering swiper */
        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
        /* ✨ Hover animation on arrow */
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: linear-gradient(135deg, #1d4ed8, #0891b2);
          transform: scale(1.08);
        }
        /* 🚫 Disabled arrow */
        .swiper-button-disabled {
          opacity: 0.35 !important;
          background: linear-gradient(135deg, #9ca3af, #d1d5db);
          box-shadow: none;
          cursor: not-allowed;
          transform: scale(1);
        }
        .swiper-pagination-bullet {
          background: #fff;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
        }
      `}</style>
    </section>
  );
}
