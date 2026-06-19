// website\components\client-sections\ClientLayout.tsx

"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import { NavbarMenu } from "@/app/components/ui/Navbar";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import PortfolioFooter from "../../components/portfolio-components/Footer";
import PortfolioNavbar from "../../components/portfolio-components/Navbar";

const Footer = dynamic(() => import("@/app/components/ui/Footer"), {
  ssr: false,
});
import AppConfigLoader from "@/providers/AppConfigLoader";
import { usePathname } from "next/navigation";

export default function ClinetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  return (
    <>
      <ReduxProvider>
        <QueryProvider>
          <AppConfigLoader />
          {pathName.includes("portfolio") ? (
            <PortfolioNavbar />
          ) : (
            <NavbarMenu />
          )}

          {children}
          {pathName.includes("portfolio") ? <PortfolioFooter /> : <Footer />}
          <Toaster position="bottom-center" />
        </QueryProvider>
      </ReduxProvider>
    </>
  );
}
