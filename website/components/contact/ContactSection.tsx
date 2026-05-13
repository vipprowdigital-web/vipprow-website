"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "../ui/form/contactForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppConfig } from "@/types/app-config";

export default function ContactSection() {
  const appConfig = useSelector(
    (state: RootState) => state.appConfig.data as AppConfig | null,
  );

  return (
   <section className="relative py-20 px-4 sm:px-6">
  <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
    
    {/* LEFT CONTENT */}
    <div className="w-full">
      <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
        Contact
      </span>

      <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Let’s talk about your next move
      </h2>

      <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
        Whether you’re scaling a SaaS, automating workflows, or exploring
        ideas, we’re ready to help. We usually reply within 24 hours.
      </p>

      {/* INFO */}
      <div className="mt-10 space-y-6">
        <InfoItem icon={<Mail />} title="Email" value={`${appConfig?.email}`} />
        <InfoItem icon={<Phone />} title="Phone" value={`${appConfig?.phoneNumber}`} />
        <InfoItem
          icon={<MapPin />}
          title="Location"
          value={`${appConfig?.companyAddress[0]?.address}`}
        />
      </div>
    </div>

    {/* RIGHT FORM */}
    <div className="w-full">
      <div className="w-full rounded-xl overflow-hidden">
        <iframe
          src="https://maglo-lead-form-6zkeu.ondigitalocean.app/vippro"
          className="w-full h-[650px] sm:h-[700px] md:h-[750px]"
          frameBorder="0"
          title="Contact Form"
        />
      </div>
    </div>

  </div>
</section>
  );
}
/* ---------------- UI Pieces ---------------- */

function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <p className="text-base font-semibold text-neutral-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function Input({
  type = "text",
  placeholder,
}: {
  type?: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-neutral-800 dark:text-white"
    />
  );
}

function Textarea({ placeholder }: { placeholder: string }) {
  return (
    <textarea
      rows={5}
      placeholder={placeholder}
      className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-neutral-800 dark:text-white"
    />
  );
}
