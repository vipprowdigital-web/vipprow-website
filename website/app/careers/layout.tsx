import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIPPROW Careers | Join Our Team",
  description:
    "Explore career opportunities at VIPPROW. Discover current openings, learn about our team and culture, and find your next opportunity.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
