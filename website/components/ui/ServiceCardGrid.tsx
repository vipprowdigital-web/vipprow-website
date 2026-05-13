import { AnimatedSVGCard } from "@/components/aceternity-ui/card/AnimatedSVGCard";

export default function ServiceCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
      <AnimatedSVGCard
        href="/digital-marketing"
        title="Digital Marketing"
        description="
Performance-driven digital marketing strategies that build visibility, generate leads, and drive measurable business growth."
        serviceType="digital-marketing"
      />

      <AnimatedSVGCard
        href="/software-as-a-service"
        title="Software Development"
        description="Custom-built software solutions designed to streamline operations, enhance efficiency, and scale with your business."
        serviceType="software-development"
      />

      <AnimatedSVGCard
        href="/automation"
        title="Business Automation (A.I)"
        description="Intelligent automation systems that simplify workflows, reduce manual effort, and accelerate business performance."
        serviceType="business-automation"
      />
    </div>
  );
}
