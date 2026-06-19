// components/Approach.jsx

const CARDS = [
  {
    tag: "Strategy",
    color: "#8B5CF6",
    bg: "bg-[#1a1036]",
    border: "border-purple-500/30",
    title: "Build complete funnels",
    desc: "From the first ad click to the final sale — we design every step of the customer journey, not just the top.",
    badge: "01 / 03",
  },
  {
    tag: "Technology",
    color: "#2dd4bf",
    bg: "bg-[#0d1f18]",
    border: "border-teal-400/30",
    title: "Automate processes",
    desc: "WhatsApp follow-ups, CRM updates, lead nurturing — all running 24/7 without your team lifting a finger.",
    badge: "02 / 03",
  },
  {
    tag: "Automation",
    color: "#a78bfa",
    bg: "bg-[#1a1020]",
    border: "border-violet-400/30",
    title: "Optimize continuously",
    desc: "Every campaign is tracked, tested, and improved every week. We don't set and forget — we compound results.",
    badge: "03 / 03",
  },
];

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const TOP_BASE = 24; // px — first card's sticky top
const TOP_STEP = 14; // px — each subsequent card peeks this much

export default function Approach() {
  return (
    <section id="approach" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Label */}
        <p className="section-label mb-5">Why Vipprow</p>

        {/* Heading */}
        <h2 className="font-sora text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Our <span style={gradText}>Unique Approach</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/42 text-sm leading-relaxed mb-16 max-w-sm">
          Traditional agencies run ads. We build systems. Here&apos;s the
          formula that separates us.
        </p>

        {/* ── Stacking cards ── */}
        <div className="relative flex flex-col">
          {CARDS.map((card, i) => (
            <div
              key={card.tag}
              className={`sticky rounded-3xl p-10 md:p-12 min-h-70 flex flex-col justify-between mb-4 border
                ${card.bg} ${card.border}`}
              style={{ top: TOP_BASE + i * TOP_STEP, zIndex: i + 1 }}
            >
              {/* Top */}
              <div>
                {/* Tag */}
                <div
                  className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5 opacity-70"
                  style={{ color: card.color }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: card.color }}
                  />
                  {card.tag}
                </div>

                {/* Title */}
                <h3 className="font-sora font-extrabold text-2xl md:text-3xl text-white leading-snug mb-4">
                  {card.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-white/45 leading-relaxed max-w-lg">
                  {card.desc}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.07]">
                <span className="text-xs text-white/25 tracking-wider">
                  {card.badge}
                </span>
                <span className="text-xs font-medium px-4 py-1.5 rounded-full border border-white/12 text-white/40">
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Result pill ── */}
        <div
          className="flex items-center gap-4 rounded-2xl px-7 py-6 mt-2"
          style={{
            background: "rgba(139,92,246,0.10)",
            border: "1px solid rgba(139,92,246,0.28)",
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
            style={{
              background: "#8B5CF6",
              boxShadow: "0 0 14px rgba(139,92,246,0.8)",
            }}
          />
          <p className="text-sm text-white/60 leading-relaxed">
            👉 &nbsp;
            <strong className="font-sora font-bold" style={gradText}>
              Result: Consistent and predictable lead generation
            </strong>{" "}
            — so you always know what&apos;s coming next month.
          </p>
        </div>
      </div>
    </section>
  );
}
