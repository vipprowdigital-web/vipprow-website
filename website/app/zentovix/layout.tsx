import type { Metadata } from "next";
import localFont from "next/font/local";
import "./zentovix.css";

// Self-hosted (app/fonts), so the production build never has to download fonts from Google
const outfit = localFont({
  src: "../fonts/outfit.woff2",
  weight: "100 900",
  variable: "--font-zx-display",
  display: "swap",
});

const figtree = localFont({
  src: "../fonts/figtree.woff2",
  weight: "300 900",
  variable: "--font-zx-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zentovix | Lead and admission management software for academies",
  description:
    "Track every lead, follow-up and fee, from first call to first class. Zentovix is lead and admission management software for coaching centres, tuition classes, language, music and dance academies.",
};

export default function ZentovixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${outfit.variable} ${figtree.variable}`}>{children}</div>;
}
