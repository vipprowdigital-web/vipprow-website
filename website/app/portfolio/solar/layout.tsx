import type { Metadata } from "next";
import localFont from "next/font/local";
import "./solar.css";

// Self-hosted (app/fonts), so the production build never has to download fonts from Google
const sora = localFont({
  src: "../../fonts/sora.woff2",
  weight: "100 800",
  variable: "--font-solar-display",
  display: "swap",
});

const manrope = localFont({
  src: "../../fonts/manrope.woff2",
  weight: "200 800",
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
