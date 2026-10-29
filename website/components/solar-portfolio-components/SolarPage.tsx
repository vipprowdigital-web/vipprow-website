"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SOLAR_CLIENTS } from "@/data/solarClients";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMG = "/assets/images/solar";

const NAV = [
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Our Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Why VIPPROW", href: "#why" },
  { label: "Clients", href: "#clients" },
];

const HERO_TAGS = [
  "Digital Marketing",
  "Lead Generation",
  "Website Development",
  "Marketing Automation",
];

const SERVICES = [
  {
    id: "performance",
    title: "Performance Marketing",
    text: "We develop and manage digital advertising strategies designed to reach relevant audiences, generate inquiries, and improve campaign performance.",
    items: [
      "Google Ads",
      "Meta Ads — Facebook and Instagram",
      "Audience targeting and campaign strategy",
      "Lead generation campaigns",
      "Landing page optimization",
      "Campaign performance analysis",
    ],
  },
  {
    id: "websites",
    title: "Website Development & Landing Pages",
    text: "We create digital experiences that help solar businesses communicate their services, showcase projects, build credibility, and convert visitors into inquiries.",
    items: [
      "Business and service websites",
      "Solar-specific landing pages",
      "Lead capture forms and CTA integration",
      "Mobile-responsive design",
      "Conversion-focused page structure",
      "Analytics and tracking integration",
    ],
  },
  {
    id: "creative",
    title: "Creative & Content Marketing",
    text: "We develop marketing creatives that help solar brands communicate their offerings clearly and professionally.",
    items: [
      "Social media creatives and carousels",
      "Promotional campaign designs",
      "Solar product and service communication",
      "Educational content",
      "Ad creatives and campaign variations",
      "Brand identity and visual consistency",
    ],
  },
  {
    id: "seo",
    title: "SEO & Online Visibility",
    text: "We help solar businesses strengthen their discoverability across relevant search channels.",
    items: [
      "Keyword research",
      "On-page SEO",
      "Service and location-based landing pages",
      "Technical SEO recommendations",
      "Google Business Profile optimization",
      "Content strategy",
    ],
  },
  {
    id: "leads",
    title: "Lead Management & Marketing Automation",
    text: "We help businesses build more organized processes for handling incoming leads and improving follow-up consistency.",
    items: [
      "CRM setup and workflow planning",
      "Lead capture and assignment",
      "Follow-up automation",
      "WhatsApp integration planning",
      "Email marketing workflows",
      "Lead tracking and reporting",
    ],
  },
];

const STEPS = [
  {
    n: "STEP 01",
    t: "Understand",
    d: "We learn about your business model, target market, service areas, ideal customers, and growth objectives.",
  },
  {
    n: "STEP 02",
    t: "Strategize",
    d: "We identify relevant channels, campaign opportunities, messaging, and the digital assets required to reach your audience.",
  },
  {
    n: "STEP 03",
    t: "Execute",
    d: "We implement the agreed strategy across advertising, website development, creative production, SEO, and automation.",
  },
  {
    n: "STEP 04",
    t: "Optimize",
    d: "We review performance data, identify improvement opportunities, and refine campaigns and conversion journeys.",
  },
];

const WHY = [
  {
    t: "Integrated Services",
    d: "Marketing, creative, technology, and automation capabilities under one roof.",
  },
  {
    t: "Business-Focused Strategy",
    d: "Digital activities aligned with your business goals and target audience.",
  },
  {
    t: "Conversion-Oriented Execution",
    d: "A focus on turning digital attention into meaningful inquiries and sales opportunities.",
  },
  {
    t: "Scalable Solutions",
    d: "Strategies and systems that can evolve as your business and marketing requirements grow.",
  },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chapter = ({
  n,
  id,
  children,
}: {
  n: string;
  id?: string;
  children: React.ReactNode;
}) => {
  const Tag = id ? "h2" : "p";
  return (
    <Tag className="sl-chapter" id={id} data-reveal>
      <b>{n}</b>
      <span>{children}</span>
    </Tag>
  );
};

export default function SolarPage() {
  const root = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("solar-theme");
      if (saved === "dark" || saved === "light") setTheme(saved);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("solar-theme", next);
    } catch {}
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // hero entrance
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".sl-sunDisc", { yPercent: 60, scale: 0.8, opacity: 0, duration: 1.4 })
          .from(".sl-hero h1", { y: 48, opacity: 0, duration: 1 }, 0.1)
          .from(".sl-hero-photo", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power4.inOut" }, 0.3)
          .from(".sl-card", { y: 30, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.9)
          .from(".sl-hero-cta > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, 1.1);

        // hero photo drift + sun drift
        gsap.to(".sl-hero-img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".sl-hero-stage", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to(".sl-sunDisc", {
          y: 120,
          ease: "none",
          scrollTrigger: { trigger: ".sl-hero", start: "top top", end: "bottom top", scrub: true },
        });

        // staggered section entrances, batched
        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        // services: active panel drives the side list
        const panels = gsap.utils.toArray<HTMLElement>(".sl-panel");
        const links = gsap.utils.toArray<HTMLElement>(".sl-svc-nav a");
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              panel.classList.toggle("is-on", self.isActive);
              links[i]?.classList.toggle("is-on", self.isActive);
            },
          });
        });

        // approach: the sun crosses the sky as you scroll
        const path = root.current?.querySelector<SVGPathElement>(".sl-path-run");
        const sun = root.current?.querySelector<HTMLElement>(".sl-path-sun");
        const steps = gsap.utils.toArray<HTMLElement>(".sl-step");
        if (path && sun) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          ScrollTrigger.create({
            trigger: ".sl-path",
            start: "top 70%",
            end: "bottom 35%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              path.style.strokeDashoffset = String(len * (1 - p));
              const pt = path.getPointAtLength(len * p);
              sun.style.left = `${(pt.x / 1200) * 100}%`;
              sun.style.top = `${(pt.y / 420) * 100}%`;
              steps.forEach((s, i) => s.classList.toggle("is-lit", p >= (i + 0.35) / 4));
            },
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".sl-step").forEach((s) => s.classList.add("is-lit"));
        const sun = root.current?.querySelector<HTMLElement>(".sl-path-sun");
        if (sun) {
          sun.style.left = "50%";
          sun.style.top = "24%";
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="sl" data-theme={theme} ref={root}>
      {/* ---------- nav ---------- */}
      <header className="sl-nav">
        <div className="sl-wrap sl-nav-in">
          <Link href="/" className="sl-logo" aria-label="VIPPROW home">
            <img src="/assets/images/logo/vipprow_logo.svg" alt="VIPPROW" width={168} height={30} />
          </Link>
          <nav className="sl-links" aria-label="Solar portfolio">
            {NAV.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="sl-nav-act">
            <button
              type="button"
              className="sl-theme"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            >
              <svg className="sl-sunico" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg className="sl-moon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
              </svg>
            </button>
            <Link href="/contact" className="sl-btn sl-btn--sun">
              Contact VIPPROW
            </Link>
            <button
              type="button"
              className="sl-theme sl-burger"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={menu ? "M6 6l12 12M18 6 6 18" : "M4 8h16M4 16h16"} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="sl-menu" hidden={!menu}>
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </a>
          ))}
          <Link href="/contact" className="sl-btn sl-btn--sun">
            Contact VIPPROW
          </Link>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className="sl-hero sl-wrap">
          <div className="sl-sunDisc" aria-hidden="true" />
          <h1 className="sl-display">Powering Solar Businesses With Digital Growth</h1>
          <div className="sl-hero-stage">
            <div className="sl-hero-photo">
              <div className="sl-hero-img">
                <Image
                  src={`${IMG}/hero.png`}
                  alt="Rows of solar panels in a green field under a blue sky"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 1700px"
                />
              </div>
            </div>
            <div className="sl-card sl-card--intro">
              <p>
                From digital presence to lead generation, VIPPROW helps solar businesses build a stronger online
                presence, reach the right audience, and create scalable customer acquisition systems.
              </p>
              <p>
                We combine performance marketing, creative strategy, website development, SEO, and marketing
                automation to support the growth of solar companies.
              </p>
            </div>
            <div className="sl-card sl-card--tags">
              <ul>
                {HERO_TAGS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="sl-hero-cta">
              <a href="#capabilities" className="sl-btn sl-btn--sun">
                Explore Our Capabilities <Arrow />
              </a>
              <Link href="/contact" className="sl-btn sl-btn--soft">
                Discuss Your Growth Goals
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- 01 experience ---------- */}
        <section className="sl-sec sl-wrap" id="experience" aria-labelledby="exp-h">
          <Chapter n="01">Our Experience in the Solar Industry</Chapter>
          <h2 id="exp-h" className="sl-display sl-h2 sl-exp-title" data-reveal>
            More Than Marketing. A Growth-Focused Approach.
          </h2>
          <div className="sl-exp">
            <div className="sl-exp-text">
              <div data-reveal>
                <p>
                  The solar industry is competitive, and having a good product or service is only one part of
                  business growth. Reaching the right decision-makers, communicating value, building trust, and
                  generating qualified opportunities are equally important.
                </p>
                <p>
                  VIPPROW works across digital marketing and technology to help solar businesses strengthen these
                  areas through a structured, performance-focused approach.
                </p>
                <p>
                  Our work spans multiple digital touchpoints, from brand communication and campaign creatives to
                  website experiences, lead generation, and conversion-focused marketing.
                </p>
              </div>
            </div>
            <figure className="sl-exp-photo" data-reveal>
              <Image
                src={`${IMG}/experience.png`}
                alt="A team gathered around a table planning with plans and a laptop"
                fill
                sizes="(max-width: 900px) 100vw, 800px"
              />
            </figure>
          </div>
        </section>

        {/* ---------- 02 capabilities ---------- */}
        <section className="sl-sec sl-wrap" id="capabilities" aria-labelledby="cap-h">
          <Chapter n="02" id="cap-h">
            What We Do for Solar Businesses
          </Chapter>
          <div className="sl-svc">
            <nav className="sl-svc-nav" aria-label="Capabilities">
              {SERVICES.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="sl-svc-list">
              {SERVICES.map((s) => (
                <article className="sl-panel" id={s.id} key={s.id} data-reveal>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03 work ---------- */}
        <section className="sl-sec sl-wrap" id="work" aria-labelledby="work-h">
          <Chapter n="03">Our Solar Marketing Work</Chapter>
          <div className="sl-work-head">
            <h2 id="work-h" className="sl-display sl-h2" data-reveal>
              A Look at Our Digital Capabilities
            </h2>
            <p className="sl-lead" data-reveal>
              Explore selected examples of our work across digital marketing, website development, advertising
              creatives, and business growth infrastructure.
            </p>
          </div>
          <div className="sl-bento">
            <article className="sl-tile sl-tile--a" data-reveal>
              <div className="sl-tile-vis">
                <div className="sl-browser" aria-hidden="true">
                  <div className="sl-browser-bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="sl-browser-pic">
                    <Image src={`${IMG}/hero.png`} alt="" fill sizes="560px" />
                  </div>
                  <div className="sl-browser-row">
                    <span>Lead capture forms and CTA integration</span>
                    <b>Book a Strategy Call</b>
                  </div>
                </div>
              </div>
              <div className="sl-tile-txt">
                <h3>Websites &amp; Landing Pages</h3>
                <p>Digital experiences built to present services, communicate value, and encourage customer inquiries.</p>
              </div>
            </article>

            <article className="sl-tile sl-tile--b" data-reveal>
              <div className="sl-tile-vis sl-tile-vis--img sl-tile-vis--duo">
                <figure>
                  <Image
                    src={`${IMG}/google-ads.png`}
                    alt="Google Ads search campaign with a performance dashboard"
                    fill
                    sizes="(max-width: 900px) 100vw, 300px"
                  />
                  <figcaption>Google Ads</figcaption>
                </figure>
                <figure>
                  <Image
                    src={`${IMG}/meta-ads.png`}
                    alt="Meta Ads campaign dashboard with Facebook and Instagram ad previews"
                    fill
                    sizes="(max-width: 900px) 100vw, 300px"
                  />
                  <figcaption>Meta Ads — Facebook and Instagram</figcaption>
                </figure>
              </div>
              <div className="sl-tile-txt">
                <h3>Performance Marketing</h3>
                <p>Campaign strategy, ad creatives, audience targeting, and conversion-focused advertising.</p>
              </div>
            </article>

            <article className="sl-tile sl-tile--c" data-reveal>
              <div className="sl-tile-vis">
                <div className="sl-car" aria-hidden="true">
                  <div className="c1">Educational content</div>
                  <div className="c3">
                    <Image src={`${IMG}/array.jpg`} alt="" fill sizes="200px" />
                    <span>Social media creatives and carousels</span>
                  </div>
                  <div className="c2">Promotional campaign designs</div>
                </div>
              </div>
              <div className="sl-tile-txt">
                <h3>Social Media &amp; Creatives</h3>
                <p>Brand communication, educational content, promotional designs, and social media campaigns.</p>
              </div>
            </article>

            <article className="sl-tile sl-tile--d" data-reveal>
              <div className="sl-tile-vis">
                <div className="sl-flow" aria-hidden="true">
                  <span>Landing pages</span>
                  <Arrow />
                  <span>Lead capture workflows</span>
                  <Arrow />
                  <span>CRM integration</span>
                  <Arrow />
                  <span>Marketing automation</span>
                </div>
              </div>
              <div className="sl-tile-txt">
                <h3>Lead Generation Systems</h3>
                <p>Landing pages, lead capture workflows, CRM integration, and marketing automation.</p>
              </div>
            </article>

            <article className="sl-tile sl-tile--e" data-reveal>
              <div className="sl-bgimg">
                <Image src={`${IMG}/array.jpg`} alt="A large field of solar panels" fill sizes="100vw" />
              </div>
              <div className="sl-scrim" />
              <div className="sl-search" aria-hidden="true">
                <span>Keyword research</span>
                <span>
                  <i />
                  Service and location-based landing pages
                </span>
                <span>
                  <i />
                  Google Business Profile optimization
                </span>
              </div>
              <div className="sl-tile-txt">
                <h3>SEO &amp; Digital Presence</h3>
                <p>Search visibility, website optimization, local discoverability, and content planning.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ---------- 04 approach ---------- */}
        <section className="sl-sec" id="approach" aria-labelledby="app-h">
          <div className="sl-approach">
            <Chapter n="04">How We Approach Solar Business Growth</Chapter>
            <h2 id="app-h" className="sl-display sl-h2" data-reveal>
              From Visibility to Qualified Opportunities
            </h2>
            <div className="sl-path" aria-hidden="true">
              <svg className="sl-path-svg" viewBox="0 0 1200 420" preserveAspectRatio="none">
                <path className="sl-path-track" d="M0 400 Q600 -200 1200 400" />
                <path className="sl-path-run" d="M0 400 Q600 -200 1200 400" />
              </svg>
              <div className="sl-path-sun" />
            </div>
            <ol className="sl-steps" style={{ listStyle: "none", padding: 0 }}>
              {STEPS.map((s) => (
                <li className="sl-step" key={s.t} data-reveal>
                  <h3>
                    <small>{s.n}</small>
                    {s.t}
                  </h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 05 why ---------- */}
        <section className="sl-sec sl-wrap" id="why" aria-labelledby="why-h">
          <Chapter n="05">Why VIPPROW?</Chapter>
          <h2 id="why-h" className="sl-display sl-h2" data-reveal>
            One Digital Growth Partner. Multiple Capabilities.
          </h2>
          <div className="sl-why-grid">
            {WHY.map((w) => (
              <article className="sl-why" key={w.t} data-reveal>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- clients ---------- */}
        <section className="sl-sec sl-wrap" id="clients" aria-labelledby="clients-h">
          <h2 id="clients-h" className="sl-display sl-h2" data-reveal>
            Brands that trust us
          </h2>
          <ul className="sl-clients">
            {SOLAR_CLIENTS.map((c, i) => (
              <li className="sl-client" key={`${c.name}-${i}`} data-reveal>
                <span className="sl-client-sun" aria-hidden="true" />
                {c.logo ? (
                  <div className="sl-client-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={`${c.name} logo`} loading="lazy" decoding="async" />
                  </div>
                ) : null}
                <div className="sl-client-foot">
                  <h3 className="sl-display sl-client-name">{c.name}</h3>
                  {c.website ? (
                    <a
                      className="sl-client-go"
                      href={c.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${c.name} website`}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- 06 contact ---------- */}
        <section className="sl-sec" id="contact" aria-labelledby="cta-h">
          <div className="sl-cta">
            <div>
              <Chapter n="06">Let&apos;s Discuss Your Solar Business</Chapter>
              <h2 id="cta-h" className="sl-display" data-reveal>
                Ready to Build Your Next Phase of Digital Growth?
              </h2>
            </div>
            <div className="sl-cta-body" data-reveal>
              <p>
                Whether you want to strengthen your online presence, generate more inquiries, improve your
                advertising, or build a structured lead management system, VIPPROW can help you identify the right
                opportunities.
              </p>
              <p>
                <strong>
                  Tell us about your business, your target market, and your growth goals. Let&apos;s explore how
                  digital marketing can support your next stage of growth.
                </strong>
              </p>
              <div className="sl-cta-btns">
                <Link href="/contact" className="sl-btn sl-btn--ink">
                  Book a Strategy Call <Arrow />
                </Link>
                <Link href="/contact" className="sl-btn sl-btn--soft">
                  Contact VIPPROW
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="sl-foot sl-wrap">
        <Link href="/" aria-label="VIPPROW home">
          <img className="sl-foot-logo" src="/assets/images/logo/vipprow_logo.svg" alt="VIPPROW" width={1200} height={214} />
        </Link>
        <div className="sl-foot-row">
          <a href="https://vipprow.com">Website: vipprow.com</a>
          <em>VIPPROW — Digital Marketing, Technology &amp; Growth Solutions</em>
        </div>
      </footer>
    </div>
  );
}
