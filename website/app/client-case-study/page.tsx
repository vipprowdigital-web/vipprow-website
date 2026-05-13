import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientCaseStudyHeroSection from "@/components/custom-ui/ClientCaseStudyHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import FlipCardGrid from "@/components/sections/FlipCardGrid";
import ClientCaseStudyGridScroller from "@/components/ui/cards/ClientCaseStudyGridScroller";
import ClientMain from "@/components/ui/cards/ClientMain";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

export default function ClientCaseStudyPage() {
  return (
    <>
      <ClientCaseStudyHeroSection />

      {/* Top 3 Pointers Start */}
      <div className="max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Solving Challenges. Scaling Business Growth."
          des="We turn complex business challenges into structured, data-driven strategies.
Our systems are built to deliver measurable results and sustainable growth."
        />
        <FlipCardGrid />
      </div>
      <ClientMain />

      {/* Top 3 Pointers End */}

      {/* Client Category A Grid Start. */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading=" Education Sector"
          des="We connect institutions with the right students using targeted campaigns and intelligent automation.."
        />
        <ClientCaseStudyGridScroller />
      </div>
      {/* Client Category A Grid End. */}

      {/* Client Category B Grid Start. */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Health Care Sector"
          des="Through analytics and automation, we help healthcare providers grow efficiently and consistently.."
        />
        <ClientCaseStudyGridScroller />
      </div>
      {/* Client Category B Grid End. */}

      {/* Client Category C Grid Start. */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Electrical's & Electronics Sector"
          des="We help electrical and electronics businesses increase product visibility, generate quality inquiries, and drive consistent sales through performance marketing and automation.."
        />
        <ClientCaseStudyGridScroller />
      </div>

      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Health Care Sector"
          des="Through analytics and automation, we help healthcare providers grow efficiently and consistently.."
        />
        <ClientCaseStudyGridScroller />
      </div>
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="clothing Sector"
          des="We help fashion brands increase visibility and drive consistent online sales through performance marketing and targeted campaigns.."
        />
        <ClientCaseStudyGridScroller />
      </div>
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Solar Sector"
          des="From residential to commercial projects, we connect solar companies with serious buyers using performance marketing."
        />
        <ClientCaseStudyGridScroller />
      </div>
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Jewellery Sector"
          des="We elevate jewellery brands with premium digital positioning, high-intent targeting, and conversion-focused strategies."
        />
        <ClientCaseStudyGridScroller />
      </div>
      {/* Client Category C Grid End. */}

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
