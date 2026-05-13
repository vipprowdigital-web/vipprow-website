import CardFlip from "../mvpblocks/card-flip";

const cardsData = [
  {
     title: "SEO Growth Strategy",
  subtitle: "Boost Organic Visibility",
  description: "Improved search rankings and increased organic traffic with structured SEO systems.",
  features: [
    "Technical SEO",
    "Content Optimization",
    "Keyword Strategy",
    "Ranking Growth"
    ],
  },
  {
    title: "Local SEO Success",
  subtitle: "Dominate Local Search",
  description: "Enhanced Google visibility and doubled inbound calls for local businesses.",
  features: [
    "Google Business Optimization",
    "Local Keywords",
    "Review Management",
    "Map Ranking Growth"
    ],
  },
  {
    title: "Marketing Analytics Setup",
  subtitle: "Track Real ROI",
  description: "Implemented dashboards to track campaign performance and revenue impact.",
  features: [
    "Performance Dashboard",
    "ROI Tracking",
    "Data Reporting",
    "Insight Automation"
    ],
  },
  {
    title: "SaaS Growth Automation",
  subtitle: "Increase User Conversions",
  description: "Optimized onboarding and automation to boost trial-to-paid conversions.",
  features: [
    "User Onboarding Flow",
    "Email Drip Campaigns",
    "Behavior Tracking",
    "Retention Optimization"
    ],
  },
];

export default function FlipCardGrid() {
  return (
    <section className="py-12 md:py-22">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
        {cardsData.map((card, index) => (
          <CardFlip key={index} {...card} />
        ))}
      </div>
    </section>
  );
}



// import CardFlip from "../mvpblocks/card-flip";

// export default function FlipCardGrid() {
//   return (
//     <>
//       <section className="py-12 md:py-22">
//         <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
//           <CardFlip />
//           <CardFlip />
//           <CardFlip />
//           <CardFlip />
//         </div>
//       </section>
//     </>
//   );
// }
