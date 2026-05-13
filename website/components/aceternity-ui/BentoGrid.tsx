"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { OrbitingCirclesDemo } from "../magic-ui/OrbitingCircles";
import { AreaChartSection } from "../shadcn/AreaChart";
import { ChartBarLabelSection } from "../shadcn/ChartBarLabel";
import { ChatDemoLoop } from "../ui/ChatLoop";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Intelligent Auto-Save System",
    description:
      "Your operations and performance data are continuously backed up and protected.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <ChatDemoLoop className="absolute top-0 right-2 h-[400px] w-full scale-100 border-none [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100" />
      // <AnimatedListDemo className="absolute top-4 right-2 h-[450px] w-full scale-100 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: BellIcon,
    name: "Growth Monitoring Alerts",
    description:
      "Track leads, revenue spikes, and campaign progress the moment it happens..",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      // <OrbitingCirclesDemo />
      <OrbitingCirclesDemo className="absolute inset-0 h-full w-full scale-85 md:scale-100 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Analytics",
    description:
      "Turning insights into real business growth for the clients we manage.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AreaChartSection className="absolute top-4 right-0 h-[450px] w-full scale-100 border-none [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Client Revenue Report",
    description: "Revenue we have genrated for clients.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <ChartBarLabelSection className="absolute top-4 right-0 h-[450px] w-full scale-100 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100" />
    ),
  },
];

export default function BentoGridSection() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
