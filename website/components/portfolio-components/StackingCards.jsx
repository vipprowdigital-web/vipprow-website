// components/StackingCards.jsx

const CARDS = [
  {
    tag: "Strategy",
    title: "We start with a goal, not a guess",
    desc: "Before running a single ad, we map your complete growth system — traffic, capture, automation, and conversion — in one plan.",
    badge: "Phase 01",
    theme: "purple",
  },
  {
    tag: "Technology",
    title: "The right tools, connected right",
    desc: "CRM, landing pages, ad platforms, WhatsApp — we wire everything together so data flows without manual effort.",
    badge: "Phase 02",
    theme: "teal",
  },
  {
    tag: "Automation",
    title: "Leads nurtured while you sleep",
    desc: "Automated follow-ups, instant responses, and smart sequences run 24/7 — zero leads wasted.",
    badge: "Phase 03",
    theme: "coral",
  },
  {
    tag: "Optimisation",
    title: "Continuously getting better",
    desc: "Every week we analyse, cut what doesn't work, and double down on what does. Growth compounds.",
    badge: "Phase 04",
    theme: "blue",
  },
];

// theme → tailwind bg + text colors
const THEMES = {
  purple: {
    bg: "bg-[#EEEDFE]",
    border: "border-[#AFA9EC]",
    title: "text-[#3C3489]",
    desc: "text-[#534AB7]",
    muted: "text-[#534AB7]",
  },
  teal: {
    bg: "bg-[#E1F5EE]",
    border: "border-[#5DCAA5]",
    title: "text-[#085041]",
    desc: "text-[#0F6E56]",
    muted: "text-[#0F6E56]",
  },
  coral: {
    bg: "bg-[#FAECE7]",
    border: "border-[#F0997B]",
    title: "text-[#712B13]",
    desc: "text-[#993C1D]",
    muted: "text-[#993C1D]",
  },
  blue: {
    bg: "bg-[#E6F1FB]",
    border: "border-[#85B7EB]",
    title: "text-[#0C447C]",
    desc: "text-[#185FA5]",
    muted: "text-[#185FA5]",
  },
};

export default function StackingCards({ cards = CARDS }) {
  return (
    <section className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        {cards.map((card, i) => {
          const t = THEMES[card.theme] || THEMES.purple;
          // Each card sticks 24px + (i * 14px) from the top — creates the stack offset
          const topPx = 24 + i * 14;

          return (
            <div
              key={card.tag}
              className={`sticky rounded-2xl border p-10 md:p-12 min-h-75 flex flex-col justify-between mb-4
                ${t.bg} ${t.border}`}
              style={{ top: topPx, zIndex: i + 1 }}
            >
              {/* Top content */}
              <div>
                <p
                  className={`text-xs font-semibold tracking-widest uppercase mb-5 opacity-60 ${t.title}`}
                >
                  {card.tag}
                </p>
                <h3
                  className={`font-sora font-bold text-2xl md:text-3xl leading-snug mb-4 ${t.title}`}
                >
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed max-w-lg ${t.desc}`}>
                  {card.desc}
                </p>
              </div>

              {/* Footer */}
              <div
                className={`flex items-center justify-between mt-10 pt-5 border-t ${t.border}`}
              >
                <span className={`text-xs ${t.muted}`}>
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(cards.length).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border ${t.muted} ${t.border}`}
                >
                  {card.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
