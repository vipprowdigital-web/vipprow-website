import type { Metadata } from "next";
import ClientCTA from "@/components/client-sections/ClientCTA";
import FounderProfileSection, {
  FounderAccreditationsSection,
  FounderExpertiseSection,
  Reveal,
} from "@/components/custom-ui/FounderProfileSection";
import TeamMembersSection from "@/components/custom-ui/TeamMembersSection";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

export const metadata: Metadata = {
  title: "Our Founder & Team | VIPPROW",
  description:
    "Meet the founder of Vipprow, their expertise and accreditations, and the team behind our work.",
};

export default function FounderPage() {
  return (
    <>
      <div className="pt-32 max-w-7xl mx-auto">
        <FounderProfileSection />
      </div>

      <div className="pt-28 max-w-7xl mx-auto">
        <Reveal>
          <PrimaryHeading
            heading="Areas of Expertise"
            des="Where the founder's experience shapes how Vipprow builds and grows brands."
          />
        </Reveal>
        <div className="pt-12">
          <FounderExpertiseSection />
        </div>
      </div>

      <div className="pt-28 max-w-7xl mx-auto">
        <Reveal>
          <PrimaryHeading
            heading="Accreditations & Recognition"
            des="Certifications and awards that back the work we do."
          />
        </Reveal>
        <div className="pt-12">
          <FounderAccreditationsSection />
        </div>
      </div>

      <div className="pt-28 max-w-7xl mx-auto">
        <Reveal>
          <PrimaryHeading
            heading="Meet Our Team"
            des="The people who turn strategy into results every day."
          />
        </Reveal>
        <div className="pt-12">
          <TeamMembersSection />
        </div>
      </div>

      <div className="pt-28 max-w-7xl mx-auto">
        <ClientCTA />
      </div>
    </>
  );
}
