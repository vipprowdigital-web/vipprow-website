"use client";

import { motion } from "framer-motion";
import {
  Sun,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Briefcase,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: Sun,
    name: "Solar & Infrastructure",
    desc: "EPC Companies | MMS Manufacturers | Renewable Projects",
    accent: "#8B5CF6",
  },
  {
    icon: ShoppingBag,
    name: "E-commerce & Brands",
    desc: "D2C Brands | Product Businesses",
    accent: "#EC4899",
  },
  {
    icon: GraduationCap,
    name: "Education Industry",
    desc: "Academies | Coaching Institutes",
    accent: "#06B6D4",
  },
  {
    icon: Stethoscope,
    name: "Healthcare",
    desc: "Clinics | Hospitals",
    accent: "#10B981",
  },
  {
    icon: Briefcase,
    name: "Local Businesses",
    desc: "Real Estate | Service Providers",
    accent: "#F59E0B",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="section-label mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          INDUSTRIES WE WORK WITH
        </motion.p>

        <motion.h2
          className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Industry <span style={{ color: "#8B5CF6" }}>Dominance</span>
        </motion.h2>

        <motion.p
          className="text-white/45 text-md mb-12 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          We have experience across multiple high-growth sectors.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map(({ icon: Icon, name, desc, accent }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative px-2 py-3 sm:p-6 rounded-2xl text-center cursor-default overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover bg tint */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `${accent}0d` }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}28`,
                }}
              >
                <Icon size={22} color={accent} strokeWidth={1.7} />
              </div>
              <h3 className="font-sora font-semibold text-md text-white mb-1.5 relative z-10">
                {name}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed relative z-10">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
