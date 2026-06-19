"use client";

// components/FAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollTo } from "../../utils/scrollTo";

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function FAQSection({ FAQS }) {
  const [active, setActive] = useState(null);

  return (
    <section id="faq" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">FAQs</p>

          <h2 className="font-sora font-extrabold text-4xl md:text-5xl leading-tight">
            Frequently Asked <span style={gradText}>Questions</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {FAQS.map((item, i) => {
            const isOpen = active === i;

            return (
              <div
                key={i}
                className="border-b last:border-none"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {/* Question */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/2 transition-all duration-200"
                >
                  <span className="text-sm md:text-base font-medium text-white/80">
                    {item.q}
                  </span>

                  <span
                    className="text-xl transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      color: "#a78bfa",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-md text-white/50 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-white/40 mb-4">Still have questions?</p>

          <button
            onClick={() => scrollTo("contact")}
            // href="https://vipprow.com/contact"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white
                       transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg,#8B5CF6,#a855f7)",
              boxShadow: "0 0 20px rgba(139,92,246,0.4)",
            }}
          >
            Book a Free Strategy Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
