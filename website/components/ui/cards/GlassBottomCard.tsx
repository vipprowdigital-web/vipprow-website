import Image from "next/image";
import Link from "next/link";

interface GlassBottomCardProps {
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  href: string;
  fromServices?: boolean;
  bgColor?: string;
}

export default function GlassBottomCard({
  image,
  title,
  subtitle,
  tag,
  href,
  fromServices = false,
  bgColor,
}: GlassBottomCardProps) {
  return (
    <Link href={href}>
      <div className="relative overflow-hidden rounded-4xl bg-neutral-900 shadow-2xl min-w-67.5 shadow-neutral-900 border border-white/20">
        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className={`w-full ${fromServices ? "h-80 object-cover" : "h-70 object-contain"} rounded-4xl bg-black p-10`}
        />

        {/* GLASS BOTTOM OVERLAY */}
        <div
          style={bgColor ? { backgroundColor: bgColor } : undefined}
          className={`
          absolute inset-x-0 bottom-0
          ${bgColor ? "" : fromServices ? "bg-white/5" : "bg-neutral-900/85"}
          backdrop-blur-xl backdrop-saturate-200
          border-t border-white/20
          px-5 py-4
          flex items-center justify-between text-center
        `}
        >
          <div className="h-10 line-clamp-2 flex flex-col justify-center items-center w-full">
            <h4 className="text-sm font-semibold text-center font-heading text-white ">
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
