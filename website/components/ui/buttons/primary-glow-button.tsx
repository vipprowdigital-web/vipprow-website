"use client";

interface PrimaryGlowButtonProps {
  heading?: string;
  onClick?: () => void;
}

export default function PrimaryGlowButton({
  heading = "Get Started Now",
  onClick,
}: PrimaryGlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative isolate rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white
        cursor-pointer
        transition-all duration-300
        hover:bg-blue-400
      "
    >
      {/* Outer glow */}
      <span
        className="
          pointer-events-none absolute -inset-3 -z-10 rounded-xl
          bg-blue-600 opacity-50 blur-2xl
        "
      />

      {/* Inner glow */}
      <span
        className="
          hidden pointer-events-none absolute inset-0 -z-10 rounded-xl
          bg-blue-500 opacity-70 blur-lg
        "
      />

      {heading}
    </button>
  );
}
