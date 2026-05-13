import { LampSection } from "@/components/aceternity-ui/LampSection";
import ClientCTA from "@/components/client-sections/ClientCTA";
import ContactSection from "@/components/contact/ContactSection";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl overflow-hidden">
      {/* Hero */}
      <LampSection />

      {/* Contact */}
      <ContactSection />

      {/* CTA */}
      <div className="pt-24">
        <ClientCTA />
      </div>
    </main>
  );
}
