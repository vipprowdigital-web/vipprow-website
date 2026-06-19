"use client";
import { motion } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Target,
  Globe,
  BarChart3,
  CreditCard,
  Palette,
  ShoppingCart,
  CheckCircle,
  EarthIcon,
  Lightbulb,
} from "lucide-react";
import FAQSection from "../../../components/portfolio-components/FAQSection";
import { FAQS_PAGE_3 } from "../../../seeds/FAQs";
import ClientExpHero from "../../../components/portfolio-components/ClientExpHero";
import CertificatesSection from "../../../components/portfolio-components/CertificatesSection";
import { scrollTo } from "../../../utils/scrollTo";
import "../index.css";

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const STATS = [
  { icon: Rocket, text: "50+ Clients Successfully Managed" },
  { icon: TrendingUp, text: "100+ Campaigns Executed Across Industries" },
  { icon: CreditCard, text: "₹1 Crore+ Ad Spend Managed" },
  { icon: Target, text: "3X–10X ROI Delivered" },
  { icon: Globe, text: "Pan India Client Reach" },
];

const PRODUCTS = [
  {
    icon: Rocket,
    title: "Croissix",
    points: [
      "AI-powered marketing automation",
      "Campaign tracking & optimization",
      "Smart growth insights",
    ],
  },
  {
    icon: BarChart3,
    title: "Vipprow CRM",
    points: [
      "Lead management system",
      "Sales tracking",
      "Customer journey management",
    ],
  },
  {
    icon: CreditCard,
    title: "Vexabill",
    points: ["Billing & invoicing software", "Business financial tracking"],
  },
  {
    icon: Palette,
    title: "Postermaker",
    points: ["Creative & social media post generation"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Builder",
    points: ["Custom online store creation platform"],
  },
];

const PHASES = [
  "Started with digital marketing services",
  "Shifted towards ROI-driven campaigns",
  "Introduced funnels + automation",
  "Built tools like Croissix",
  "Creating complete business OS",
];

export default function Milestones() {
  return (
    <>
      <ClientExpHero
        firstPart="Our Growth Journey is Measured in"
        secondPart="Results, Not Promises"
        desc="From managing campaigns to building scalable systems — our
            milestones reflect our commitment to real business growth."
        primaryBtn={{
          text: "View Portfolio",
          action: {
            type: "route",
            to: "/",
          },
        }}
        secondaryBtn={{
          text: "Start Your Growth Journey",
          action: {
            type: "scroll",
            target: "#contact",
          },
        }}
      />

      <section className="bg-[#050508] text-white flex-col items-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24">
          {/* HERO */}
          {/* <motion.div
          className="text-center mb-24 h-160"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <br />
            <span style={gradText}>Results, Not Promises</span>
          </h1>

          <p className="text-white/50 max-w-2xl mx-auto mb-8">
            From managing campaigns to building scalable systems — our
            milestones reflect our commitment to real business growth.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition">
              View Portfolio
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition">
              Start Your Growth Journey
            </button>
          </div>
        </motion.div> */}

          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            OUR JOURNEY IN NUMBERS
          </motion.p>

          <motion.h2
            className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            We believe numbers speak{" "}
            <span style={{ color: "#8B5CF6" }}>louder than words.</span>
          </motion.h2>

          <motion.p
            className="text-white/45 text-sm mb-12 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.14 }}
          >
            We focus on outcomes that actually matter:
          </motion.p>
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14 }}
          >
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-white/10 bg-white/2 hover:bg-purple-900/10 transition"
                >
                  <Icon className="text-purple-400 mb-3" size={22} />
                  <p className="text-sm text-white/70">{s.text}</p>
                </div>
              );
            })}
          </motion.div>

          <p className="text-center text-3xl text-white/40 font-bold mb-24">
            “Every number represents a business we helped grow”
          </p>

          {/* FROM AGENCY TO ECOSYSTEM */}
          <motion.div
            className="mb-24 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              From Agency to <span style={gradText}>Ecosystem</span>
            </h2>

            <p className="text-white/50 max-w-2xl mx-auto">
              Vipprow started as a digital marketing service provider. Today, we
              are building a complete business growth ecosystem.
              <br />
              <br />
              Running ads is not enough. Businesses need systems.
              <br />
              So we built technology + automation + strategy together.
            </p>
          </motion.div>

          {/* PRODUCTS */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14 }}
          >
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl border border-white/10 bg-white/2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.14 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-purple-400" />
                    <h3 className="font-bold">{p.title}</h3>
                  </div>

                  <ul className="text-sm text-white/50 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <CheckCircle
                          size={14}
                          className="text-purple-400 mt-1"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ACHIEVEMENTS */}
          <motion.div className="mb-24">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Key <span style={gradText}>Achievements</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Successfully built multi-industry marketing systems",
                "Delivered consistent lead generation models",
                "Created automation-first workflows",
                "Developed in-house SaaS platforms",
              ].map((a) => (
                <div
                  key={a}
                  className="p-4 border border-white/10 rounded-xl text-white/60"
                >
                  ✔ {a}
                </div>
              ))}
            </div>
          </motion.div>

          <CertificatesSection />

          {/* PHASES */}
          <motion.div className="mb-24 mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Growth <span style={gradText}>Evolution</span>
            </h2>

            <div className="space-y-4">
              {PHASES.map((p, i) => (
                <motion.div
                  key={p}
                  className="p-4 border border-white/10 rounded-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                >
                  <span className="text-purple-400 mr-2">Phase {i + 1} –</span>
                  {p}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* VISION + MISSION */}
          <motion.div className="grid md:grid-cols-2 gap-6 mb-24">
            <div className="p-6 border border-white/10 rounded-xl">
              <h3 className="font-bold mb-3 inline-flex gap-3">
                <EarthIcon color="#8b5cf6" /> Our Vision
              </h3>
              <p className="text-white/60">
                To become India’s leading AI-powered business growth ecosystem
              </p>
            </div>

            <div className="p-6 border border-white/10 rounded-xl">
              <h3 className="font-bold mb-3 inline-flex gap-3">
                <Lightbulb color="yellow" /> Our Mission
              </h3>
              <ul className="text-white/60 space-y-2">
                <li>• Generate consistent leads</li>
                <li>• Automate operations</li>
                <li>• Scale profitably</li>
              </ul>
            </div>
          </motion.div>

          {/* FINAL CTA */}
          <motion.div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Be a Part of Our <span style={gradText}>Next Milestone</span>
            </h2>

            <p className="text-white/50 mb-6">
              We don’t work for clients. We grow with partners.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                className="px-6 py-3 bg-purple-600 rounded-xl"
                onClick={() => scrollTo("contact")}
              >
                Book Free Strategy Call
              </button>
              <button
                className="px-6 py-3 border border-white/20 rounded-xl"
                onClick={() => scrollTo("contact")}
              >
                Start Scaling Today
              </button>
            </div>
          </motion.div>
        </div>
        <FAQSection FAQS={FAQS_PAGE_3} />
      </section>
    </>
  );
}
