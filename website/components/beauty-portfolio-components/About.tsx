"use client";

import { FaPaintBrush, FaChartLine, FaCrown } from "react-icons/fa";

export default function About() {
  const pillars = [
    {
      icon: FaPaintBrush,
      title: "Beauty Specialists",
      desc: "We exclusively work with beauty brands. No generic agency, no learning curve — pure beauty marketing expertise from day one.",
    },
    {
      icon: FaChartLine,
      title: "Results Driven",
      desc: "Every strategy is designed for one goal: more admissions, more enquiries, more brand authority.",
    },
    {
      icon: FaCrown,
      title: "Premium Quality",
      desc: "From content to campaigns — our work reflects the luxury and professionalism your academy deserves.",
    },
  ];

  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }

        @media (max-width: 640px) {
          .about-left {
            text-align: center !important;
          }

          .about-left .section-label {
            display: block;
            text-align: center !important;
          }

          .about-left h2 {
            text-align: center !important;
          }

          .about-left p {
            text-align: center !important;
          }

          .about-tags {
            justify-content: center !important;
          }
        }
      `}</style>

      <section id="about" className="section" style={styles.section}>
        <div className="container">
          <div className="about-grid">
            {/* Left */}
            <div className="about-left">
              <span className="section-label">About Vipprow</span>
              <div className="gold-line" />

              <h2 style={styles.heading}>
                India's Beauty Academy
                <br />
                Marketing Experts
              </h2>

              <p style={styles.para}>
                Vipprow is a digital marketing and website development agency
                exclusively specialized in Beauty Academy, Salon, Makeup Studio
                and Training Institute Marketing.
              </p>

              <p style={styles.para}>
                We help beauty brands build a premium image, attract quality
                students, generate leads and increase admissions through
                result-focused digital strategies.
              </p>

              <div className="about-tags" style={styles.tags}>
                {[
                  "Meta Ads",
                  "Social Media",
                  "Website Dev",
                  "Lead Gen",
                  "Branding",
                  "Google SEO",
                ].map((t) => (
                  <span key={t} style={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={styles.right}>
              {pillars.map((p) => {
                const Icon = p.icon;

                return (
                  <div key={p.title} className="card" style={styles.card}>
                    <span style={styles.cardIcon}>
                      <Icon />
                    </span>

                    <h3 style={styles.cardTitle}>{p.title}</h3>
                    <p style={styles.cardDesc}>{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--color-secondary)",
  },

  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-4xl)",
    fontWeight: "var(--fw-bold)",
    fontStyle: "normal",
    lineHeight: 1.2,
    color: "var(--color-text)",
    marginBottom: "1.5rem",
  },

  para: {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-md)",
    color: "var(--color-text-muted)",
    lineHeight: 1.8,
    marginBottom: "1rem",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "1.5rem",
  },

  tag: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-medium)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "0.4rem 1rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-full)",
    color: "var(--color-primary)",
    background: "rgba(201,169,110,0.08)",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },

  card: {
    padding: "1.75rem",
    textAlign: "center",
  },

  cardIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(201,169,110,0.1)",
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    margin: "0 auto 0.9rem",
    border: "1px solid rgba(201,169,110,0.22)",
  },

  cardTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--fw-semibold)",
    color: "var(--color-text)",
    marginBottom: "0.5rem",
    textAlign: "center",
  },

  cardDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-muted)",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "center",
  },
};