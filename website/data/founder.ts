// TODO: Replace all placeholder content below with real details.
// Images go in /website/public/assets/images/team/ and are referenced as "/assets/images/team/<file>".
// Leave `image` empty to show an initials avatar.

export interface FounderData {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
  bio: string[];
  stats: { value: string; label: string }[];
  expertise: { title: string; description: string }[];
  accreditations: { title: string; issuer: string; year?: string }[];
}

export interface TeamMember {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
}

export const founder: FounderData = {
  name: "Founder Name",
  designation: "Founder & CEO, Vipprow",
  image: "",
  linkedin: "https://www.linkedin.com/in/your-profile",
  bio: [
    "Write a short introduction about the founder here: their background, what led them to start Vipprow, and the problem they set out to solve.",
    "Add a second paragraph about the founder's philosophy, leadership style, and vision for the company.",
  ],
  stats: [
    { value: "10+", label: "Years of Experience" },
    { value: "100+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
  ],
  expertise: [
    {
      title: "Digital Marketing",
      description: "Performance marketing, SEO and brand growth strategy.",
    },
    {
      title: "Business Automation",
      description: "Workflow automation and AI agents that remove manual work.",
    },
    {
      title: "Software Development",
      description: "Scalable web platforms and SaaS products.",
    },
    {
      title: "Growth Strategy",
      description: "Data-driven systems that turn marketing into revenue.",
    },
  ],
  accreditations: [
    { title: "Certification Name", issuer: "Issuing Organisation", year: "2024" },
    { title: "Certification Name", issuer: "Issuing Organisation", year: "2023" },
    { title: "Award or Recognition", issuer: "Awarding Body", year: "2022" },
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: "Team Member One",
    designation: "Designation",
    image: "",
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
  {
    name: "Team Member Two",
    designation: "Designation",
    image: "",
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
  {
    name: "Team Member Three",
    designation: "Designation",
    image: "",
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
  {
    name: "Team Member Four",
    designation: "Designation",
    image: "",
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
];
