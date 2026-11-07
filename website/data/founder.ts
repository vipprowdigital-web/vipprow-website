// Content for the /founder page (source: VIPPROW Founder Profile, Reva Prasad Tiwari).
// Edit the text here; the page reads everything from this file.

export interface FounderStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface JourneyStep {
  year: string;
  title: string;
  text: string;
}

export const founder = {
  name: "Reva Prasad Tiwari (Vipin)",
  nameLines: ["Reva Prasad", "Tiwari"],
  photo: "/assets/images/team/founder.png",
  role: "Founder, VIPPROW",
  tagline: "Building business growth through marketing, technology & innovation.",
  intro: [
    "With nearly a decade of experience in the digital industry, Reva Prasad Tiwari (Vipin) has worked across digital marketing, performance advertising, software development, and business automation. His professional journey began in 2016, collaborating with brands and businesses across multiple industries and helping them strengthen their digital presence and achieve measurable growth.",
    "In 2025, he founded VIPPROW with a clear vision: to bring marketing, technology, and automation together under one growth-focused ecosystem. Drawing on his industry experience, he and the VIPPROW team work with brands to build stronger digital foundations, reach the right audiences, improve business processes, and scale with purpose.",
  ],
  statsHeading: "Career at a Glance",
  stats: [
    { value: 60, prefix: "₹", suffix: "Cr+", label: "Ad spend managed" },
    { value: 90, prefix: "₹", suffix: "Cr+", label: "Combined client revenue generated, as reported by clients" },
    { value: 50, suffix: "+", label: "Brands & businesses" },
    { value: 10, suffix: " Years", label: "Industry experience" },
  ] as FounderStat[],
  statsNote:
    "The figures above represent cumulative work across different client engagements over his career. Client revenue is a combined figure based on what the clients have told us, and is not a guarantee of future results.",
  expertiseHeading: "Areas of Expertise",
  expertise: [
    {
      title: "Digital Marketing & Performance Advertising",
      description:
        "Campaign strategy, Meta Ads, Google Ads, lead generation, customer acquisition, and performance optimization.",
    },
    {
      title: "Software Development & Digital Solutions",
      description:
        "Websites, software solutions, and digital systems designed to address practical business needs.",
    },
    {
      title: "Business Automation",
      description:
        "Workflow automation, process improvement, and connected systems that help businesses operate more efficiently.",
    },
    {
      title: "Business Growth Strategy",
      description:
        "Brand positioning, digital presence, customer acquisition, and structured plans for sustainable growth.",
    },
  ],
  journeyHeading: "The Journey",
  journey: [
    {
      year: "2016",
      title: "The Beginning",
      text: "Started his professional journey in digital marketing, developing experience in online advertising, brand promotion, and digital growth.",
    },
    {
      year: "2016–2024",
      title: "Building Experience",
      text: "Worked with multiple brands and businesses, managed advertising spend exceeding ₹60Cr, and contributed to combined client revenue generation of over ₹90Cr, as reported by the clients.",
    },
    {
      year: "2025",
      title: "VIPPROW Founded",
      text: "Established VIPPROW to combine digital marketing, software development, and business automation into an integrated business-growth offering.",
    },
    {
      year: "Today",
      title: "Growing with Brands",
      text: "Applying this experience while working with 50+ brands and businesses through VIPPROW's growth solutions.",
    },
  ] as JourneyStep[],
  visionHeading: "The Vision Behind VIPPROW",
  vision:
    "I believe every business deserves more than just an online presence. It deserves a connected digital ecosystem that attracts customers, builds trust, streamlines operations, and supports sustainable growth. With VIPPROW, my vision is to bridge the gap between marketing and technology, helping businesses turn their goals into measurable progress.",
  visionBy: "Reva Prasad Tiwari (Vipin) | Founder, VIPPROW",
  cta: {
    heading: "LET'S BUILD SOMETHING THAT GROWS.",
    text: "From brand building and performance campaigns to software solutions and business automation, VIPPROW helps businesses move forward with strategy and technology.",
    footer: "VIPPROW • Marketing | Technology | Automation",
  },
};
