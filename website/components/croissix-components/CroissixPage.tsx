"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePublicFaqs } from "@/app/features/faq/hook/useFaq";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMG = "/assets/images/croissix";
const APP_URL = "https://play.google.com/store/apps/details?id=com.vipprow.croissix";
const WEB_URL = "https://ai.croissix.com";

const SCORES = [
  { label: "Photos", v: 85 },
  { label: "Reviews", v: 92 },
  { label: "Posts", v: 70 },
  { label: "Info", v: 95 },
  { label: "Q&A", v: 60 },
];

const STATS = [
  {
    n: 42,
    dec: 0,
    prefix: "+",
    suffix: "%",
    h: "Increase in Local Map Pack Visibility",
    p: "Businesses see higher map pack presence within 30 days of automation.",
  },
  {
    n: 5.3,
    dec: 1,
    prefix: "",
    suffix: "x",
    h: "Faster Customer Review Reply Rate",
    p: "AI responds to new reviews in under 2 seconds, not 2 days.",
  },
  {
    n: 18,
    dec: 0,
    prefix: "",
    suffix: " hrs",
    h: "Average Hours Saved Per Month on Manual Posting",
    p: "Stop writing posts, uploading photos, and chasing reviews by hand.",
  },
];

const REVIEW = "Absolutely love this place! The pasta is incredible and staff are so friendly.";
const REPLY = "Thank you so much, Sarah! We're thrilled you loved the pasta. Can't wait to welcome you back!";
const POST = "Weekend special is HERE! Fresh handmade dough, local ingredients, and our famous truffle sauce. Come taste the difference!";

const MODULES = [
  {
    title: "Google Business Profile Connection",
    desc: "Secure one-click OAuth authorization. Link your GBP in under 60 seconds.",
    heading: "Connect & Synced in Seconds",
    text: "Say goodbye to complex configurations. Seamlessly integrate your direct Google storefront endpoints safely via authenticated enterprise OAuth mechanics.",
  },
  {
    title: "Google Analytics Dashboard",
    desc: "Live local traffic, click-to-call, and direction requests — all in one view.",
    heading: "Track Real-Time Performance Data",
    text: "Understand exactly how your buyers discover your business locations. Gain visibility over actual map views, custom calls, routing requests, and actions on the fly.",
  },
  {
    title: "Auto-Reply to Google Reviews",
    desc: "AI reads each review and crafts a personalized, brand-aligned response instantly.",
    heading: "Automate Reviews Engagement with AI",
    text: "Boost search algorithm priority. Our lightning-fast text processing constructs engaging, custom contextual outputs tailored explicitly around buyer-sentiments.",
  },
  {
    title: "Photo Management & Post Creation",
    desc: "Upload media and let AI write compelling posts optimized for local search.",
    heading: "Dynamic AI Local Media Creation",
    text: "Transform raw imagery files into fully search-optimized posts loaded with high-ranking regional search tag keywords guaranteed to capture target area interest.",
  },
  {
    title: "GBP Optimization Score Card",
    desc: "A live score out of 1000 pinpoints exactly what to fix to climb rankings.",
    heading: "Pinpoint SEO Opportunities Quickly",
    text: "Never operate in blind spots. Run constant audit cross-checks with instant granular breakdowns that deliver simple insights so you rank higher across all local indexes.",
  },
];

const FACEBOOK = [
  ["Auto-Posting", "Schedule and publish AI-generated posts directly to your Facebook Business Page."],
  ["Ad Performance Tracking", "Monitor local ad spend, reach, and conversion rates from one unified dashboard."],
  ["Cross-Platform Review Sync", "Facebook reviews pulled into the same AI auto-reply engine as Google."],
  ["Smart Notifications", "Real-time alerts for new comments, messages, and review spikes."],
];
const INSTAGRAM = [
  ["AI-Generated Reels & Posts", "Turn business updates into scroll-stopping Instagram content automatically."],
  ["Story & Reel Analytics", "Track impressions, saves, and DM conversions for local visibility campaigns."],
  ["Hashtag Optimization", "AI selects hyper-local hashtags to maximize reach in your city or neighborhood."],
  ["DM Auto-Responses", "Instantly answer common questions and capture leads from Instagram DMs."],
];

const INCLUDED = [
  ["1 Google Business Profile Connection", "Secure enterprise OAuth 2.0 endpoint synchronization."],
  ["AI Auto-Review Reply Engine", "Instant semantic analysis and contextual responses under 1.8s."],
  ["GBP Media & Photo Management", "Algorithmic asset deployment calibrated for local search indexes."],
  ["AI Post Creation & One-Click Publishing", "Generate optimized regional updates and push instantly via automated APIs."],
  ["GBP Dynamic Optimization Score Card", "Granular live audits mapped out of 1,000 to continuously track rank viability."],
  ["Google Analytics Dashboard with Live Graphs", "Deep analytical performance engine tracking proximity traffic and conversion intent hooks."],
];

const ARCH = [
  ["Autonomous Execution", "We don't build standard tracking tools; we construct self-driving operations. If an AI can safely handle local sync and image optimization in 1.8 seconds, humans shouldn't have to spend hours on it."],
  ["Hyper-Local Priority", "Search algorithms look for proximity, velocity, and real-time community engagement. Every core line of our code is micro-targeted to optimize your localized proximity footprint."],
  ["Enterprise Security Architecture", "We value zero-trust connectivity. Using encrypted OAuth 2.0 access loops, we manage sensitive local business storefront endpoints safely without compromising credentials."],
];

const TRAJECTORY = [
  ["The Spark", "Recognizing the Local Gap", "Croissix AI was born out of a simple observation: while enterprise brands had armies of SEO agencies, local businesses were drowning in complex dashboard configurations just to keep their Google presence alive."],
  ["The Code", "Building Autonomous Workflows", "We engineered an intelligence layer capable of real-time multi-endpoint sync, semantic sentiment parsing for automated review management, and high-ranking regional keyword optimization mechanics."],
  ["The Impact", "Empowering Local Storefronts", "Today, thousands of local operations—from urban bistros to regional service providers—rely on our autonomous five-module ecosystem to continuously dominate regional map-packs and hyper-local search indexes."],
];

// keep only the first sentence of a longer description
const first = (text: string) => text.split(/(?<=[.!?])\s/)[0];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* The reply types itself, the way the product answers a review. */
function useTyped(text: string, run: boolean, reduce: boolean, restart: number) {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [text, run, reduce, restart]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

function ModuleWidget({ index, reduce, replay }: { index: number; reduce: boolean; replay: number }) {
  const typed = useTyped(REPLY, index === 2, reduce, replay);
  // `replay` only exists to restart the typing from the Replay button
  const typedKey = `${replay}-${index}`;

  if (index === 0) {
    return (
      <div className="cx-widget">
        <div className="cx-line">
          <span>Google Business Profile</span>
          <span className="cx-chip cx-chip--ok">Connected</span>
        </div>
        <div className="cx-line">
          <span>Milano Bistro</span>
          <span className="cx-chip">GBP Dashboard</span>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="cx-widget">
        <div className="cx-line">
          <span>Weekly Traffic</span>
          <span className="cx-chip cx-chip--ok">+42%</span>
        </div>
        <div className="cx-bars" style={{ display: "grid", gap: 10 }}>
          {[
            ["Visibility", 82],
            ["Calls", 58],
            ["Directions", 68],
          ].map(([l, v]) => (
            <div className="cx-bar" key={l as string}>
              <span>{l}</span>
              <i>
                <u style={{ width: `${v}%` }} />
              </i>
              <em />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="cx-widget" key={typedKey}>
        <div className="cx-review">
          “{REVIEW}”<small>Latest Review</small>
        </div>
        <div className={`cx-typed ${typed.done ? "is-done" : ""}`} aria-live="polite">
          {typed.shown}
        </div>
        <span className="cx-chip" style={{ width: "fit-content" }}>
          {typed.done ? "AI replied · 2s ago" : "AI is replying"}
        </span>
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="cx-widget">
        <div className="cx-media" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="cx-post">
          {POST}
          <small>Photo Management &amp; Post Creation</small>
        </div>
      </div>
    );
  }
  return (
    <div className="cx-widget">
      <div className="cx-score">
        <b>780</b>
        <span>
          out of 1000 <span className="cx-chip cx-chip--warn">Needs Attention</span>
        </span>
        <div className="cx-bars">
          {SCORES.map((s) => (
            <div className="cx-bar" key={s.label}>
              <span>{s.label}</span>
              <i>
                <u style={{ width: `${s.v}%` }} />
              </i>
              <em>{s.v}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CroissixPage() {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(2);
  const [replay, setReplay] = useState(0);
  const [reduce, setReduce] = useState(false);

  // FAQs added from the console for this page (the section hides when there are none)
  const { data: faqData } = usePublicFaqs("croissix");
  const faqs = faqData?.data ?? [];

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".cx-mark", { scale: 0.6, opacity: 0, duration: 0.6 })
          .from(".cx-hero h1", { y: 44, opacity: 0, duration: 0.9 }, 0.1)
          .from(".cx-hero-copy, .cx-checks li, .cx-hero-cta, .cx-note", { y: 22, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.35)
          .from(".cx-dash", { y: 60, opacity: 0, duration: 1 }, 0.3)
          .from(".cx-dash .cx-bar i u", { scaleX: 0, stagger: 0.08, duration: 0.8 }, 0.9);

        gsap.to(".cx-dash", {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: ".cx-hero", start: "top top", end: "bottom top", scrub: true },
        });

        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        // numbers count up as the stat blocks arrive
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const dec = Number(el.dataset.dec || 0);
          const pre = el.dataset.prefix || "";
          const suf = el.dataset.suffix || "";
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = `${pre}${o.v.toFixed(dec)}${suf}`;
            },
          });
        });

        // staircase blocks grow from the floor
        gsap.from(".cx-stat, .cx-trj li", {
          scaleY: 0.82,
          transformOrigin: "bottom",
          opacity: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cx-stats", start: "top 82%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const m = MODULES[tab];

  return (
    <div className="cx" ref={root}>
      {/* ---------- hero ---------- */}
      <section className="cx-hero">
        <div className="cx-in cx-hero-grid">
          <div>
            <div className="cx-mark">
              <Image src={`${IMG}/logo.png`} alt="Croissix AI" width={128} height={105} priority />
            </div>
            <h1 className="cx-display">
              Put Your Local Marketing on <span>Autopilot.</span>
            </h1>
            <p className="cx-hero-copy">
              Dominate Google Business Profile with AI. Automate reviews, posts, photos, and analytics — so you can
              focus on running your business, not marketing it.
            </p>
            <div className="cx-hero-cta">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="cx-btn cx-btn--acc">
                Download the app now <Arrow />
              </a>
              <a href={WEB_URL} target="_blank" rel="noopener noreferrer" className="cx-btn cx-btn--soft">
                Web Version
              </a>
            </div>
            <p className="cx-note">No credit card required · Free for 3 days</p>
          </div>

          <div className="cx-dash" aria-label="Croissix GBP dashboard">
            <div className="cx-dash-head">
              <div>
                <h2>GBP Dashboard</h2>
                <p>Milano Bistro</p>
              </div>
              <span className="cx-chip cx-chip--warn">Needs Attention</span>
            </div>
            <div className="cx-score">
              <b>780</b>
              <span>/ 1000 Profile Score</span>
              <div className="cx-bars">
                {SCORES.slice(0, 3).map((s) => (
                  <div className="cx-bar" key={s.label}>
                    <span>{s.label}</span>
                    <i>
                      <u style={{ width: `${s.v}%` }} />
                    </i>
                    <em>{s.v}</em>
                  </div>
                ))}
              </div>
            </div>
            <div className="cx-dash-row">
              <div className="cx-card">
                <h3>Latest Review</h3>
                <q>Amazing food and super fast service! Will definitely be back soon.</q>
                <span className="cx-reply">AI replied · 2s ago</span>
              </div>
              <div className="cx-card cx-mini">
                <div>
                  <span>Weekly Traffic</span>
                  <b>+42%</b>
                </div>
                <div>
                  <span>Time Saved</span>
                  <b>18 hrs/mo</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="cx-sec" aria-labelledby="stats-h">
        <div className="cx-in">
          <div className="cx-ph" data-reveal>
            <h2 id="stats-h">Real Results: Numbers That Speak for Themselves.</h2>
            <p>Across hundreds of local businesses using Croissix AI, the impact is clear.</p>
          </div>
          <ul className="cx-stats">
            {STATS.map((s) => (
              <li className="cx-stat" key={s.h}>
                <b data-count={s.n} data-dec={s.dec} data-prefix={s.prefix} data-suffix={s.suffix}>
                  {s.prefix}
                  {s.n.toFixed(s.dec)}
                  {s.suffix}
                </b>
                <h3>{s.h}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- modules ---------- */}
      <section className="cx-s1 cx-sec" aria-labelledby="mods-h">
        <div className="cx-in">
          <div className="cx-ph" data-reveal>
            <h2 id="mods-h">Five core modular workflows</h2>
          </div>
          <div className="cx-mods">
            <div className="cx-tabs" role="tablist" aria-label="Croissix modules" data-reveal>
              {MODULES.map((mod, i) => (
                <button
                  key={mod.title}
                  type="button"
                  role="tab"
                  id={`cx-tab-${i}`}
                  aria-selected={tab === i}
                  aria-controls="cx-panel"
                  className="cx-tab"
                  onClick={() => {
                    setTab(i);
                    if (i === 2) setReplay((r) => r + 1);
                  }}
                >
                  <strong>{mod.title}</strong>
                  <span>{mod.desc}</span>
                </button>
              ))}
            </div>
            <div className="cx-panel" id="cx-panel" role="tabpanel" aria-labelledby={`cx-tab-${tab}`} data-reveal>
              <h3>{m.heading}</h3>
              <ModuleWidget index={tab} reduce={reduce} replay={replay} />
              {tab === 2 && (
                <button type="button" className="cx-btn cx-btn--soft cx-replay" onClick={() => setReplay((r) => r + 1)}>
                  Replay the reply
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- channels ---------- */}
      <section className="cx-sec" aria-labelledby="chan-h">
        <div className="cx-in">
          <div className="cx-ph" data-reveal>
            <h2 id="chan-h">Expanding Across Every Platform You Need.</h2>
            <p>
              Google is just the start. Croissix AI is rolling out automation for every channel your local customers
              use.
            </p>
          </div>
          <div className="cx-chan">
            {[
              ["Facebook", FACEBOOK],
              ["Instagram", INSTAGRAM],
            ].map(([name, items]) => (
              <article key={name as string} data-reveal>
                <h3>
                  {name as string} <em>Coming Soon</em>
                </h3>
                <ul className="cx-feat">
                  {(items as string[][]).map(([t]) => (
                    <li key={t}>
                      <strong>{t}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section className="cx-brand cx-sec" id="pricing" aria-labelledby="price-h">
        <div className="cx-in">
          <div className="cx-ph" data-reveal>
            <h2 id="price-h">One Simple Plan. Infinite Local Dominance.</h2>
            <p>
              Access the complete five-module autonomous growth suite. Zero hidden fees. Cancel configuration structures
              whenever you want.
            </p>
          </div>
          <div className="cx-price">
            <div data-reveal>
              <ul className="cx-incl" aria-label="Included Enterprise Capabilities">
                {INCLUDED.map(([t]) => (
                  <li key={t}>
                    <strong>{t}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cx-plan" data-reveal>
              <span className="cx-plan-badge">Risk Free Activation</span>
              <h3>Autonomous Pro Tier</h3>
              <p className="cx-amount">
                ₹599<small>/ month</small>
              </p>
              <div className="cx-trial">
                <strong>3-Days Complementary Trial Access</strong>
                Instant profile sync with full feature capabilities at ₹0 upfront cost.
              </div>
              <ul>
                <li>No credit card required to test setup baseline</li>
                <li>Charges automatically begin on Day 4</li>
              </ul>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="cx-btn cx-btn--ink">
                Initialize 3-Day Free Trial <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- mission ---------- */}
      <section className="cx-sec" aria-labelledby="mission-h">
        <div className="cx-in">
          <div className="cx-ph" data-reveal>
            <h2 id="mission-h">Our Mission: Bridging the Divide Between Local Intent &amp; Autonomous AI.</h2>
            <p>
              Croissix AI builds zero-friction infrastructure that puts local physical businesses on autopilot, turning
              regional map rankings into an exact, predictable engineering formula.
            </p>
          </div>
          <div className="cx-mission">
            <div className="cx-mission-copy" data-reveal>
              <blockquote>Our north star is removing human operational friction from the local visibility cycle entirely.</blockquote>
            </div>
            <div className="cx-facts" data-reveal>
              <div className="cx-fact">
                <b>1.8s</b>
                <span>Avg. AI Review Reaction Time</span>
              </div>
              <div className="cx-fact">
                <b>100%</b>
                <span>OAuth Secured Data Routing</span>
              </div>
            </div>
          </div>

          <div className="cx-ph cx-ph--sub" data-reveal>
            <h2>Our Core Architectures</h2>
          </div>
          <ul className="cx-arch">
            {ARCH.map(([t, d]) => (
              <li key={t} data-reveal>
                <h3>{t}</h3>
                <p>{first(d)}</p>
              </li>
            ))}
          </ul>

          <div className="cx-ph cx-ph--sub" data-reveal>
            <h2>How We Built The Future of Local Search</h2>
          </div>
          <ul className="cx-trj">
            {TRAJECTORY.map(([y, t, d]) => (
              <li key={t}>
                <span>{y}</span>
                <h3>{t}</h3>
                <p>{first(d)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- faq (from the console) ---------- */}
      {faqs.length > 0 && (
        <section className="cx-sec" aria-labelledby="faq-h">
          <div className="cx-in">
            <div className="cx-ph" data-reveal>
              <h2 id="faq-h">Questions, answered</h2>
            </div>
            <div className="cx-faq" data-reveal>
              {faqs.map((f, i) => (
                <details key={f._id} open={i === 0}>
                  <summary>
                    {f.question}
                    <i aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                      </svg>
                    </i>
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- cta ---------- */}
      <section className="cx-cta" aria-labelledby="cta-h">
        <h2 id="cta-h" className="cx-display" data-reveal>
          Ready to Put Your Local Visibility on Autopilot?
        </h2>
        <p data-reveal>
          Deploy our five core modular workflows to automatically connect, capture, audit, and dominate your regional
          footprint maps.
        </p>
        <div className="cx-cta-row" data-reveal>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="cx-btn cx-btn--ink">
            Initialize Your Dashboard <Arrow />
          </a>
          <a href={WEB_URL} target="_blank" rel="noopener noreferrer" className="cx-btn cx-btn--soft">
            Web Version
          </a>
        </div>
      </section>
    </div>
  );
}
