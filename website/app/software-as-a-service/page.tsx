import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientTestimonialMarquee from "@/components/client-sections/ClientTestimonialMarquee";
import SaasHeroSection from "@/components/custom-ui/SaasHeroSection";
import WorkFlowSteps from "@/components/custom-ui/WorkFlowSteps";
import SaasFeatureSteps from "@/components/mvpblock-ui/SaasFeatureSteps";
import TopProductSparkles from "@/components/mvpblock-ui/TopProductSparkles";
import ServiceGridScroller from "@/components/ui/cards/ServiceGridScroller";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

export default function SoftwareAsAServicePage() {
  return (
    <>
      {/* Saas Hero Section Start */}
      <SaasHeroSection />
      {/* Saas Hero Section End */}
      {/* work flow steps start */}
      <WorkFlowSteps />
      {/* work flow steps end */}
      {/* Top Product Sparkles Start */}
      <TopProductSparkles />
      {/* Top Product Sparkles Start */}
      {/* Testimonial Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Scale Smarter with SaaS Solutions"
          des="Empower your business with secure, cloud-based software designed to streamline operations and boost productivity.."
        />
        <SaasFeatureSteps />
      </div>
      {/* Testimonial End */}
      {/* Services Start */}
      <ServiceGridScroller />
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
