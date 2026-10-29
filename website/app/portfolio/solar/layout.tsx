import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./solar.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-solar-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-solar-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIPPROW × Solar Industry | Digital Growth Portfolio",
  description:
    "From digital presence to lead generation, VIPPROW helps solar businesses build a stronger online presence, reach the right audience, and create scalable customer acquisition systems.",
};

export default function SolarPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${sora.variable} ${manrope.variable}`}>{children}</div>;
}
