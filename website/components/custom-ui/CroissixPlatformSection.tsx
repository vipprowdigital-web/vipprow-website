"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Facebook,
  Instagram,
  Image as ImageIcon,
  Send,
  LocateFixed,
  BarChart3,
  Star,
  MessageSquare,
  Inbox,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  icon: LucideIcon;
  name: string;
  accent: string;
  features: { icon: LucideIcon; label: string }[];
}

const CHANNELS: Channel[] = [
  {
    icon: MapPin,
    name: "Google Business Profile",
    accent: "#ef4444",
    features: [
      { icon: ImageIcon, label: "Photo management" },
      { icon: Send, label: "Posts & updates" },
      { icon: LocateFixed, label: "Location editing" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Star, label: "Auto review replies" },
    ],
  },
  {
    icon: Facebook,
    name: "Facebook",
    accent: "#1877F2",
    features: [
      { icon: BarChart3, label: "Analytics" },
      { icon: Send, label: "Posts" },
      { icon: MessageSquare, label: "Comments" },
      { icon: Inbox, label: "Messenger" },
    ],
  },
  {
    icon: Instagram,
    name: "Instagram",
    accent: "#D92E7F",
    features: [
      { icon: ImageIcon, label: "Feed" },
      { icon: Send, label: "Posts" },
      { icon: MessageSquare, label: "Comments" },
      { icon: Inbox, label: "DMs" },
    ],
  },
];

export default function CroissixPlatformSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {CHANNELS.map((channel, idx) => {
          const ChannelIcon = channel.icon;
          return (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0906] p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: channel.accent }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${channel.accent}1f` }}
                >
                  <ChannelIcon
                    className="h-5 w-5"
                    style={{ color: channel.accent }}
                  />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-white">
                    {channel.name}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Connected
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {channel.features.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <li
                      key={feature.label}
                      className="flex items-center gap-2.5 text-sm text-neutral-300"
                    >
                      <FeatureIcon className="h-4 w-4 shrink-0 text-neutral-500" />
                      {feature.label}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* AI + Billing highlight row */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-[#ef9a3b]/25 p-7",
            "bg-[radial-gradient(circle_at_30%_20%,rgba(239,154,59,0.12),transparent_60%)] bg-[#0c0906]",
          )}
        >
          <p className="font-heading text-xs font-medium tracking-widest text-[#f6bd79] uppercase">
            AI
          </p>
          <h3 className="font-heading mt-2 text-xl font-semibold text-white">
            Content Generation
          </h3>
          <p className="mt-3 max-w-sm text-sm text-neutral-300">
            Generate on-brand post text and images in seconds, for every
            connected channel, whenever you run out of ideas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "relative overflow-hidden rounded-2xl border border-[#ef9a3b]/25 p-7",
            "bg-[radial-gradient(circle_at_30%_20%,rgba(239,154,59,0.12),transparent_60%)] bg-[#0c0906]",
          )}
        >
          <p className="font-heading text-xs font-medium tracking-widest text-[#f6bd79] uppercase">
            Billing
          </p>
          <h3 className="font-heading mt-2 text-xl font-semibold text-white">
            Simple Subscriptions
          </h3>
          <p className="mt-3 max-w-sm text-sm text-neutral-300">
            Razorpay-powered subscriptions with straightforward INR pricing —
            no hidden fees, cancel anytime.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
