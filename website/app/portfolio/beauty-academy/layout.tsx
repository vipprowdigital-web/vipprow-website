import "./index.css";
import BeautyNavbar from "@/components/beauty-portfolio-components/Navbar";
import BeautyFooter from "@/components/beauty-portfolio-components/Footer";

export default function BeautyAcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BeautyNavbar />
      {children}
      <BeautyFooter />
    </>
  );
}
