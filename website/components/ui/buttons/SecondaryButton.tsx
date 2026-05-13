"use client";

interface SecondaryButtonProps {
  heading: string;
  onClick?: () => void;
}

export default function SecondaryButton({
  heading,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl border border-[#07185C] bg-[#07185C]
        px-6 py-3 text-sm text-zinc-300
        cursor-pointer
        transition-all duration-300
        hover:border-blue-500/70
        hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]
      "
    >
      {heading}
    </button>
  );
}
