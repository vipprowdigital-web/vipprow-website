import dynamic from "next/dynamic";
import { Metadata } from "next";

// Static — above the fold; these contain the LCP element and must not be deferred
import HeroSection from "./components/ui/HeroSection";
import ClientPartnerBrandMarquee from "@/components/client-sections/ClientPartnerBrandMarquee";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

import ClientServiceCardGrid from "@/components/client-sections/ClientServiceCardGrid";
import { ClientLogosConveyor } from "@/components/ui/client-logos-conveyor";

// Dynamic — below the fold; deferred so their JS bundles don't block LCP paint.
// Each import becomes a separate chunk that the browser fetches after first paint.
const IndiaClientMap = dynamic(
  () => import("@/components/sections/IndiaClientMap"),
);
const ClientBentoGridSection = dynamic(
  () => import("@/components/client-sections/ClientBentoGridSection"),
);
const EditorialGrid = dynamic(() => import("@/components/ui/EditorialGrid"));
const FaqSection = dynamic(() => import("@/components/mvpblock-ui/FAQSection"));
const ClientCTA = dynamic(
  () => import("@/components/client-sections/ClientCTA"),
);

export const metadata: Metadata = {
  title: "VIPPROW",
  description: "VIPPROW",
};

export default function Home() {
  return (
    <>
      <div className="bg-transparent">
        <HeroSection />
        <ClientPartnerBrandMarquee />

        {/* Services Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <PrimaryHeading
            heading="We Empower Brands Through"
            des="Strategic digital marketing, intelligent software, and automation solutions designed to accelerate growth.."
          />
          <ClientServiceCardGrid />
        </div>
        {/* Services End */}

        <div className="pt-20 w-full">
          <IndiaClientMap />
        </div>

        {/* Bento Grid Start */}
        <div className="pt-20">
          <PrimaryHeading
            heading="Let Automation  Do the  Work. You Drive Growth."
            des="Simplify operations, improve productivity, and accelerate business growth effortlessly.."
          />
          <ClientBentoGridSection />
        </div>
        {/* Bento Grid End */}

        {/* Testimonial Start */}
        {/* <div className="pt-20 max-w-7xl mx-auto">
          <PrimaryHeading
            heading="Client Experiences That Matter"
            des="Authentic stories from brands that achieved measurable growth through Vipprow’s strategic approach."
          />
          <ClientTestimonialMarquee />
        </div> */}
        {/* Testimonial End */}

        <div className="pt-20 max-w-7xl space-y-3 mx-auto">
          <PrimaryHeading
            heading="Brands That Trust Us"
            des="A growing family of businesses that chose Vipprow to build, grow, and scale their digital presence."
          />
          <ClientLogosConveyor />
        </div>

        {/* Editorial Grid Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <PrimaryHeading
            heading="Growth Stories Worth Sharing"
            // heading="Success Powered by Vipprow"
            des="From strategy to scale — explore how Vipprow drives real results for real businesses."
            // des="Proven success driven by intelligent strategies and scalable solutions."
          />
          <EditorialGrid itemsPerPage={3} />
        </div>
        {/* Editorial Grid End */}

        {/* FAQ Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <FaqSection />
        </div>
        {/* FAQ End */}

        {/* CTA Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <ClientCTA />
        </div>
        {/* CTA End */}
      </div>
    </>
  );
}
