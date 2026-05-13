import HeroSection from "./components/ui/HeroSection";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";
import EditorialGrid from "@/components/ui/EditorialGrid";
import ServiceCardGrid from "@/components/ui/ServiceCardGrid";
import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientTestimonialMarquee from "@/components/client-sections/ClientTestimonialMarquee";
import ClientBentoGridSection from "@/components/client-sections/ClientBentoGridSection";
import ClientPartnerBrandMarquee from "@/components/client-sections/ClientPartnerBrandMarquee";
import { Metadata } from "next";
import FaqSection from "@/components/mvpblock-ui/FAQSection";

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
          <ServiceCardGrid />
        </div>
        {/* Services End */}

        {/* Bento Grid Start */}
        <div className="pt-20">
          <PrimaryHeading
            heading="Let    Automation  Do the  Work. You Drive Growth."
            des="Simplify operations, improve productivity, and accelerate business growth effortlessly.."
          />
          <ClientBentoGridSection />
        </div>
        {/* Bento Grid End */}

        {/* Testimonial Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <PrimaryHeading
            heading="Client Experiences That Matter"
            des="Authentic stories from brands that achieved measurable growth through Vipprow’s strategic approach."
          />
          <ClientTestimonialMarquee />
        </div>
        {/* Testimonial End */}

        {/* Editorial Grid Start */}
        <div className="pt-20 max-w-7xl mx-auto">
          <PrimaryHeading
            heading="Success Powered by Vipprow"
            des="Proven success driven by intelligent strategies and scalable solutions."
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
