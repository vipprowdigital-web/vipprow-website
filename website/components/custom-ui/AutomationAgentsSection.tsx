"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Receipt,
  Database,
  Star,
  UserCheck,
} from "lucide-react";

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

const AgentCard = ({ title, description, icon, className }: AgentCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        "group border-cyan-500/10 bg-background hover:border-cyan-500/30 relative flex h-full flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500",
        className,
      )}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full bg-[linear-gradient(to_right,#0f3a4a_1px,transparent_1px),linear-gradient(to_bottom,#0f3a4a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[24px_24px]"></div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-cyan-500/10 text-cyan-400 shadow-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:shadow-cyan-500/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="from-cyan-400 to-cyan-400/30 absolute bottom-0 left-0 h-1 w-full bg-linear-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  );
};

const agents = [
  {
    title: "WhatsApp Reply Agent",
    description:
      "Replies to customer messages on WhatsApp instantly, 24/7 — qualifying leads and answering common questions without a human on the other end.",
    icon: <MessageCircle className="size-6" />,
  },
  {
    title: "Email Triage Agent",
    description:
      "Reads incoming emails, drafts replies, and routes urgent ones to the right person so nothing sits unread in a crowded inbox.",
    icon: <Mail className="size-6" />,
  },
  {
    title: "Invoice Agent",
    description:
      "Generates, sends, and follows up on invoices automatically, keeping billing moving without manual paperwork.",
    icon: <Receipt className="size-6" />,
  },
  {
    title: "CRM Sync Agent",
    description:
      "Keeps leads, contacts, and deal stages up to date across your tools the moment something changes.",
    icon: <Database className="size-6" />,
  },
  {
    title: "Review Reply Agent",
    description:
      "Responds to customer reviews with on-brand replies, protecting your reputation without waiting on a team member.",
    icon: <Star className="size-6" />,
  },
  {
    title: "Lead Qualification Agent",
    description:
      "Screens new leads against your criteria and hands off only the ones worth a sales conversation.",
    icon: <UserCheck className="size-6" />,
  },
];

export default function AutomationAgentsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {agents.map((agent) => (
          <AgentCard
            key={agent.title}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            className="h-full"
          />
        ))}
      </motion.div>
    </div>
  );
}
