import type { Metadata } from "next";
import FounderStory from "@/components/founder-components/FounderStory";

export const metadata: Metadata = {
  title: "Reva Prasad Tiwari (Vipin), Founder | VIPPROW",
  description:
    "Building business growth through marketing, technology & innovation. Meet Reva Prasad Tiwari (Vipin), founder of VIPPROW.",
};

export default function FounderPage() {
  return <FounderStory />;
}
