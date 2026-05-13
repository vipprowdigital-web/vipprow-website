import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientCaseStudyDetailsHeroSection from "@/components/custom-ui/ClientCaseStudyDetailsHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";

export default function SaasArticleDetails() {
  return (
    <>
      <ClientCaseStudyDetailsHeroSection />

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
