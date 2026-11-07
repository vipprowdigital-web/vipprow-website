"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FLOW = ["Capture", "Qualify", "Follow up", "Report"];

const INDUSTRIES = [
  {
    name: "Education & Academies",
    summary: "Every enquiry answered and followed up, even after hours.",
    items: [
      ["Enquiry capture", "Leads from ads, forms and calls land in one CRM automatically."],
      ["Follow-up sequences", "WhatsApp and email follow-ups go out on schedule until the student decides."],
      ["Fee and class reminders", "Automatic reminders cut the manual chasing for the admission desk."],
    ],
  },
  {
    name: "Beauty & Wellness",
    summary: "Fuller appointment books with less time on the phone.",
    items: [
      ["Booking reminders", "Clients get confirmations and reminders without a call from the front desk."],
      ["Review requests and replies", "Happy clients are asked for a review and every review gets a reply."],
      ["Repeat-visit offers", "Timed messages bring past clients back at the right moment."],
    ],
  },
  {
    name: "Solar & Energy",
    summary: "Serious buyers reach your sales team first.",
    items: [
      ["Lead qualification", "Enquiries are scored on the answers they give, so sales sees the best ones first."],
      ["Site-visit scheduling", "Survey slots are offered and confirmed automatically."],
      ["Quotation follow-ups", "Sent quotes are followed up on a fixed rhythm, not when someone remembers."],
    ],
  },
  {
    name: "Real Estate",
    summary: "No site-visit request goes cold.",
    items: [
      ["Enquiry routing", "Each lead goes to the right agent the moment it arrives."],
      ["Site-visit scheduling", "Visit times are shared, confirmed and reminded automatically."],
      ["Nurture sequences", "Buyers who are not ready yet keep receiving useful updates."],
    ],
  },
  {
    name: "Healthcare & Clinics",
    summary: "Fewer missed appointments and calmer front desks.",
    items: [
      ["Appointment reminders", "Patients are reminded by WhatsApp or SMS before they are due."],
      ["Follow-up care messages", "Check-ins and next-visit prompts go out after each visit."],
      ["Feedback collection", "Short feedback requests are sent and the results are tracked in one place."],
    ],
  },
  {
    name: "Retail & E-commerce",
    summary: "More repeat orders without more manual work.",
    items: [
      ["Order and delivery updates", "Customers get status messages without contacting support."],
      ["Abandoned-cart nudges", "Shoppers who leave are reminded automatically."],
      ["Review and reorder requests", "Messages after delivery ask for reviews and prompt the next order."],
    ],
  },
];

export default function AutomationIndustries() {
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];

  return (
    <section aria-labelledby="automation-industries" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col items-center px-2 text-center">
        <h2
          id="automation-industries"
          className="max-w-5xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          How Vipprow Helps Brands Automate Their Business
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Pick your industry to see the workflows we set up, from the first enquiry to the final report.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(260px,0.8fr)_1.4fr]">
        <div role="tablist" aria-label="Industries" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {INDUSTRIES.map((industry, i) => (
            <button
              key={industry.name}
              type="button"
              role="tab"
              id={`industry-tab-${i}`}
              aria-selected={active === i}
              aria-controls="industry-panel"
              onClick={() => setActive(i)}
              className={`rounded-2xl px-5 py-4 text-left font-heading text-sm font-semibold transition-colors duration-200 sm:text-base ${
                active === i
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <div
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active}`}
          className="rounded-3xl bg-white/5 p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                {current.name}
              </h3>
              <p className="mt-2 text-sm text-blue-400 sm:text-base">{current.summary}</p>

              <ul className="mt-6 grid gap-3">
                {current.items.map(([title, text]) => (
                  <li key={title} className="rounded-2xl bg-white/5 p-4">
                    <p className="font-heading text-base font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p>
                  </li>
                ))}
              </ul>

              <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="How every workflow runs">
                {FLOW.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-600/20 px-4 py-1.5 text-sm font-medium text-blue-300">
                      {step}
                    </span>
                    {i < FLOW.length - 1 && <ArrowRight className="h-4 w-4 text-white/30" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
