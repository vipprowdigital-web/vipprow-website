import type { Metadata } from "next";
import CroissixPage from "@/components/croissix-components/CroissixPage";

export const metadata: Metadata = {
  title: "Croissix AI | AI-Powered Local Marketing Automation Tool",
  description:
    "Dominate Google Business Profile with AI. Automate reviews, posts, photos, and analytics, so you can focus on running your business, not marketing it.",
};

export default function Page() {
  return <CroissixPage />;
}
