import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientTestimonialMarquee from "@/components/client-sections/ClientTestimonialMarquee";
import DigitalMarketingHeroSection from "@/components/custom-ui/DigitalMarketingHeroSection";
import InfoSection from "@/components/custom-ui/InfoSection";
import DigitalMarketingFeatureSection from "@/components/mvpblock-ui/DigitalMarketingFeatureSection";
import ServiceGridScroller from "@/components/ui/cards/ServiceGridScroller";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

export default function DigitalMarketingPage() {
  return (
    <>
      {/* Digital Markting Hero Section Start. */}
      <DigitalMarketingHeroSection />
      {/* Digital Markting Hero Section End. */}

      {/* Info Section Start */}
      <InfoSection />
      {/* Info Section End */}

      {/* Digital Marketing Feature Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Smarter Digital Marketing Starts with Intelligent Systems"
          des="Streamline your marketing operations with AI-driven strategies and seamless integrations."
        />
        <DigitalMarketingFeatureSection />
      </div>
      {/* Digital Marketing Feature End */}

      {/* Services Start */}
      <ServiceGridScroller domainSlug="Digital Marketing" />

      {/* <ServiceGridScroller /> */}
      {/* Services End */}

      {/* Testimonial Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Empower Your Workflow with AI"
          des="Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insghts to streamline your operations."
        />
        <ClientTestimonialMarquee />
      </div>
      {/* Testimonial End */}

      {/* CTA Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <ClientCTA />
      </div>
      {/* CTA End */}
    </>
  );
}
