"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Webhook } from "lucide-react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import PrimaryHeading from "../ui/heading/PrimaryHeading";

const data = [
  {
    id: "1",
    question: "How does Vipprow help improve brand credibility online?",
    answer:
      " Through SEO, ORM, content marketing, and review management, we help build a trustworthy and authoritative digital presence.",
  },
  {
    id: "2",
    question: "How can Vipprow help with SEO optimization?",
    answer:
      "We create structured digital strategies using ads, SEO, content, and automation to build visibility, trust, and consistent lead generation.",
  },
  {
    id: "3",
    question: "Does Vipprow provide performance marketing services ?",
    answer:
      " Yes, we run ROI-focused Meta and Google Ads campaigns designed to generate quality leads, sales, and measurable results..",
  },
  {
    id: "4",
    question: "How does Vipprow improve local business visibility?",
    answer:
      " We optimize your Google Business Profile, manage reviews, and improve local search rankings so nearby customers can easily find your business..",
  },
  {
    id: "5",
    question: "Can Vipprow build my business website?",
    answer:
      " Yes, we design and develop conversion-focused websites and e-commerce platforms that are fast, responsive, and optimized for growth.",
  },
  {
    id: "6",
    question: " How does Vipprow ensure better ROAS in ad campaigns?",
    answer:
      " We use data-driven targeting, creative testing, and continuous optimization to maximize ad performance and improve return on ad spend..",
  },
  {
    id: "7",
    question: "How can Vipprow help grow my brand online?",
    answer:
      " We create structured digital strategies using ads, SEO, content, and automation to build visibility, trust, and consistent lead generation..",
  },
  {
    id: "8",
    question: "Does Vipprow offer SaaS automation solutions?",
    answer:
      "Yes, we implement automation systems for lead management, CRM integration, and workflow optimization to improve efficiency and scalability..",
  },
 
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        easeInOut,
      },
    },
  };

  return (
    <section className="relative flex w-full flex-col items-center justify-center py-5">
      <div className="container m-auto flex w-full flex-col items-center justify-center p-3 lg:p-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <PrimaryHeading
            heading=" Frequently Asked Questions"
            des=" Find quick answers to common questions about our services and
            features."
          />
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 w-full border-b pb-10"
        >
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleValueChange}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {data.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-1 ${
                  openItems.includes(faq.id)
                    ? "bg-blue-600/20 border-blue-600/30 shadow-[0_0_20px_3px_rgba(30,78,200,0.15)]"
                    : "from-blue-600/5 hover:border-blue-600/30 hover:bg-linear-to-bl hover:shadow-[0_0_20px_3px_rgba(30,78,200,0.15)]"
                } h-fit rounded-md border`}
              >
                <AccordionItem
                  value={faq.id}
                  className={`bg-background group rounded-sm border! px-5 ${
                    openItems.includes(faq.id)
                      ? "border-blue-600/30 from-blue-600/10 bg-linear-to-t"
                      : "hover:border-blue-600/30"
                  } shadow-none! transition-all duration-700`}
                >
                  <AccordionTrigger className="group cursor-pointer hover:no-underline [&>svg]:hidden">
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`text-left text-md font-light font-heading ${
                          openItems.includes(faq.id)
                            ? "text-blue-600"
                            : "group-hover:text-blue-600"
                        } transition-all duration-700`}
                      >
                        {faq.question}
                      </span>
                      <div className="ml-4 shrink-0">
                        <AnimatePresence>
                          <motion.div
                            key="minus"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Webhook
                              className={`size-6 ${
                                openItems.includes(faq.id)
                                  ? "animate-spin"
                                  : "group-hover:animate-spin"
                              } text-blue-600`}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={`border-t border-dashed ${
                      openItems.includes(faq.id)
                        ? "border-blue-600/50"
                        : "group-hover:border-blue-600/50"
                    } pt-4`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="font-heading text-muted-foreground leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="from-blue-600/30 via-blue-600/10 to-blue-600/5 border-blue-600/30 group relative m-auto mt-10 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-tl px-8 py-12 text-center shadow-[0_0_45px_10px_hsl(var(--blue-600)/0.15)] transition-all duration-500 hover:shadow-[0_0_45px_10px_hsl(var(--blue-600)/0.2)] mt-20"
        >
          <BorderBeam
            duration={12}
            size={300}
            className="via-blue-600 from-transparent to-transparent"
          />
          <BorderBeam
            duration={12}
            size={300}
            reverse={true}
            className="via-blue-600 from-transparent to-transparent"
          />
          <div className="z-10">
            <h3 className="font-heading text-blue-600 mb-3 text-3xl font-semibold md:text-3xl">
              Still have questions ?
            </h3>
            <p className="font-heading text-muted-foreground mb-6 max-w-xl text-sm md:text-md">
              Can&apos;t find the answer you&apos;re looking for ?{" "}
              <br className="hidden md:block" />
              Reach out to our friendly support team we&apos;re here to help.
            </p>
            <button className="from-blue-600 to-blue-600/60 relative z-[1] cursor-pointer overflow-hidden rounded-md bg-linear-to-tl px-8 py-3 font-medium text-white transition-all duration-700 before:absolute before:top-0 before:left-[-100%] before:h-full before:w-full before:rotate-45 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] before:transition-all before:duration-700 hover:scale-110 hover:px-12 hover:shadow-[0_0_20px_hsl(var(--blue-600)/0.4)] hover:before:left-[100%]">
              Get in Touch
            </button>
          </div>

          {(() => {
            const glowLines = [
              { bottom: "bottom-0", right: "right-10" },
              { bottom: "-bottom-10", right: "right-20" },
              { bottom: "-bottom-20", right: "right-30" },
              { bottom: "-bottom-30", right: "right-40" },
              { bottom: "-bottom-40", right: "right-50" },
            ];
            return (
              <div className="absolute right-0 bottom-0 flex h-full w-full items-center justify-end">
                {glowLines.map((line, index) => (
                  <div
                    key={index}
                    className={`absolute ${line.bottom} ${line.right} bg-blue-600/90 h-60 w-2 rounded-full transition-all duration-1000 group-hover:-translate-y-full`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>
            );
          })()}
        </motion.div>
      </div>
      <div className="fixed top-0 left-0 -z-10 m-auto flex h-screen w-full items-center justify-center">
        {/* <Image
          src="https://i.postimg.cc/j5dW4vFd/Mvpblocks.webp"
          alt="logo"
          width={5000}
          height={5000}
          className="opacity-5 grayscale-100"
        /> */}
      </div>
    </section>
  );
}
