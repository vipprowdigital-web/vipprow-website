"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import { NavbarMenu } from "@/app/components/ui/Navbar";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const PortfolioFooter = dynamic(
  () => import("../../components/portfolio-components/Footer"),
  { ssr: false },
);
const PortfolioNavbar = dynamic(
  () => import("../../components/portfolio-components/Navbar"),
  { ssr: false },
);

const Footer = dynamic(() => import("@/app/components/ui/Footer"), {
  ssr: false,
});
const ChatWidget = dynamic(
  () => import("@/components/custom-ui/ChatWidget"),
  { ssr: false },
);
import AppConfigLoader from "@/providers/AppConfigLoader";
import { usePathname } from "next/navigation";

export default function ClinetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();

  const isBeautyAcademy = pathName.startsWith("/portfolio/beauty-academy");
  const isSolar = pathName.startsWith("/portfolio/solar");
  const isPortfolio = pathName.startsWith("/portfolio");
  const hasOwnChrome = isBeautyAcademy || isSolar;

  return (
    <>
      <ReduxProvider>
        <QueryProvider>
          <AppConfigLoader />
          {hasOwnChrome ? null : isPortfolio ? (
            <PortfolioNavbar />
          ) : (
            <NavbarMenu />
          )}

          {children}

          {hasOwnChrome ? null : isPortfolio ? (
            <PortfolioFooter />
          ) : (
            <Footer />
          )}
          <Toaster position="bottom-center" />

          {/* Vipprow's own AI assistant — kept off the white-labeled client
              portfolio demos, which run their own nav/footer branding. */}
          {hasOwnChrome || isPortfolio ? null : <ChatWidget />}
        </QueryProvider>
      </ReduxProvider>
    </>
  );
}
