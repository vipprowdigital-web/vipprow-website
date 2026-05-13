import ClientCTA from "@/components/client-sections/ClientCTA";
import SaaSDetailsHeroSection from "@/components/custom-ui/SaaSDetailsHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";

export default function DigitalMarketingArticleDetails() {
  return (
    <>
      {/* <SaaSDetailsHeroSection /> */}

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
