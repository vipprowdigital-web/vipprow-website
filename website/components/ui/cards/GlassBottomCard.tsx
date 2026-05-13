import Image from "next/image";
import Link from "next/link";

interface GlassBottomCardProps {
  image: string;
  title: string;
  subtitle: string;
  tag?: string;
  href: string;
}

export default function GlassBottomCard({
  image,
  title,
  subtitle,
  tag,
  href,
}: GlassBottomCardProps) {
  return (
    <Link href={href}>
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl min-w-[270px]">
        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={800}
          height={800}
          className="w-full h-[320px] object-cover"
          priority
        />

        {/* GLASS BOTTOM OVERLAY */}
        <div
          className="
          absolute inset-x-0 bottom-0
          bg-white/10
          backdrop-blur-xl backdrop-saturate-150
          border-t border-white/20
          px-5 py-4
          flex items-center justify-between
        "
        >
          <div>
            <h4 className="text-sm font-semibold font-heading text-white">
              {title}
            </h4>
            <p className="text-xs text-white/70">{subtitle}</p>
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
