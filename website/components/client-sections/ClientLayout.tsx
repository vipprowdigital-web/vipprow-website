// website\components\client-sections\ClientLayout.tsx

"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import AppConfigLoader from "@/providers/AppConfigLoader";
import { NavbarMenu } from "@/app/components/ui/Navbar";
// import Footer from "@/app/components/ui/Footer";
import { Toaster } from "react-hot-toast";
import Footer from "@/app/components/ui/Footer";

export default function ClinetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ReduxProvider>
        <QueryProvider>
          <AppConfigLoader />
          <NavbarMenu />
          {children}
          <Footer />
          <Toaster position="bottom-center" />
        </QueryProvider>
      </ReduxProvider>
    </>
  );
}
