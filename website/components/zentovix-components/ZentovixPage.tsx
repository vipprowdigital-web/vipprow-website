"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePublicFaqs } from "@/app/features/faq/hook/useFaq";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMG = "/assets/images/zentovix";
const ZX_URL = "https://zentovix.vipprow.com";
const TRIAL = "Start Your 14-Day Trial for ₹299";

const SOURCES = ["Call", "Walk-in", "Web form"];
const PIPE = ["Enquiry", "Follow-up", "Counselling", "Admitted"];
const STAGES = ["New enquiry", "Follow-up", "Counselled", "Admitted"];
const MOVE = ["Move to follow-up", "Move to counselling", "Mark admitted", "Start over"];

const HOW = [
  { t: "New lead", d: "Day 1 · Enquiry received" },
  { t: "Follow-up", d: "Day 2 · Next call set" },
  { t: "Counselling", d: "Day 3 · Batch and fee plan" },
  { t: "Admission + fee paid", d: "Day 4 · ₹12,000 received" },
  { t: "Batch assigned", d: "Class 11 Science, morning" },
];

const WHY = [
  { t: "Never miss a follow-up", d: "Next calls and reminders are tracked for you." },
  { t: "Convert more enquiries", d: "See every lead's status, from enquiry to admission." },
  { t: "Track every rupee", d: "Fees, instalments and pending payments in one place." },
  { t: "Keep batches organised", d: "Courses, students and batch allocation together." },
];

const INCLUDED = [
  "₹299 registration",
  "14-day access",
  "All core features",
  "No automatic renewal",
];

const PLANS = [
  { t: "Starter", p: "₹4,999", cap: "Up to 100 admissions", m: "Leads, admissions, fees, courses, tests and certificates", pop: true },
  { t: "Growth", p: "₹7,999", cap: "Up to 200 admissions", m: "Everything in Starter, plus advanced follow-ups and deeper reports" },
  { t: "Scale", p: "₹12,999", cap: "Up to 300 admissions", m: "Everything in Growth, plus multi-batch setup and full institute overview" },
];

const FAQ = [
  {
    q: "What do I get for ₹299?",
    a: "14 days of access to the core features: leads, admissions, students, batches, fees and LMS tools.",
  },
  {
    q: "Will I be charged automatically after the trial?",
    a: "No. Choosing a plan is optional. Plans run for 3 months with 100, 200 or 300 admissions.",
  },
  {
    q: "Can I track both leads and fees?",
    a: "Yes, including instalments, receipts and pending payments.",
  },
  {
    q: "Are the LMS, tests and certificates included?",
    a: "Yes: courses, study material, tests and certificates.",
  },
  {
    q: "Who can use it?",
    a: "Coaching centres, schools, academies, beauty institutes and music academies.",
  },
  {
    q: "What happens to my data?",
    a: "After your plan ends you have 14 days to export it. Then it is deleted.",
  },
];

const DEFAULT_NOTE =
  "Riya Mehta 98765 43210, asked about the IELTS evening batch. Walked in today. Call back Thursday 4 pm";

function parseNote(note: string) {
  const phoneM = note.match(/(\+?\d[\d\s-]{7,}\d)/);
  const phone = phoneM ? phoneM[1].trim() : "Not found";
  const head = phoneM ? note.slice(0, phoneM.index) : note.split(/[,.\n]/)[0];
  const name =
    head
      .replace(/[^A-Za-z .'-]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join(" ") || "New lead";
  const interest =
    note.match(/(?:about|interested in|for)\s+(?:the\s+)?([^.,\n]+)/i)?.[1]?.trim() ||
    "Not found";
  const source = /walk/i.test(note)
    ? "Walk-in"
    : /web|form|online/i.test(note)
      ? "Web form"
      : /call/i.test(note)
        ? "Call"
        : "Not found";
  const follow =
    note.match(/(?:call back|follow[- ]?up)\s+([^.\n]+)/i)?.[1]?.trim() ||
    "Not set";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return { name, phone, interest, source, follow, initials };
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ZentovixPage() {
  const root = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [stage, setStage] = useState(0);
  const lead = useMemo(() => parseNote(note), [note]);

  // FAQs added from the console for this page; fall back to the written ones
  const { data: faqData } = usePublicFaqs("zentovix");
  const faqs = faqData?.data?.length
    ? faqData.data.map((f) => ({ q: f.question, a: f.answer }))
    : FAQ;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".zx-logo", { y: 20, opacity: 0, duration: 0.7 })
          .from(".zx-hero h1", { y: 44, opacity: 0, duration: 0.9 }, 0.1)
          .from(".zx-hero-copy, .zx-hero-cta", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.35)
          .from(".zx-sources li", { y: 16, opacity: 0, stagger: 0.07, duration: 0.5 }, 0.4)
          .from(".zx-shot", { y: 50, opacity: 0, duration: 0.9 }, 0.5)
          .from(".zx-lead", { y: 30, scale: 0.94, opacity: 0, duration: 0.7 }, 0.95)
          .from(".zx-pipe li", { y: 14, opacity: 0, stagger: 0.08, duration: 0.5 }, 1.1);

        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        // the staircase builds itself: each step grows up from the floor
        const horizontal = window.matchMedia("(max-width: 960px)").matches;
        gsap.from(".zx-step", {
          [horizontal ? "scaleX" : "scaleY"]: 0,
          opacity: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".zx-stairs", start: "top 80%", once: true },
        });

        // hero screenshot drifts slower than the page
        gsap.to(".zx-shot", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: ".zx-hero", start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="zx" ref={root}>
      {/* ---------- hero ---------- */}
      <section className="zx-dark zx-hero">
        <div className="zx-in zx-hero-grid">
          <div>
            <Image className="zx-logo" src={`${IMG}/logo-dark.png`} alt="Zentovix" width={900} height={589} priority />
            <h1 className="zx-display">Manage your academy in single click</h1>
            <p className="zx-hero-copy">
              Manage leads, admissions, students, batches and fees in one platform, built for coaching centres, schools and academies.
            </p>
            <div className="zx-hero-cta">
              <a href={ZX_URL} target="_blank" rel="noopener noreferrer" className="zx-btn zx-btn--orange">
                {TRIAL} <Arrow />
              </a>
              <a href="#how" className="zx-btn zx-btn--ghost">
                See how it works
              </a>
            </div>
          </div>

          <div className="zx-vis">
            <ul className="zx-sources" aria-label="Where leads come from">
              {SOURCES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <figure className="zx-shot">
              <Image src={`${IMG}/ss-2.png`} alt="Zentovix leads dashboard showing total leads, new, hot and follow-ups" width={946} height={468} priority sizes="(max-width: 960px) 100vw, 50vw" />
            </figure>
            <div className="zx-lead">
              <div className="zx-lead-top">
                <span className="zx-avatar">RM</span>
                <div>
                  <strong>Riya Mehta</strong>
                  <span>Class 11 Science</span>
                </div>
              </div>
              <div className="zx-lead-foot">
                <span>Batch assigned · Fee paid</span>
                <b>₹12,000</b>
              </div>
            </div>
            <ol className="zx-pipe" aria-label="Admission pipeline">
              {PIPE.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- scribble ---------- */}
      <section className="zx-sec" id="scribble" aria-labelledby="scrib-h">
        <div className="zx-in">
          <h2 id="scrib-h" className="zx-display zx-h2" data-reveal>
            Scribble it. Zentovix files it.
          </h2>
          <div className="zx-scrib-grid">
            <div className="zx-note" data-reveal>
              <label htmlFor="zx-note">Try editing this note</label>
              <textarea
                id="zx-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className="zx-leadcard" data-reveal>
              <div className="zx-leadcard-head">
                <span className="zx-avatar">{lead.initials}</span>
                <div>
                  <h3>{lead.name}</h3>
                  <p>{STAGES[stage] === "New enquiry" ? "New enquiry" : STAGES[stage]}</p>
                </div>
              </div>
              <dl className="zx-fields">
                <div>
                  <dt>Phone</dt>
                  <dd>{lead.phone}</dd>
                </div>
                <div>
                  <dt>Interested in</dt>
                  <dd>{lead.interest}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{lead.source}</dd>
                </div>
                <div>
                  <dt>Next follow-up</dt>
                  <dd>{lead.follow}</dd>
                </div>
              </dl>
              <ol className="zx-stages" aria-label="Lead stage">
                {STAGES.map((s, i) => (
                  <li key={s} className={i < stage ? "is-done" : i === stage ? "is-now" : ""}>
                    {s}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="zx-btn zx-btn--orange"
                onClick={() => setStage((s) => (s + 1) % STAGES.length)}
              >
                {MOVE[stage]} <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- how ---------- */}
      <section className="zx-white zx-sec" id="how" aria-labelledby="how-h">
        <div className="zx-in">
          <h2 id="how-h" className="zx-display zx-how-title" data-reveal>
            From new enquiry to paid admission
          </h2>
          <ol className="zx-stairs">
            {HOW.map((h) => (
              <li className="zx-step" key={h.t}>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- why ---------- */}
      <section className="zx-sec" id="why" aria-labelledby="why-h">
        <div className="zx-in">
          <h2 id="why-h" className="zx-display zx-h2" data-reveal>
            Built around your institute&apos;s real day
          </h2>
          <ul className="zx-why">
            {WHY.map((w) => (
              <li key={w.t} data-reveal>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section className="zx-dark zx-sec" id="features" aria-labelledby="feat-h">
        <div className="zx-in">
          <h2 id="feat-h" className="zx-display zx-h2" data-reveal>
            Leads, fees, batches and LMS in one place
          </h2>
          <div className="zx-feat">
            <figure className="zx-tile zx-tile--wide" data-reveal>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                <Image src={`${IMG}/ss-4.png`} alt="Students overview with enrolments and pending fees" width={1047} height={290} sizes="(max-width: 1760px) 100vw, 1700px" />
              </div>
              <figcaption>Students overview with enrolments and pending fees</figcaption>
            </figure>
            <div className="zx-tile zx-tile--half" data-reveal>
              <figure>
                <Image src={`${IMG}/ss-5.png`} alt="Zentovix menu with admissions, students, courses, batches and leads" width={437} height={852} sizes="260px" />
              </figure>
              <p className="zx-cap">Zentovix menu: admissions, students, courses, batches, leads</p>
            </div>
            <div className="zx-tile zx-tile--half" data-reveal>
              <figure>
                <Image src={`${IMG}/ss-7.png`} alt="Zentovix Assistant answering questions about your academy" width={535} height={872} sizes="260px" />
              </figure>
              <p className="zx-cap">Zentovix Assistant answering questions about your academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="zx-sec" aria-labelledby="stat-h">
        <div className="zx-in zx-stat">
          <div data-reveal>
            <p className="zx-big">
              14 days
              <span>for ₹299</span>
            </p>
            <ul className="zx-incl">
              {INCLUDED.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="zx-chart" data-reveal>
            <h2 id="stat-h" className="zx-display">
              Clear reports for better decisions
            </h2>
            <Image src={`${IMG}/ss-3.png`} alt="Chart of daily revenue and admissions" width={710} height={321} sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section className="zx-white zx-sec" id="pricing" aria-labelledby="price-h">
        <div className="zx-in">
          <h2 id="price-h" className="zx-display zx-h2" data-reveal>
            Start small. Grow with clarity.
          </h2>
          <ul className="zx-plans">
            <li className="zx-plan zx-plan--trial" data-reveal>
              <h3>14-day trial</h3>
              <p className="zx-price">
                ₹299<small>registration</small>
              </p>
              <p className="zx-plan-note">All core features, no automatic renewal</p>
              <a href={ZX_URL} target="_blank" rel="noopener noreferrer" className="zx-btn zx-btn--ink">
                Start trial <Arrow />
              </a>
            </li>
            {PLANS.map((p) => (
              <li className="zx-plan" key={p.t} data-reveal>
                <h3>
                  {p.t}
                  {p.pop && <em className="zx-pop">Most popular</em>}
                </h3>
                <p className="zx-price">
                  {p.p}
                  <small>3 months · after your trial</small>
                </p>
                <p className="zx-plan-note">
                  {p.cap}
                  <span>{p.m}</span>
                </p>
                <a href={ZX_URL} target="_blank" rel="noopener noreferrer" className="zx-btn zx-btn--ghost">
                  Start trial <Arrow />
                </a>
              </li>
            ))}
          </ul>
          <p className="zx-foot" data-reveal>
            ₹299 is only the trial registration amount. After 14 days, choose a plan. No automatic renewal.
          </p>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="zx-sec" id="faq" aria-labelledby="faq-h">
        <div className="zx-in zx-faq-grid">
          <h2 id="faq-h" className="zx-display zx-h2" data-reveal>
            Questions? Clear answers.
          </h2>
          <div className="zx-faq" data-reveal>
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <i aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                    </svg>
                  </i>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="zx-orange" aria-labelledby="cta-h">
        <div className="zx-in zx-cta">
          <h2 id="cta-h" className="zx-display" data-reveal>
            Your institute deserves a simpler day
          </h2>
          <p className="zx-cta-sub" data-reveal>
            ₹299 registration · 14-day access · All core features · No automatic renewal after the trial
          </p>
          <div className="zx-cta-row" data-reveal>
            <a href={ZX_URL} target="_blank" rel="noopener noreferrer" className="zx-btn zx-btn--ink">
              {TRIAL} <Arrow />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
