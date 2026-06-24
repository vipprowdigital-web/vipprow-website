"use client";
import { useState } from "react";

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
      "Coming Soon Campaigns",
    ],
    color: "#C9A96E",
    instagram: "https://www.instagram.com/bellezadehradun/",
  },
  {
    id: 2,
    name: "Gaura Makeup Studio & Academy",
    location: "Dehradun",
    tagline: "Professional Makeup & Beauty Training",
    badge: "Studio + Academy",
    work: [
      "Promotional Ad Copy",
      "Meta Ads Captions",
      "Course Offer Content",
      "Brand Positioning",
      "Lead Generation Messaging",
      "Portfolio Content",
    ],
    color: "#FF6B9D",
    instagram: "https://www.instagram.com/gauramakeupstudio/",
  },
  {
    id: 3,
    name: "The Big Tree Beauty Academy",
    location: "Dehradun",
    tagline: "Where Artistry Meets International Luxury",
    badge: "Premium",
    work: [
      "Brand Positioning",
      "Social Media Captions",
      "Meta Ad Captions",
      "Advanced Content Calendar",
      "Student Work Promotion",
      "Course Promotion",
    ],
    color: "#9B8EC4",
    instagram: " https://www.instagram.com/thebigtreebeautyacademy",
  },
  {
    id: 4,
    name: "TipSalon",
    location: "Jaipur",
    tagline: "Luxury Salon & Premium Services",
    badge: "Luxury",
    work: [
      "Instagram & Facebook Bio",
      "Social Media Captions",
      "Luxury Service Promotion",
      "Meta Ad Captions",
      "Video Ad Transcripts",
      "Premium Brand Messaging",
    ],
    color: "#E8C4A2",
    instagram: "https://www.instagram.com/tipsalon__/",
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
    color: "#A8D8B9",
    instagram: "https://www.instagram.com/allure_makeup.studio/",
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
      "Student Testimonial Posts",
      "Reels Captions",
    ],
    color: "#6EC4C9",
    instagram: "https://www.instagram.com/uk_londonbeautyschoolrudrapur/",
  },
];

// Instagram SVG Icon
const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
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
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }

          .project-card-top {
            justify-content: center !important;
            gap: 0.75rem !important;
          }

          .insta-btn span {
            display: none;
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

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="card"
                style={{
                  ...styles.card,
                  borderColor:
                    activeId === project.id ? project.color + "66" : undefined,
                }}
                onMouseEnter={() => setActiveId(project.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Top row: badge + number */}
                <div className="project-card-top" style={styles.cardTop}>
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

                  <span style={styles.number}>
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>

                <h3 style={styles.projectName}>{project.name}</h3>

                <p style={styles.location}>📍 {project.location}</p>

                <p style={styles.tagline}>&ldquo;{project.tagline}&rdquo;</p>

                <div style={styles.divider} />

                <p style={styles.workLabel}>Work Done:</p>

                <div style={styles.workTags}>
                  {project.work.map((item) => (
                    <span key={item} style={styles.workTag}>
                      {item}
                    </span>
                  ))}
                </div>

                {/* Instagram Link */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a
                    href={project.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="insta-btn"
                    style={{ color: project.color, borderColor: project.color + "44" }}
                  >
                    <InstagramIcon />
                    <span>View on Instagram</span>
                  </a>
                </div>
              </div>
            ))}
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
    margin: "0 auto 4rem",
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
    position: "relative",
    textAlign: "center",
  },

  cardTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    margin: "0 0 1.25rem",
  },

  badge: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "0.3rem 0.85rem",
    borderRadius: "var(--radius-full)",
  },

  number: {
    fontFamily: "var(--font-accent)",
    fontSize: "var(--text-2xl)",
    color: "rgba(201,169,110,0.15)",
    fontWeight: "var(--fw-bold)",
    lineHeight: 1,
  },

  projectName: {
    fontFamily: "var(--font-heading)",
    fontSize: "var(--text-xl)",
    fontWeight: "var(--fw-semibold)",
    color: "var(--color-text)",
    margin: "0 0 0.4rem",
    lineHeight: 1.3,
    textAlign: "center",
  },

  location: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-muted)",
    margin: "0 0 0.75rem",
    textAlign: "center",
  },

  tagline: {
    fontFamily: "var(--font-body)",
    fontStyle: "normal",
    fontSize: "var(--text-base)",
    color: "var(--color-primary)",
    margin: 0,
    textAlign: "center",
  },

  divider: {
    height: "1px",
    background: "var(--color-border)",
    margin: "1.25rem 0",
  },

  workLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--color-text-muted)",
    margin: "0 0 0.75rem",
    textAlign: "center",
  },

  workTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
    marginBottom: "0.25rem",
  },

  workTag: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-muted)",
    padding: "0.25rem 0.7rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "var(--radius-sm)",
    textAlign: "center",
  },
};






// "use client";
// import { useState } from "react";

// const projects = [
//   {
//     id: 1,
//     name: "Belleza Beauty School",
//     location: "Dehradun • Haldwani • Rudrapur • Bazpur • Pune",
//     tagline: "International-Standard Beauty Academy",
//     badge: "Multi-City",
//     work: [
//       "Social Media Management",
//       "Meta Ads Campaigns",
//       "Landing Page Content",
//       "Google Business Profile",
//       "Reels Captions",
//       "Admission Campaigns",
//       "Coming Soon Campaigns",
//     ],
//     color: "#C9A96E",
//   },
//   // {
//   //   id: 2,
//   //   name: "Gaura Makeup Studio & Academy",
//   //   location: "Dehradun",
//   //   tagline: "Professional Makeup & Beauty Training",
//   //   badge: "Studio + Academy",
//   //   work: [
//   //     "Promotional Ad Copy",
//   //     "Meta Ads Captions",
//   //     "Course Offer Content",
//   //     "Brand Positioning",
//   //     "Lead Generation Messaging",
//   //     "Portfolio Content",
//   //   ],
//   //   color: "#FF6B9D",
//   // },
//   // {
//   //   id: 3,
//   //   name: "The Big Tree Beauty Academy",
//   //   location: "Dehradun",
//   //   tagline: "Where Artistry Meets International Luxury",
//   //   badge: "Premium",
//   //   work: [
//   //     "Brand Positioning",
//   //     "Social Media Captions",
//   //     "Meta Ad Captions",
//   //     "Advanced Content Calendar",
//   //     "Student Work Promotion",
//   //     "Course Promotion",
//   //   ],
//   //   color: "#9B8EC4",
//   // },
//   {
//     id: 4,
//     name: "TipSalon",
//     location: "Jaipur",
//     tagline: "Luxury Salon & Premium Services",
//     badge: "Luxury",
//     work: [
//       "Instagram & Facebook Bio",
//       "Social Media Captions",
//       "Luxury Service Promotion",
//       "Meta Ad Captions",
//       "Video Ad Transcripts",
//       "Premium Brand Messaging",
//     ],
//     color: "#E8C4A2",
//   },
//   {
//     id: 5,
//     name: "Allure Makeup Studio",
//     location: "Dehradun",
//     tagline: "Makeup, Beauty & Workshop Promotions",
//     badge: "Studio",
//     work: [
//       "Google Business Reviews",
//       "Social Media Captions",
//       "Workshop Promotion",
//       "Skin Prep Content",
//       "Local SEO Replies",
//     ],
//     color: "#A8D8B9",
//   },
// ];

// export default function Projects() {
//   const [activeId, setActiveId] = useState<number | null>(null);

//   return (
//     <>
//       <style>{`
//         .projects-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1.5rem;
//         }

//         @media (max-width: 1024px) {
//           .projects-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//           }
//         }

//         @media (max-width: 640px) {
//           .projects-grid {
//             grid-template-columns: 1fr !important;
//           }

//           .project-card-top {
//             justify-content: center !important;
//             gap: 0.75rem !important;
//           }
//         }
//       `}</style>

//       <section id="projects" className="section" style={styles.section}>
//         <div className="container">
//           <div style={styles.header}>
//             <span className="section-label">Our Work</span>
//             <div className="gold-line-center" />

//             <h2 style={styles.heading}>
//               Beauty Academies We've{" "}
//               <em style={styles.headingItalic}>Transformed</em>
//             </h2>

//             <p style={styles.subtext}>
//               Real projects. Real results. A proven track record across multiple
//               cities.
//             </p>
//           </div>

//           <div className="projects-grid">
//             {projects.map((project) => (
//               <div
//                 key={project.id}
//                 className="card"
//                 style={{
//                   ...styles.card,
//                   borderColor:
//                     activeId === project.id ? project.color + "66" : undefined,
//                 }}
//                 onMouseEnter={() => setActiveId(project.id)}
//                 onMouseLeave={() => setActiveId(null)}
//               >
//                 <div className="project-card-top" style={styles.cardTop}>
//                   <span
//                     style={{
//                       ...styles.badge,
//                       background: project.color + "22",
//                       color: project.color,
//                       border: `1px solid ${project.color}44`,
//                     }}
//                   >
//                     {project.badge}
//                   </span>

//                   <span style={styles.number}>0{project.id}</span>
//                 </div>

//                 <h3 style={styles.projectName}>{project.name}</h3>

//                 <p style={styles.location}>📍 {project.location}</p>

//                 <p style={styles.tagline}>"{project.tagline}"</p>

//                 <div style={styles.divider} />

//                 <p style={styles.workLabel}>Work Done:</p>

//                 <div style={styles.workTags}>
//                   {project.work.map((item) => (
//                     <span key={item} style={styles.workTag}>
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   section: {
//     background:
//       "linear-gradient(180deg, var(--color-secondary) 0%, var(--color-secondary-light) 50%, var(--color-secondary) 100%)",
//   },

//   header: {
//     textAlign: "center",
//     maxWidth: "600px",
//     margin: "0 auto 4rem",
//   },

//   heading: {
//     fontFamily: "var(--font-heading)",
//     fontSize: "var(--text-4xl)",
//     fontWeight: "var(--fw-bold)",
//     color: "var(--color-text)",
//     lineHeight: 1.2,
//     margin: "0 0 1rem",
//     fontStyle: "normal",
//   },

//   headingItalic: {
//     fontStyle: "normal",
//     background: "var(--gradient-gold)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text",
//   },

//   subtext: {
//     fontFamily: "var(--font-sans)",
//     fontSize: "var(--text-base)",
//     color: "var(--color-text-muted)",
//     margin: 0,
//   },

//   card: {
//     cursor: "default",
//     position: "relative",
//     textAlign: "center",
//   },

//   cardTop: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "0.75rem",
//     margin: "0 0 1.25rem",
//   },

//   badge: {
//     fontFamily: "var(--font-sans)",
//     fontSize: "var(--text-xs)",
//     fontWeight: "var(--fw-semibold)",
//     letterSpacing: "1px",
//     textTransform: "uppercase",
//     padding: "0.3rem 0.85rem",
//     borderRadius: "var(--radius-full)",
//   },

//   number: {
//     fontFamily: "var(--font-accent)",
//     fontSize: "var(--text-2xl)",
//     color: "rgba(201,169,110,0.15)",
//     fontWeight: "var(--fw-bold)",
//     lineHeight: 1,
//   },

//   projectName: {
//     fontFamily: "var(--font-heading)",
//     fontSize: "var(--text-xl)",
//     fontWeight: "var(--fw-semibold)",
//     color: "var(--color-text)",
//     margin: "0 0 0.4rem",
//     lineHeight: 1.3,
//     textAlign: "center",
//   },

//   location: {
//     fontFamily: "var(--font-sans)",
//     fontSize: "var(--text-xs)",
//     color: "var(--color-text-muted)",
//     margin: "0 0 0.75rem",
//     textAlign: "center",
//   },

//   tagline: {
//     fontFamily: "var(--font-body)",
//     fontStyle: "normal",
//     fontSize: "var(--text-base)",
//     color: "var(--color-primary)",
//     margin: 0,
//     textAlign: "center",
//   },

//   divider: {
//     height: "1px",
//     background: "var(--color-border)",
//     margin: "1.25rem 0",
//   },

//   workLabel: {
//     fontFamily: "var(--font-sans)",
//     fontSize: "var(--text-xs)",
//     fontWeight: "var(--fw-semibold)",
//     letterSpacing: "2px",
//     textTransform: "uppercase",
//     color: "var(--color-text-muted)",
//     margin: "0 0 0.75rem",
//     textAlign: "center",
//   },

//   workTags: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "0.5rem",
//     justifyContent: "center",
//   },

//   workTag: {
//     fontFamily: "var(--font-sans)",
//     fontSize: "var(--text-xs)",
//     color: "var(--color-text-muted)",
//     padding: "0.25rem 0.7rem",
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: "var(--radius-sm)",
//     textAlign: "center",
//   },
// };