"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");

    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";

      setTimeout(() => {
        item.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  return (
    <>
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          width: 100%;
        }

        .hero-text-col {
          order: 1;
        }

        .hero-img-col {
          order: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .desktop-heading {
          display: inline;
        }

        .mobile-heading {
          display: none;
        }

        .hero-stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
          border-top: 1px solid var(--color-border);
          padding-top: 2rem;
        }

        .hero-img-box {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(201,169,110,0.35);
          box-shadow: 0 30px 90px rgba(0,0,0,0.5);
        }

        .hero-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-img-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(201,169,110,0.15) 0%,
            transparent 40%,
            transparent 60%,
            rgba(201,169,110,0.08) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .hero-img-fallback {
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5;
          border-radius: 24px;
          border: 1.5px dashed rgba(201,169,110,0.4);
          background: rgba(201,169,110,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 2rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .hero-text-col {
            order: 1;
          }

          .hero-img-col {
            order: 2;
          }

          .hero-img-box,
          .hero-img-fallback {
            max-width: 100% !important;
            aspect-ratio: 16/9 !important;
            border-radius: 16px !important;
          }
        }

        @media (max-width: 640px) {
          .hero-text-col {
            text-align: center !important;
            width: 100% !important;
          }

          .hero-text-col .section-label {
            display: block !important;
            text-align: center !important;
          }

          .desktop-heading {
            display: none !important;
          }

          .mobile-heading {
            display: block !important;
            width: 100%;
            font-size: 2.15rem !important;
            line-height: 1.08 !important;
            text-align: center !important;
          }

          .mobile-heading-line {
            display: block !important;
            width: 100%;
            white-space: nowrap;
            text-align: center !important;
          }

          .hero-heading,
          .hero-text-col h1 {
            width: 100%;
            text-align: center !important;
            font-size: 2.15rem !important;
            line-height: 1.08 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .hero-text-col p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .hero-text-col > div {
            justify-content: center !important;
          }

          .hero-text-col a {
            justify-content: center !important;
            text-align: center !important;
          }

          .hero-stats {
            justify-content: center !important;
            text-align: center !important;
            gap: 1.25rem !important;
          }

          .hero-stats > div {
            align-items: center !important;
            text-align: center !important;
          }

          .mobile-digitally {
            color: var(--color-text) !important;
          }

          .hero-img-col {
            justify-content: center !important;
          }

          .hero-img-box,
          .hero-img-fallback {
            aspect-ratio: 4/3 !important;
          }
        }

        @media (max-width: 390px) {
          .mobile-heading,
          .hero-heading,
          .hero-text-col h1 {
            font-size: 2.05rem !important;
          }
        }
      `}</style>

      <section ref={ref} style={styles.section}>
        <div style={styles.bgMesh} aria-hidden />
        <div style={styles.bgOrb1} aria-hidden />
        <div style={styles.bgOrb2} aria-hidden />

        <div className="container" style={styles.content}>
          <div className="hero-grid">
            <div className="hero-text-col">
              <span data-reveal className="section-label">
                Est. India's Premier
              </span>

              <h1 data-reveal style={styles.heading} className="hero-heading">
                <span className="desktop-heading">
                  <span style={styles.line1}>We Grow</span>
                  <br />
                  <span className="animate-shimmer" style={styles.lineGold}>
                    Beauty Academies
                  </span>
                  <br />
                  <span className="animate-shimmer" style={styles.lineGold}>Digitally</span>
                </span>

                <span className="mobile-heading">
                  <span className="mobile-heading-line">
                    <span style={styles.line1}>We Grow </span>
                    <span className="animate-shimmer" style={styles.lineGold}>
                      Beauty
                    </span>
                  </span>

                  <span className="mobile-heading-line">
                    <span className="animate-shimmer" style={styles.lineGold}>
                      Academies
                    </span>{" "}
                     <span className="animate-shimmer" style={styles.lineGold}>Digitally</span>
                  </span>
                </span>
              </h1>

              <p data-reveal style={styles.subtext}>
                Premium digital marketing, Meta ads, website development & lead
                generation for beauty academies, salons & makeup studios across
                India.
              </p>

              <div data-reveal style={styles.actions}>
                <a href="#projects"
  className="btn-primary"
  style={{ color: "#ffffff" }}
>
  View Our Work →
</a>

                <a href="tel:+917974718311"
  className="btn-outline"
  style={{ color: "#ffffff" }}
>
   +91 7974718311
</a>
              </div>

              <div data-reveal className="hero-stats">
                {[
                  { number: "20+", label: "Academies Served" },
                  { number: "100+", label: "Campaigns Created" },
                  { number: "8+", label: "Services Offered" },
                  { number: "∞", label: "Growth Delivered" },
                ].map((s) => (
                  <div key={s.label} style={styles.stat}>
                    <span style={styles.statNum}>{s.number}</span>
                    <span style={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="hero-img-col">
              {!imgError ? (
                <div className="hero-img-box">
                  <img
                    src="https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147596/home_yeljre.jpg"
                    alt="Vipprow Beauty Academy Digital Marketing"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="hero-img-fallback">
                  <span style={styles.fbIcon}>✦</span>

                  <p style={styles.fbTitle}>Apni Image Yahan Add Karein</p>

                  <p style={styles.fbDesc}>
                    Image file rename karke{" "}
                    <strong style={{ color: "var(--color-primary)" }}>
                      hero-image.png
                    </strong>{" "}
                    rakho aur{" "}
                    <strong style={{ color: "var(--color-primary)" }}>
                      /public/
                    </strong>{" "}
                    folder mein paste karo.
                  </p>

                  <p style={styles.fbFormats}>Supported: .jpg · .png · .webp</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.bottomFade} aria-hidden />
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--gradient-hero)",
    overflow: "hidden",
    paddingTop: "100px",
    paddingBottom: "5rem",
  },

  bgMesh: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(201,169,110,0.12) 0%, transparent 60%)",
    pointerEvents: "none",
  },

  bgOrb1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
    top: "-100px",
    right: "-150px",
    pointerEvents: "none",
  },

  bgOrb2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%)",
    bottom: "100px",
    left: "-100px",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 10,
    width: "100%",
  },

  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-hero)",
    fontWeight: "var(--fw-extrabold)",
    lineHeight: 1.05,
    margin: "1rem 0 1.5rem",
    letterSpacing: "-1px",
  },

  line1: {
    color: "var(--color-text)",
    fontStyle: "normal",
  },

  lineGold: {
    display: "inline-block",
    fontStyle: "normal",
  },

  line3: {
    color: "rgba(245,240,232,0.5)",
    fontStyle: "normal",
  },

  subtext: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-md)",
    color: "var(--color-text-muted)",
    lineHeight: 1.7,
    fontWeight: "var(--fw-light)",
    margin: "0 0 2.5rem",
  },

  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    margin: "0 0 2.5rem",
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },

  statNum: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-3xl)",
    fontWeight: "var(--fw-bold)",
    color: "var(--color-primary)",
    lineHeight: 1,
  },

  statLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-muted)",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  fbIcon: {
    fontSize: "2rem",
    color: "var(--color-primary)",
    opacity: 0.6,
  },

  fbTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-lg)",
    color: "var(--color-text)",
    fontStyle: "normal",
    margin: 0,
  },

  fbDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-muted)",
    lineHeight: 1.6,
    margin: 0,
  },

  fbFormats: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "rgba(168,152,128,0.5)",
    letterSpacing: "1px",
    margin: 0,
  },

  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "120px",
    background: "var(--gradient-overlay)",
    pointerEvents: "none",
  },
};