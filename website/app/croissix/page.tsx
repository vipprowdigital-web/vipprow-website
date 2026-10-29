import ClientCTA from "@/components/client-sections/ClientCTA";
import CroissixHeroSection from "@/components/custom-ui/CroissixHeroSection";
import CroissixPlatformSection from "@/components/custom-ui/CroissixPlatformSection";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

export default function CroissixPage() {
  return (
    <>
      {/* Croissix Hero Section Start */}
      <CroissixHeroSection />
      {/* Croissix Hero Section End */}

      {/* Connected Channels Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="One Dashboard, Every Channel"
          des="Croissix connects your Google Business Profile, Facebook, and Instagram so you manage your entire local presence from one place."
        />
        <CroissixPlatformSection />
      </div>
      {/* Connected Channels End */}

      {/* CTA Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <ClientCTA />
      </div>
      {/* CTA End */}
    </>
  );
}
