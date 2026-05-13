import { HeroHighlightSection } from "@/components/aceternity-ui/HeroHighlightSection";
import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientTestimonialMarquee from "@/components/client-sections/ClientTestimonialMarquee";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import ServiceGridScroller from "@/components/ui/cards/ServiceGridScroller";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";
import ServiceCardGrid from "@/components/ui/ServiceCardGrid";

export default function ServicesPage() {
  return (
    <>
      <HeroHighlightSection />

      {/* Service Tab Grid Start. */}
      <div className="max-w-7xl mx-auto">
        <PrimaryHeading
          heading=" Services That Move Your Business Forward"
          des="Discover connected services designed to streamline operations and accelerate growth.."
        />
        <ServiceCardGrid />
        <ServiceGridScroller />
      </div>

      {/* Service Tab Grid End. */}

      {/* Testimonial Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Empower Your Workflow with AI"
          des="Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insghts to streamline your operations."
        />
        <ClientTestimonialMarquee />
      </div>
      {/* Testimonial End */}

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
    </>
  );
}
