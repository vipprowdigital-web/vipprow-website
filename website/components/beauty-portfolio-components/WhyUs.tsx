"use client";

// Clean SVG icons — no emoji, no AI-generated look
const icons = {
  diamond: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20M6 3l-4 6M18 3l4 6M12 22V9" />
    </svg>
  ),
  target: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  star: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  mapPin: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  layers: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  trendingUp: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

const reasons = [
  {
    icon: icons.diamond,
    title: "Beauty Industry Experts",
    desc: "We only work with beauty brands. No generic agency, no learning curve — pure beauty marketing expertise from day one.",
  },
  {
    icon: icons.target,
    title: "Admission-Focused Strategy",
    desc: "Every post, ad and page is designed to convert viewers into enquiries and enquiries into admissions.",
  },
  {
    icon: icons.star,
    title: "Premium Content Quality",
    desc: "Our content reflects the luxury, professionalism and artistry your beauty academy stands for.",
  },
  {
    icon: icons.mapPin,
    title: "Multi-City Experience",
    desc: "From Dehradun to Pune to Jaipur — we understand regional beauty markets and know how to speak to local audiences.",
  },
  {
    icon: icons.layers,
    title: "Complete Digital Support",
    desc: "From branding to Meta ads, website to WhatsApp templates — one agency, everything covered.",
  },
  {
    icon: icons.trendingUp,
    title: "Proven Results",
    desc: "We have delivered real growth for beauty academies across India with measurable impact on admissions and brand value.",
  },
];

export default function WhyUs() {
  return (
    <>
      <style>{`
        .whyus-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .whyus-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2.5rem 3rem;
          background: rgba(201,169,110,0.06);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .whyus-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .whyus-grid {
            grid-template-columns: 1fr !important;
          }

          .whyus-cta {
            padding: 1.75rem !important;
            flex-direction: column;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .whyus-cta-actions {
            justify-content: center !important;
          }
        }
      `}</style>

      <section id="why-us" className="section" style={styles.section}>
        <div style={styles.bgDeco} aria-hidden />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={styles.header}>
            <span className="section-label">Why Choose Us</span>
            <div className="gold-line-center" />

            <h2 style={styles.heading}>
              Why Beauty Academies
              <br />
              Trust Vipprow
            </h2>

            <p style={styles.subtext}>
              We&apos;re not just a digital agency. We&apos;re your growth
              partner — obsessed with one thing: making your beauty academy
              thrive.
            </p>
          </div>

          {/* Cards */}
          <div className="whyus-grid">
            {reasons.map((r) => (
              <div key={r.title} className="card" style={styles.card}>
                <div style={styles.iconWrap}>
                  <span style={styles.iconSvg}>{r.icon}</span>
                </div>

                <h3 style={styles.title}>{r.title}</h3>

                <p style={styles.desc}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="whyus-cta">
            <div>
              <p style={styles.ctaTagline}>
                Ready to grow your beauty academy?
              </p>
              <p style={styles.ctaSub}>
                Let&apos;s build your brand professionally.
              </p>
            </div>

            <div className="whyus-cta-actions" style={styles.ctaActions}>
              <a href="tel:+917974718311"
  className="btn-primary"
  style={{ color: "#ffffff" }}
>
  Call Us Now →
</a>

              <a
                href="https://vipprow.com/portfolio"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Our Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background:
      "linear-gradient(180deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)",
    position: "relative",
    overflow: "hidden",
  },

  bgDeco: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  header: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto 4rem",
  },

  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-4xl)",
    fontWeight: "var(--fw-bold)",
    fontStyle: "normal",
    color: "var(--color-text)",
    lineHeight: 1.2,
    margin: "0 0 1rem",
    textAlign: "center",
  },

  subtext: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-text-muted)",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "center",
  },

  card: {
    textAlign: "center",
    padding: "2rem 1.75rem",
  },

  iconWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    background: "rgba(201,169,110,0.08)",
    border: "1px solid rgba(201,169,110,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },

  iconSvg: {
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--fw-semibold)",
    color: "var(--color-text)",
    margin: "0 0 0.75rem",
    textAlign: "center",
  },

  desc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-muted)",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "center",
  },

  ctaTagline: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--fw-semibold)",
    color: "var(--color-text)",
    margin: "0 0 0.25rem",
    textAlign: "center",
  },

  ctaSub: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-muted)",
    margin: 0,
    textAlign: "center",
  },

  ctaActions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
