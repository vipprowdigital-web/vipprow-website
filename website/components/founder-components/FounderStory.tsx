"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { founder } from "@/data/founder";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// One rising line used by the hero tile and the pinned journey
const GROWTH_PATH =
  "M8 232 C 70 226, 110 200, 160 176 S 250 118, 300 84 S 368 34, 392 12";

export default function FounderStory() {
  const root = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  // Pin the journey only on large screens for people who have not asked for less motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---------- hero ---------- */
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
        hero
          .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 })
          .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.5)
          .from("[data-tile]", { y: 50, opacity: 0, duration: 1 }, 0.3);

        gsap.to("[data-tile]", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });

        /* ---------- generic reveals ---------- */
        gsap.set("[data-reveal]", { opacity: 0, y: 30 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", overwrite: true }),
        });

        /* ---------- career numbers count up ---------- */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const pre = el.dataset.prefix || "";
          const suf = el.dataset.suffix || "";
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = `${pre}${Math.round(o.v)}${suf}`;
            },
          });
        });

        /* ---------- vision: the words light up as you read ---------- */
        gsap.set("[data-word]", { opacity: 0.16 });
        gsap.to("[data-word]", {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-vision]", start: "top 72%", end: "bottom 62%", scrub: 0.4 },
        });

        /* ---------- journey, stacked version (phones, tablets) ---------- */
        if (!pinned) {
          const rail = root.current?.querySelector<HTMLElement>("[data-rail]");
          if (rail) {
            gsap.fromTo(
              rail,
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "top",
                ease: "none",
                scrollTrigger: { trigger: "[data-journey-list]", start: "top 70%", end: "bottom 60%", scrub: true },
              },
            );
          }
        }

        /* ---------- journey, pinned storytelling (desktop) ---------- */
        if (pinned) {
          const stage = root.current?.querySelector<HTMLElement>("[data-stage]");
          const path = root.current?.querySelector<SVGPathElement>("[data-journey-path]");
          const dot = root.current?.querySelector<SVGCircleElement>("[data-journey-dot]");
          const years = gsap.utils.toArray<HTMLElement>("[data-year]");
          const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
          const marks = gsap.utils.toArray<HTMLElement>("[data-mark]");
          if (stage && path && dot && years.length) {
            const len = path.getTotalLength();
            const n = years.length;
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            gsap.set(years.slice(1), { opacity: 0, yPercent: 40 });
            gsap.set(steps.slice(1), { opacity: 0, y: 50 });

            const tl = gsap.timeline({
              defaults: { ease: "power2.inOut" },
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: `+=${(n - 1) * 90}%`,
                pin: true,
                scrub: 0.7,
                anticipatePin: 1,
                onUpdate: (self) => {
                  const p = self.progress;
                  const pt = path.getPointAtLength(len * p);
                  dot.setAttribute("cx", String(pt.x));
                  dot.setAttribute("cy", String(pt.y));
                  const active = Math.min(n - 1, Math.round(p * (n - 1)));
                  marks.forEach((m, i) => m.classList.toggle("is-on", i <= active));
                },
              },
            });

            tl.to(path, { strokeDashoffset: 0, ease: "none", duration: n - 1 }, 0);
            for (let i = 1; i < n; i++) {
              const t = i - 0.55;
              tl.to(years[i - 1], { opacity: 0, yPercent: -40, duration: 0.45 }, t)
                .to(steps[i - 1], { opacity: 0, y: -50, duration: 0.45 }, t)
                .to(years[i], { opacity: 1, yPercent: 0, duration: 0.45 }, t + 0.35)
                .to(steps[i], { opacity: 1, y: 0, duration: 0.45 }, t + 0.35);
            }
          }
        }
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  );

  const visionWords = founder.vision.split(" ");

  return (
    <div ref={root} className="bg-black text-white">
      {/* ---------- hero ---------- */}
      <section data-hero className="relative overflow-hidden px-4 pb-20 pt-36 md:px-6 md:pb-28 md:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600/70 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {founder.nameLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <span data-hero-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p data-hero-fade className="mt-5 font-heading text-lg font-semibold text-blue-400 sm:text-xl">
              {founder.role}
            </p>
            <p data-hero-fade className="mt-6 max-w-xl font-heading text-lg leading-snug text-white sm:text-xl">
              {founder.tagline}
            </p>

            <div className="mt-8 grid max-w-xl gap-5 text-base leading-relaxed text-white/65">
              {founder.intro.map((p) => (
                <p key={p.slice(0, 24)} data-hero-fade>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* founder photo on a brand-blue block */}
          <div data-tile className="relative mx-auto w-full max-w-md pb-5 pr-5">
            <div aria-hidden="true" className="absolute inset-0 left-5 top-5 rounded-[2.5rem] bg-linear-to-br from-blue-500 via-blue-800 to-black" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-neutral-900">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- career at a glance ---------- */}
      <section className="px-4 pt-16 md:px-6 md:pt-24" aria-labelledby="glance-h">
        <div className="mx-auto max-w-7xl">
          <h2
            id="glance-h"
            data-reveal=""
            className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl"
          >
            {founder.statsHeading}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {founder.stats.map((s, i) => (
              <li
                key={s.label}
                data-reveal=""
                className={`flex min-h-44 flex-col justify-between rounded-3xl p-6 md:p-8 ${
                  i === 0
                    ? "bg-white/5 text-white"
                    : i === 1
                      ? "bg-white/10 text-white"
                      : i === 2
                        ? "bg-linear-to-br from-blue-600 via-blue-900 to-black text-white"
                        : "bg-white text-black"
                }`}
              >
                <p
                  data-count={s.value}
                  data-prefix={s.prefix || ""}
                  data-suffix={s.suffix || ""}
                  className="font-heading text-4xl font-semibold leading-none tracking-tight tabular-nums sm:text-5xl"
                >
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </p>
                <p className={`mt-6 text-base font-medium ${i === 3 ? "text-black/70" : "text-white/70"}`}>
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
          <p data-reveal="" className="mt-5 max-w-3xl text-sm leading-relaxed text-white/45">
            <span className="font-semibold text-white/65">Experience note:</span> {founder.statsNote}
          </p>
        </div>
      </section>

      {/* ---------- expertise ---------- */}
      <section className="px-4 pt-28 md:px-6 md:pt-40" aria-labelledby="expertise-h">
        <div className="mx-auto max-w-7xl">
          <h2
            id="expertise-h"
            data-reveal=""
            className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl"
          >
            {founder.expertiseHeading}
          </h2>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {founder.expertise.map((e) => (
              <li
                key={e.title}
                data-reveal=""
                className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl bg-white/5 p-6 md:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-900 to-black opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <h3 className="relative max-w-md font-heading text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {e.title}
                </h3>
                <p className="relative mt-8 max-w-md text-base leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/90">
                  {e.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- the journey: told as you scroll ---------- */}
      <section className="pt-28 md:pt-40" aria-labelledby="journey-h">
        {pinned ? (
          <div data-stage className="relative flex h-screen flex-col justify-center overflow-hidden px-6">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <h2 id="journey-h" className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl">
                  {founder.journeyHeading}
                </h2>
                <div className="relative mt-8 h-32">
                  {founder.journey.map((j) => (
                    <p
                      key={j.year}
                      data-year
                      className="absolute inset-0 flex items-center font-heading bg-gradient-to-b from-blue-300 to-blue-700 bg-clip-text text-5xl font-semibold leading-none tracking-tighter text-transparent xl:text-6xl"
                      aria-hidden="true"
                    >
                      {j.year}
                    </p>
                  ))}
                </div>
                <ol className="mt-6 flex gap-3" aria-label="Journey progress">
                  {founder.journey.map((j, i) => (
                    <li
                      key={j.year}
                      data-mark
                      className={`founder-mark h-2.5 flex-1 rounded-full bg-white/15 transition-colors duration-300 [&.is-on]:bg-linear-to-r [&.is-on]:from-blue-700 [&.is-on]:to-blue-400 ${i === 0 ? "is-on" : ""}`}
                    >
                      <span className="sr-only">{j.year}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid content-center gap-8">
                <div className="relative min-h-64">
                  {founder.journey.map((j) => (
                    <div key={j.year} data-step className="absolute inset-0 rounded-3xl bg-white/5 p-8 xl:p-10">
                      <p className="font-heading text-sm font-semibold text-blue-400">{j.year}</p>
                      <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight xl:text-3xl">{j.title}</h3>
                      <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 xl:text-lg">{j.text}</p>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 400 240" className="h-40 w-full xl:h-48" aria-hidden="true">
                  <defs>
                    <linearGradient id="founderGrowth" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#93c5fd" />
                    </linearGradient>
                  </defs>
                  <path d={GROWTH_PATH} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
                  <path
                    data-journey-path
                    d={GROWTH_PATH}
                    fill="none"
                    stroke="url(#founderGrowth)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <circle data-journey-dot cx="8" cy="232" r="11" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 md:px-6">
            <div className="mx-auto max-w-7xl">
              <h2
                id="journey-h"
                data-reveal=""
                className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl"
              >
                {founder.journeyHeading}
              </h2>
              <ol data-journey-list className="relative mt-10 grid gap-4 pl-8 md:pl-12">
                <span aria-hidden="true" className="absolute bottom-3 left-2 top-3 w-1 rounded-full bg-white/10 md:left-4" />
                <span
                  data-rail
                  aria-hidden="true"
                  className="absolute bottom-3 left-2 top-3 w-1 rounded-full bg-gradient-to-b from-blue-300 to-blue-700 md:left-4"
                />
                {founder.journey.map((j) => (
                  <li key={j.year} data-reveal="" className="relative rounded-3xl bg-white/5 p-6 md:p-8">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.85rem] top-8 h-4 w-4 rounded-full bg-gradient-to-b from-blue-300 to-blue-700 md:-left-[2.85rem]"
                    />
                    <p className="bg-gradient-to-b from-blue-300 to-blue-700 bg-clip-text font-heading text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
                      {j.year}
                    </p>
                    <h3 className="mt-3 font-heading text-lg font-semibold md:text-xl">{j.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-white/65">{j.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>

      {/* ---------- vision ---------- */}
      <section data-vision className="px-4 pt-28 md:px-6 md:pt-44" aria-labelledby="vision-h">
        <div className="mx-auto max-w-3xl">
          <h2 id="vision-h" data-reveal="" className="font-heading text-lg font-semibold text-blue-400 sm:text-xl">
            {founder.visionHeading}
          </h2>
          <blockquote className="mt-8">
            <p className="font-heading text-lg font-medium leading-relaxed tracking-tight sm:text-xl lg:text-2xl">
              “
              {visionWords.map((w, i) => (
                <span key={i} data-word className="inline-block pr-[0.28em]">
                  {w}
                </span>
              ))}
              ”
            </p>
            <footer data-reveal="" className="mt-8 text-base text-white/60">
              <span className="font-semibold text-white">{founder.visionBy.split(" | ")[0]}</span>
              {" | "}
              {founder.visionBy.split(" | ")[1]}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ---------- call to action ---------- */}
      <section className="px-4 pb-24 pt-28 md:px-6 md:pb-32 md:pt-44" aria-labelledby="cta-h">
        <div
          data-reveal=""
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-r from-blue-700 via-blue-900 to-black p-8 sm:p-12 lg:p-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[520px] rounded-full bg-gradient-to-b from-blue-500/45 blur-3xl" />
          <h2
            id="cta-h"
            className="relative max-w-4xl font-heading text-2xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            {founder.cta.heading}
          </h2>
          <p className="relative mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{founder.cta.text}</p>
          <div className="relative mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <p className="text-sm font-medium text-white/80">{founder.cta.footer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
