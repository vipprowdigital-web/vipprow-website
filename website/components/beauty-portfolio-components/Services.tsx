"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaBullseye,
  FaGlobe,
  FaCrown,
  FaCalendarAlt,
  FaSearchLocation,
  FaVideo,
  FaRocket,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: FaInstagram,
    title: "Social Media Management",
    short: "Consistent, premium content for Instagram & Facebook.",
    points: [
      "Instagram & Facebook content planning",
      "Daily/weekly captions",
      "Reels ideas & scripts",
      "Student work promotion",
      "Festival & offer campaigns",
      "Hashtag strategy",
    ],
  },
  {
    id: 2,
    icon: FaBullseye,
    title: "Meta Ads for Admissions",
    short: "High-converting ad content that fills your academy.",
    points: [
      "Admission campaign captions",
      "Lead generation ad copy",
      "50% Off & Buy 1 Get 1 campaigns",
      "₹99 Trial Class campaigns",
      "UGC video ad scripts",
      "CTA-focused content",
    ],
  },
  {
    id: 3,
    icon: FaGlobe,
    title: "Website & Landing Pages",
    short: "Premium websites that build trust & generate enquiries.",
    points: [
      "Academy website development",
      "City-wise landing pages",
      "Lead form integration",
      "WhatsApp button",
      "Gallery & student portfolio",
      "Mobile-friendly design",
    ],
  },
  {
    id: 4,
    icon: FaCrown,
    title: "Branding & Positioning",
    short: "Make your academy look premium & professional.",
    points: [
      "Brand tone creation",
      "Instagram & Facebook bio",
      "Academy description",
      "Premium taglines",
      "Course descriptions",
      "Offer messaging",
    ],
  },
  {
    id: 5,
    icon: FaCalendarAlt,
    title: "Content Calendar Planning",
    short: "Stay consistent. Never run out of ideas.",
    points: [
      "Static post ideas",
      "Reel ideas",
      "Carousel ideas",
      "Course promotion content",
      "Transformation posts",
      "Awareness & educational posts",
    ],
  },
  {
    id: 6,
    icon: FaSearchLocation,
    title: "Google Business Profile",
    short: "Dominate local search. Get found by nearby students.",
    points: [
      "GMB description",
      "SEO-friendly content",
      "Review replies",
      "Google post captions",
      "Local keyword content",
      "Location-focused writing",
    ],
  },
  {
    id: 7,
    icon: FaVideo,
    title: "Reels & Video Scripts",
    short: "Viral-ready scripts that attract students.",
    points: [
      "UGC-style video scripts",
      "Promotional reel captions",
      "Student testimonial captions",
      "Course awareness reels",
      "Transformation video captions",
      "Trend-based content ideas",
    ],
  },
  {
    id: 8,
    icon: FaRocket,
    title: "Lead Generation Support",
    short: "More enquiries. More admissions. More revenue.",
    points: [
      "Lead ad content",
      "WhatsApp reply templates",
      "Enquiry message templates",
      "Follow-up messages",
      "Admission conversion copy",
      "Offer-based messaging",
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState<number>(1);
  const selected = services.find((s) => s.id === active)!;
  const SelectedIcon = selected.icon;

  return (
    <>
      <style>{`
        .services-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: start;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .services-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        @media (max-width: 900px) {
          .services-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 640px) {
          .services-list {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }

          .services-list-item {
            min-height: 125px !important;
            text-align: center !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 1rem 0.65rem !important;
            gap: 0.65rem !important;
          }

          .services-list-content {
            text-align: center !important;
          }

          .services-list-short {
            display: none !important;
          }

          .services-arrow {
            display: none !important;
          }

          .services-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section id="services" className="section" style={styles.section}>
        <div className="container">
          <div style={styles.header}>
            <span className="section-label">What We Do</span>
            <div className="gold-line-center" />

            <h2 style={styles.heading}>
              Complete Digital Growth
              <br />
              <em style={styles.headingItalic}>For Your Academy</em>
            </h2>
          </div>

          <div className="services-layout">
            <div className="services-list" style={styles.list}>
              {services.map((s) => {
                const Icon = s.icon;

                return (
                  <button
                    key={s.id}
                    className="services-list-item"
                    style={{
                      ...styles.listItem,
                      ...(active === s.id ? styles.listItemActive : {}),
                    }}
                    onClick={() => setActive(s.id)}
                  >
                    <span style={styles.listIcon}>
                      <Icon />
                    </span>

                    <div
                      className="services-list-content"
                      style={styles.listContent}
                    >
                      <span
                        style={{
                          ...styles.listTitle,
                          color:
                            active === s.id
                              ? "var(--color-primary)"
                              : "var(--color-text)",
                        }}
                      >
                        {s.title}
                      </span>

                      {active === s.id && (
                        <p className="services-list-short" style={styles.listShort}>
                          {s.short}
                        </p>
                      )}
                    </div>

                    <span className="services-arrow" style={styles.arrow}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={styles.detail} key={active}>
              <div style={styles.detailIcon}>
                <SelectedIcon />
              </div>

              <h3 style={styles.detailTitle}>{selected.title}</h3>

              <div className="gold-line-center" />

              <p style={styles.detailShort}>{selected.short}</p>

              <p style={styles.detailLabel}>Includes:</p>

              <ul
                className="services-detail-grid"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {selected.points.map((p) => (
                  <li key={p} style={styles.detailItem}>
                    <span style={styles.detailBullet}>✦</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+917974718311"
                className="btn-primary"
                style={styles.detailButton}
              >
                Enquire About This →
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
    background: "var(--color-secondary)",
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
    color: "var(--color-text)",
    lineHeight: 1.2,
    margin: "0",
    textAlign: "center",
    fontStyle: "normal",
  },

  headingItalic: {
    fontStyle: "normal",
    background: "var(--gradient-gold)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  list: {},

  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.875rem",
    padding: "0.875rem 1rem",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all 0.25s ease",
    width: "100%",
    margin: "0",
  },

  listItemActive: {
    background: "rgba(201,169,110,0.08)",
    border: "1px solid var(--color-border)",
  },

  listIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(201,169,110,0.08)",
    border: "1px solid rgba(201,169,110,0.2)",
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
    margin: "0",
  },

  listContent: {
    flex: 1,
    textAlign: "left",
    margin: "0",
  },

  listTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-medium)",
    display: "block",
    transition: "color 0.25s",
    margin: "0",
    lineHeight: 1.35,
  },

  listShort: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-muted)",
    margin: "0.25rem 0 0",
    lineHeight: 1.5,
  },

  arrow: {
    margin: "0 0 0 auto",
    color: "var(--color-primary)",
    fontSize: "1.1rem",
    transition: "opacity 0.25s",
    flexShrink: 0,
  },

  detail: {
    background: "var(--gradient-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    padding: "2.5rem",
    animation: "fadeInUp 0.4s ease",
    textAlign: "center",
  },

  detailIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "rgba(201,169,110,0.08)",
    border: "1px solid rgba(201,169,110,0.2)",
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    margin: "0 auto 1rem",
  },

  detailTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--fw-bold)",
    color: "var(--color-text)",
    margin: "0 0 0.75rem",
    textAlign: "center",
  },

  detailShort: {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-md)",
    color: "var(--color-text-muted)",
    lineHeight: 1.8,
    margin: "0 0 1.5rem",
    textAlign: "center",
  },

  detailLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    margin: "0 0 1rem",
    textAlign: "center",
  },

  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "0.5rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-text)",
    lineHeight: 1.4,
    textAlign: "center",
    margin: "0",
  },

  detailBullet: {
    color: "var(--color-primary)",
    fontSize: "0.6rem",
    flexShrink: 0,
    margin: "3px 0 0",
  },

  detailButton: {
    margin: "2rem auto 0",
    display: "inline-flex",
  },
};