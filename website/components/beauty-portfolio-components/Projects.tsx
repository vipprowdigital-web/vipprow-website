"use client";
import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: 1,
    name: "Belleza Beauty School",
    location: "Dehradun • Haldwani • Rudrapur • Bazpur • Pune",
    tagline: "International-Standard Beauty Academy",
    badge: "Multi-City",
    work: [
      "Social Media Management",
      "Meta Ads Campaigns",
      "Landing Page Content",
      "Google Business Profile",
      "Reels Captions",
      "Admission Campaigns",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/bellezadehradun/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147627/belleza_logo_mobile_f3rypj.jpg", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 2,
    name: "Gaura Makeup Studio & Academy",
    location: "Dehradun",
    tagline: "Professional Makeup & Beauty Training",
    badge: "Studio + Academy",
    work: [
      "Meta Ads Captions",
      "Course Offer Content",
      "Brand Positioning",
      "Lead Generation Messaging",
      "Portfolio Content",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/gauramakeupacademy_",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147657/GAURA_tzjcdd.png", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 3,
    name: "The Big Tree Beauty Academy",
    location: "Dehradun",
    tagline: "Where Artistry Meets International Luxury",
    badge: "Premium",
    work: [
      "Brand Positioning",
      "Meta Ad Captions",
      "Advanced Content Calendar",
      "Student Work Promotion",
      "Course Promotion",
    ],
    color: "#5B21B6",
    instagram: " https://www.instagram.com/thebigtreebeautyacademy",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147636/big_tree_logo_bxhlaz.png", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 4,
    name: "TipSalon",
    location: "Jaipur",
    tagline: "Luxury Salon & Premium Services",
    badge: "Luxury",
    work: [
      "Social Media Captions",
      "Luxury Service Promotion",
      "Meta Ad Captions",
      "Video Ad Transcripts",
      "Premium Brand Messaging",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/tipsalon__/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147981/Logo_1_kauuqo.jpg", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 5,
    name: "Allure Makeup Studio",
    location: "Dehradun",
    tagline: "Makeup, Beauty & Workshop Promotions",
    badge: "Studio",
    work: [
      "Google Business Reviews",
      "Social Media Captions",
      "Workshop Promotion",
      "Skin Prep Content",
      "Local SEO Replies",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/allure_makeup.studio/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147668/allure_v3utoe.jpg", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 6,
    name: "U.K. International Academy",
    location: "Dehradun • Haridwar • Rishikesh",
    tagline: "3 Branches, One Standard of Excellence",
    badge: "Multi-Branch",
    work: [
      "Brand Identity Content",
      "Social Media Management",
      "Meta Ads Campaigns",
      "Course Launch Promotions",
      "Reels Captions",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/uk_londonbeautyschoolrudrapur/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147646/london-beuaty-school.jpg_mawryu.png", // 👈 apni logo image ka path yahan daalein
  },

  {
    id: 7,
    name: "Athenian Salon & Academy",
    location: "Bangalore",
    tagline: "Standard of Excellence",
    badge: "Multi-Branch",
    work: [
      "Brand Identity Content",
      "Social Media Management",
      "Meta Ads Campaigns",
      "Course Launch Promotions",
      "Reels Captions",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/uk_londonbeautyschoolrudrapur/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147620/Athenian_LOGO_lrqeka.jpg", // 👈 apni logo image ka path yahan daalein
  },
  {
    id: 8,
    name: "A Square Makeup Academy",
    location: "Hyderabad, Telangana",
    tagline: "International Standard Luxury Makeup Academy",
    badge: "Beauty Education Brand",
    work: [
      "Brand Identity Design",
      "Social Media Management",
      "Meta Ads Campaigns",
      "Course Launch Promotions",
      "Creative Reels & Video Marketing",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/asquaremakeupacademy/#",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147612/A_SQURE_LOGO_nhum0v.png",
  },

  {
    id: 8,
    name: "Tempus Academy",
    location: "Sector 74, Noida",
    tagline: "Shaping Future Beauty Professionals",
    badge: "Standard of Excellence",
    work: [
      "Brand Identity Content",
      "Professional Makeup Academy Branding",
      "Social Media Management",
      "Meta Ads Campaigns",
      "Admissions Campaigns",
    ],
    color: "#5B21B6",
    instagram: "https://www.instagram.com/academytempus/",
    logo: "https://res.cloudinary.com/dl6fjer3y/image/upload/v1785147603/tempus_old_logo_h0qyue.jpg",
  },
];

// Instagram SVG Icon
const InstagramIcon = () => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", flexShrink: 0 }}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: direction === "left" ? "rotate(180deg)" : "none",
      display: "block",
    }}
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Generates a 2-letter initials badge from the academy name
// (works for multi-word names and single CamelCase names like "TipSalon")
function getInitials(name: string) {
  const clean = name.replace(/[^a-zA-Z\s]/g, "");
  const words = clean.split(/\s+|(?=[A-Z])/).filter(Boolean);
  const first = words[0]?.[0] || "";
  const second = words[1]?.[0] || words[0]?.[1] || "";
  return (first + second).toUpperCase();
}

export default function Projects() {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [index, setIndex] = useState(0);

  // Responsive slides-per-view
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else setSlidesPerView(2);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxIndex = Math.max(0, projects.length - slidesPerView);
  const isMobile = slidesPerView === 1;

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const slideWidthPercent = 100 / slidesPerView;

  return (
    <>
      <style>{`
        .slider-viewport {
          overflow: hidden;
          margin: 0 -0.75rem;
        }

        .slider-track {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
          align-items: stretch;
        }

        .slider-slide {
          padding: 0 0.75rem;
          box-sizing: border-box;
        }

       .project-card {
  display: flex;
  align-items: stretch;
  height: 320px;      /* fixed height — "100%" ki jagah, isse control milega */
  min-height: 0;
  overflow: hidden;
  padding: 0 !important;
}
        @media (max-width: 640px) {
          .project-card {
            flex-direction: column;
            height: auto;
            min-height: 0;
            border-radius: 18px;
          }
        }

        .insta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.55);
          transition: all 0.22s ease;
          cursor: pointer;
          margin-top: 1rem;
        }

        .insta-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.9);
          transform: translateY(-1px);
        }

        .insta-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          flex-shrink: 0;
          transition: all 0.22s ease;
        }

        .insta-btn-icon:hover {
          transform: translateY(-1px) scale(1.05);
        }

        .slider-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text);
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .slider-arrow:hover:not(:disabled) {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        .slider-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .slider-arrow {
            width: 40px;
            height: 40px;
          }
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .slider-dot.active {
          width: 24px;
          background: var(--color-primary);
        }
      `}</style>

      <section id="projects" className="section" style={styles.section}>
        <div className="container">
          <div style={styles.header}>
            <span className="section-label">Our Work</span>
            <div className="gold-line-center" />

            <h2 style={styles.heading}>
              Beauty Academies We&apos;ve{" "}
              <em style={styles.headingItalic}>Transformed</em>
            </h2>

            <p style={styles.subtext}>
              Real projects. Real results. A proven track record across multiple
              cities.
            </p>
          </div>

          <div className="slider-viewport">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${index * slideWidthPercent}%)`,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="slider-slide"
                  style={{ flex: `0 0 ${slideWidthPercent}%` }}
                >
                  <div
                    className="card project-card"
                    style={{
                      ...styles.card,
                      minHeight: isMobile ? "auto" : "100%",
                    }}
                  >
                    {/* Left: Image / Logo Panel */}
                    <div
                      className="project-image-panel"
                      style={{
                        ...styles.imagePanel,
                        width: isMobile ? "100%" : "50%",
                        height: isMobile ? "150px" : "auto",
                        background: project.logo
                          ? "transparent"
                          : `linear-gradient(160deg, ${project.color}, ${project.color}55)`,
                      }}
                    >
                      {project.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          style={styles.logoImage}
                        />
                      ) : (
                        <span style={styles.imageInitials}>
                          {getInitials(project.name)}
                        </span>
                      )}
                    </div>

                    {/* Right: Content */}
                    <div
                      style={{
                        ...styles.contentPanel,
                        width: isMobile ? "100%" : "50%",
                        padding: isMobile
                          ? "1.1rem 1.25rem 1.4rem"
                          : "1rem 1.1rem",
                      }}
                    >
                      <div style={styles.cardTop}>
                        <span
                          style={{
                            ...styles.badge,
                            background: project.color + "22",
                            color: project.color,
                            border: `1px solid ${project.color}44`,
                          }}
                        >
                          {project.badge}
                        </span>

                        <a
                          href={project.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="insta-btn-icon"
                          style={{
                            color: project.color,
                            borderColor: project.color + "44",
                          }}
                          aria-label="View on Instagram"
                        >
                          <InstagramIcon />
                        </a>
                      </div>

                      <h3
                        style={{
                          ...styles.projectName,
                          fontSize: isMobile
                            ? "var(--text-lg)"
                            : "var(--text-md)",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        style={{
                          ...styles.location,
                          whiteSpace: isMobile ? "normal" : "nowrap",
                        }}
                      >
                        {project.location}
                      </p>

                      <div
                        style={{
                          ...styles.workTags,
                          marginTop: isMobile ? "0.9rem" : "auto",
                        }}
                      >
                        {project.work.slice(0, 5).map((item) => (
                          <span key={item} style={styles.workTag}>
                            {item}
                          </span>
                        ))}
                        {project.work.length > 3 && (
                          <span
                            style={{
                              ...styles.workTag,
                              color: project.color,
                              borderColor: project.color + "33",
                            }}
                          >
                            +{project.work.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div style={styles.controls}>
            <button
              className="slider-arrow"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous"
            >
              <ArrowIcon direction="left" />
            </button>

            <div style={styles.dots}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot${i === index ? " active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="slider-arrow"
              onClick={goNext}
              disabled={index === maxIndex}
              aria-label="Next"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background:
      "linear-gradient(180deg, var(--color-secondary) 0%, var(--color-secondary-light) 50%, var(--color-secondary) 100%)",
  },

  header: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto 3.5rem",
  },

  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-4xl)",
    fontWeight: "var(--fw-bold)",
    color: "var(--color-text)",
    lineHeight: 1.2,
    margin: "0 0 1rem",
    fontStyle: "normal",
  },

  headingItalic: {
    fontStyle: "normal",
    background: "var(--gradient-gold)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  subtext: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-text-muted)",
    margin: 0,
  },

  card: {
    cursor: "default",
    minHeight: "100%",
  },

  imagePanel: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: "100%", // "auto" ki jagah — ab parent card ki fixed height follow karega
  },

  imageInitials: {
    fontFamily: "var(--font-accent)",
    fontSize: "var(--text-xl)",
    fontWeight: "var(--fw-bold)",
    color: "var(--color-white)",
    letterSpacing: "1px",
  },

  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "0.9rem 2.5rem",
  },

  contentPanel: {
    width: "50%",
    flex: "1 1 50%",
    padding: "0.65rem 0.85rem",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 0 0.3rem",
  },

  badge: {
    fontFamily: "var(--font-sans)",
    fontSize: "10px",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    padding: "0.2rem 0.6rem",
    borderRadius: "var(--radius-full)",
  },

  projectName: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-md)",
    fontWeight: "var(--fw-semibold)",
    color: "var(--color-text)",
    margin: "0 0 0.15rem", // pehle "0 0 0.2rem" tha
    lineHeight: 1.15,
    textAlign: "left",
  },

  location: {
    fontFamily: "var(--font-sans)",
    fontSize: "11px",
    color: "var(--color-text-muted)",
    margin: "0 0 0.35rem",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  workTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    justifyContent: "flex-start",
    marginTop: "0.6rem",
  },

  workTag: {
    fontFamily: "var(--font-sans)",
    fontSize: "13px", // pehle "10px" tha
    color: "var(--color-text-muted)",
     padding: "0.2rem 0.35rem", // pehle "0.2rem 0.55rem" tha
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "var(--radius-sm)",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    marginTop: "2.5rem",
  },

  dots: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};
