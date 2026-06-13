import Image from "next/image";
import Link from "next/link";

interface GlassBottomCardProps {
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  href: string;
  fromServices?: boolean;
}

export default function GlassBottomCard({
  image,
  title,
  subtitle,
  tag,
  href,
  fromServices = false,
}: GlassBottomCardProps) {
  return (
    <Link href={href}>
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl min-w-67.5">
        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className={`w-full ${fromServices ? "h-80 object-cover" : "h-50 object-contain"}  rounded-2xl bg-black`}
        />

        {/* GLASS BOTTOM OVERLAY */}
        <div
          className={`
          absolute inset-x-0 bottom-0
          ${fromServices ? "bg-white/5" : "bg-black"}
          backdrop-blur-xl backdrop-saturate-150
          border-t border-white/20
          px-5 py-4
          flex items-center justify-between text-center
        `}
        >
          <div>
            <h4 className="text-sm font-semibold text-center font-heading text-white">
              {title}
            </h4>
            <p className="text-xs text-white/70 text-center">{subtitle}</p>
          </div>

          {/* {tag && (
            <p className="text-xs font-heading italic text-white font-bold">
              — {tag}
            </p>
          )} */}
        </div>
      </div>
    </Link>
  );
}
