import type { Metadata } from "next";
import { Outfit, Figtree } from "next/font/google";
import "./zentovix.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-zx-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
