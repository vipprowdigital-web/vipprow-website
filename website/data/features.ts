// data/features.ts
export const FEATURES = [
  {
    key: "supply",
    label: "Supply Management",
    color: "#ff3b96",
    title: "Supply management",
    description:
      "Princity monitors toner, drum, and other consumable levels in real time.",
    cards: [
      { title: "Process handling", text: "Automated handling & verification." },
      { title: "Order basket", text: "Smart supplier cart sharing." },
      {
        title: "Compatibility Verification",
        text: "Ensure correct materials.",
      },
      {
        title: "Early Overconsumption Detection",
        text: "Detect waste instantly.",
      },
    ],
  },
  {
    key: "failure",
    label: "Failure detection",
    color: "#22d3ee",
    title: "Failure detection",
    description: "Detect issues before devices stop working.",
    cards: [
      { title: "Live Diagnostics", text: "Instant device health." },
      { title: "Auto Alerts", text: "Immediate notifications." },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    color: "#facc15",
    title: "Billing",
    description: "Clear and automated billing systems.",
    cards: [{ title: "Invoices", text: "Accurate usage billing." }],
  },
];
