import { Playfair_Display, Cormorant_Garamond, Cinzel, DM_Sans } from "next/font/google";
import "./index.css";
import BeautyNavbar from "@/components/beauty-portfolio-components/Navbar";
import BeautyFooter from "@/components/beauty-portfolio-components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-beauty-heading",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-beauty-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-beauty-accent",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-beauty-sans",
  display: "swap",
});

export default function BeautyAcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [
    playfair.variable,
    cormorant.variable,
    cinzel.variable,
    dmSans.variable,
  ].join(" ");

  return (
    <div className={fontVars}>
      <BeautyNavbar />
      {children}
      <BeautyFooter />
    </div>
  );
}
