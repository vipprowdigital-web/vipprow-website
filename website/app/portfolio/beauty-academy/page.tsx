import About from "@/components/beauty-portfolio-components/About";
import Hero from "@/components/beauty-portfolio-components/Hero";
import Projects from "@/components/beauty-portfolio-components/Projects";
import Services from "@/components/beauty-portfolio-components/Services";
import WhyUs from "@/components/beauty-portfolio-components/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Services />
      <WhyUs />
    </main>
  );
}
