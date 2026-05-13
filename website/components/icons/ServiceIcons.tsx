import React from "react";
import {
  GoCopilot,
} from "react-icons/go";
import {
  FaFacebookF,
  FaInstagram,
  FaGoogle,
  FaCode,
  FaServer,
  FaCloud,
  FaChartLine,
} from "react-icons/fa";

/* ================= ICON TYPE ================= */
/* same type – no breaking change */
export type IconType = React.ComponentType<{ className?: string }>;

/* =================================================
   DIGITAL MARKETING (Facebook + Instagram + Google)
   ================================================= */

export const DigitalMarketingIcon: IconType = ({ className }) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      <FaFacebookF className="h-5 w-5 text-blue-600" />
      <FaInstagram className="h-5 w-5 text-pink-500" />
      <FaGoogle className="h-5 w-5 text-red-500" />
    </div>
  );
};

/* =================================================
   SOFTWARE / AUTOMATION
   ================================================= */

export const AutomationIcon: IconType = ({ className }) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      <GoCopilot className="h-5 w-5 text-indigo-600" />
      <FaServer className="h-5 w-5 text-green-600" />
      <FaCloud className="h-5 w-5 text-sky-500" />
    </div>
  );
};

/* =================================================
   ANALYTICS
   ================================================= */

export const AnalyticsIcon: IconType = ({ className }) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      <FaChartLine className="h-5 w-5 text-emerald-600" />
      <FaCode className="h-5 w-5 text-gray-700 dark:text-gray-300" />
    </div>
  );
};
