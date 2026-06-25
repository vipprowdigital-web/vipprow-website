import { Sora } from "next/font/google";
import Hero from "../../components/portfolio-components/Hero";
import Divider from "../../components/portfolio-components/Divider";
import About from "../../components/portfolio-components/About";
import Services from "../../components/portfolio-components/Services";
import Industries from "../../components/portfolio-components/Industries";
import ServiceDescriptions from "../../components/portfolio-components/ServiceDescriptions";
import Results from "../../components/portfolio-components/Results";
import GoogleReviews from "../../components/portfolio-components/GoogleReviews";
import LogoConveyor from "../../components/portfolio-components/LogoConveyor";
import FAQSection from "../../components/portfolio-components/FAQSection";
import { clientLogos } from "../../seeds/clientLogos";
import { FAQS_PAGE_1 } from "../../seeds/FAQs";
import "./index.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-portfolio-sora",
  display: "swap",
});

export default function HomePage() {
  return (
    <div className={sora.variable}>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Services />
      <Divider />
      <Industries />
      <Divider />
      <ServiceDescriptions />
      <Divider />
      {/* <Stats /> */}
      {/* <Divider /> */}
      <Results />
      <Divider />
      <GoogleReviews />
      <Divider />
      <LogoConveyor data={clientLogos} />
      <Divider />
      {/* <StackingCards /> */}
      {/* <CaseStudies /> */}
      {/* <Divider /> */}
      {/* <Pricing /> */}
      <FAQSection FAQS={FAQS_PAGE_1} />
    </div>
  );
}
