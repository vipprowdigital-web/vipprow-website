import ClientExpHero from "../../../components/portfolio-components/ClientExpHero";
import Divider from "../../../components/portfolio-components/Divider";
import Intro from "../../../components/portfolio-components/Intro";
import Clients from "../../../components/portfolio-components/Clients";
import CaseStudies from "../../../components/portfolio-components/CaseStudies";
import MultiResults from "../../../components/portfolio-components/MultiResults";
import FAQSection from "../../../components/portfolio-components/FAQSection";
import { FAQS_PAGE_2 } from "../../../seeds/FAQs";

export default function ClientExperience() {
  return (
    <div>
      {/* <div className="mt-20"></div> */}
      <ClientExpHero
        firstPart="Real Clients. Real Results."
        secondPart="Real Growth Systems."
        desc="We don't just deliver services — we build predictable lead generation & growth engines for our clients."
        primaryBtn={{
          text: "View Case Studiess",
          action: {
            type: "scroll",
            target: "#featured-case",
          },
        }}
        secondaryBtn={{
          text: "Book Free Consultation",
          action: {
            type: "scroll",
            target: "#contact",
          },
        }}
      />
      <Divider />
      <Intro />
      <Divider />
      <Clients />
      <Divider />
      <CaseStudies />
      <Divider />
      <MultiResults />
      <Divider />
      <FAQSection FAQS={FAQS_PAGE_2} />
    </div>
  );
}
