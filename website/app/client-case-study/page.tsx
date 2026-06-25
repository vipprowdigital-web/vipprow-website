import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientCaseStudyHeroSection from "@/components/custom-ui/ClientCaseStudyHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import FlipCardGrid from "@/components/sections/FlipCardGrid";
import ClientCaseStudyGridScroller from "@/components/ui/cards/ClientCaseStudyGridScroller";
import ClientMain from "@/components/ui/cards/ClientMain";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";

const educationSectorClients = [
  {
    title: "Lakme Academy powered by Aptech",
    image:
      "https://res.cloudinary.com/dl6fjer3y/image/upload/v1782215013/lakme-logo.jpg_w8axb9.jpg",
    tag: "Education",
  },
  {
    title: "VLCC ",
    image:
      "https://res.cloudinary.com/dl6fjer3y/image/upload/v1782215013/vlcc-logo_zis4xv.png",
    tag: "Education",
  },
  {
    title: "UK International London Beauty School",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713963/london-beuaty-school_zhrgka.png",
    tag: "Education",
  },
  {
    title: "Belleza Beauty School",
    image:
      "https://res.cloudinary.com/dl6fjer3y/image/upload/v1782383362/belleza_favicon_main_lwrtxm.svg",
    tag: "Education",
  },

  {
    title: "Livewire",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712367/livewire-logo_ducl6n.png",
    tag: "Education",
  },
  {
    title: "Edify School",
    image:
      "https://res.cloudinary.com/dl6fjer3y/image/upload/v1782389847/edify-logo_pi8yeu.png",
    tag: "Education",
  },
  {
    title: "Dream Zone school of creative studies",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712367/dreamzone-school-logo_evsrsp.webp",
    tag: "Education",
  },
  {
    title: "Stemfield International School",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712368/stemfield-school-logo_b3knvj.webp",
    tag: "Education",
  },
];

const healthcareSectorClients = [
  {
    title: "THC – Triveni Health Care",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712864/triveni-healthcare-logo_szclah.jpg",
    tag: "Healthcare",
  },
  {
    title: "Spasht",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712864/spasht-logo_irdpkf.jpg",
    tag: "Healthcare",
  },
  {
    title: "Gargi Dental Care",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712863/gargi-dental-care-logo_laxngf.png",
    tag: "Healthcare",
  },
  {
    title: "Dental Square",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779712863/dental-square_ajldkg.png",
    tag: "Healthcare",
  },
];

const electricalSectorClients = [
  {
    title: "Bindu Electrical's",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713393/logo-asus_vsgt23.webp",
    tag: "Electrical's & Electronics",
  },
  {
    title: "Light Studio - Graphic Design & Photography",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713393/light-studio-logo_wi9iz6.jpg",
    tag: "Electrical's & Electronics",
  },
  {
    title: "Microland Computers",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713394/microland-logo_kgxsmm.jpg",
    tag: "Electrical's & Electronics",
  },
  {
    title: "ASUS",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713393/logo-asus_vsgt23.webp",
    tag: "Electrical's & Electronics",
  },
  {
    title: "Skhikhar Infotech",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713484/shikhar-infotech-logo_opkwmt.png",
    tag: "Electrical's & Electronics",
  },
  {
    title: "Acer",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713484/864236-acer_k71bxo.avif",
    tag: "Electrical's & Electronics",
  },
  {
    title: "Lenovo",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713393/lenovo-logo_z572y2.png",
    tag: "Electrical's & Electronics",
  },
];

const clothingSectorClients = [
  {
    title: "Mangaldeep",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713634/mangaldeep-logo_uoyyt4.webp",
    tag: "Clothing",
  },
];

const solarSectorClients = [
  {
    title: "Intenics",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713740/intenics-logo_j36fxg.jpg",
    tag: "Solar",
  },
  {
    title: "Waaree Solar Americas Inc",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713742/waaree-americas-logo_omw0rj.jpg",
    tag: "Solar",
  },
  {
    title: "Solar Square",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713741/solarsquare-logo_mjpe9d.png",
    tag: "Solar",
  },
];

const jewellerySectorClients = [
  {
    title: "Vardhman Jewellers",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713878/vardhman-jewellers-logo_sps19p.jpg",
    tag: "Jewellers",
  },
];

const otherClients = [
  {
    title: "DFashionista",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713962/dfashionista-logo_sfqnc4.jpg",
    tag: "Other",
  },

  {
    title: "SDPL",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713965/sdpl-logo_zeokhn.png",
    tag: "Other",
  },
  {
    title: "Music Mania",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713964/music-mania-logo_rypmox.jpg",
    tag: "Other",
  },
  {
    title: "VadooTV",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779714471/vadoo-tv-logo_pkyuxu.jpg",
    tag: "Other",
  },
  {
    title: "Pacelab",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779713964/pacelab-logo_v5x0hz.webp",
    tag: "Other",
  },
  {
    title: "Lemontree Hotels",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779776457/lemon-tree-hotel-logo_otuur0.jpg",
    tag: "Other",
  },
  {
    title: "Samdareeya Hotels",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779714382/samdareeya-logo_t1abh1.png",
    tag: "Other",
  },
  {
    title: "UWO",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779714291/uwo-logo_hpkixt.webp",
    tag: "Other",
  },
  {
    title: "UWO Video",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779714292/uwo-video-logo_hagu11.webp",
    tag: "Other",
  },
  {
    title: "GLU Studio",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779714391/glud-studio-logo_dea1tx.jpg",
    tag: "Other",
  },
];

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
          heading="Education Sector"
          des="We connect institutions with the right students using targeted campaigns and intelligent automation.."
        />
        <ClientCaseStudyGridScroller clients={educationSectorClients} />
      </div>
      {/* Client Category A Grid End. */}

      {/* Client Category B Grid Start. */}
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Health Care Sector"
          des="Through analytics and automation, we help healthcare providers grow efficiently and consistently.."
        />
        <ClientCaseStudyGridScroller clients={healthcareSectorClients} />
      </div>
      {/* Client Category B Grid End. */}

      {/* Client Category C Grid Start. */}
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Electrical's & Electronics Sector"
          des="We help electrical and electronics businesses increase product visibility, generate quality inquiries, and drive consistent sales through performance marketing and automation.."
        />
        <ClientCaseStudyGridScroller clients={electricalSectorClients} />
      </div>

      {/* <div className="pt-20 max-w-7xl mx-auto"> */}
      {/* <PrimaryHeading
          heading="Health Care Sector"
          des="Through analytics and automation, we help healthcare providers grow efficiently and consistently.."
        /> */}
      {/* <ClientCaseStudyGridScroller /> */}
      {/* </div> */}
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Clothing Sector"
          des="We help fashion brands increase visibility and drive consistent online sales through performance marketing and targeted campaigns.."
        />
        <ClientCaseStudyGridScroller clients={clothingSectorClients} />
      </div>
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Solar Sector"
          des="From residential to commercial projects, we connect solar companies with serious buyers using performance marketing."
        />
        <ClientCaseStudyGridScroller clients={solarSectorClients} />
      </div>
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Jewellery Sector"
          des="We elevate jewellery brands with premium digital positioning, high-intent targeting, and conversion-focused strategies."
        />
        <ClientCaseStudyGridScroller clients={jewellerySectorClients} />
      </div>
      <div className="pt-0 max-w-7xl mx-auto">
        <PrimaryHeading
          heading="Other Sectors"
          des="We bring our signature premium digital positioning and conversion-focused strategies to leading brands across a diverse range of fast-growing sectors."
        />
        <ClientCaseStudyGridScroller clients={otherClients} />
      </div>
      {/* Client Category C Grid End. */}

      {/* FAQ Start */}
      <div className="pt-0 max-w-7xl mx-auto">
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
