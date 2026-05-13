import Image from "next/image";
import Link from "next/link";

interface EditorialCardProps {
  href?: string;
  image?: string;
  title?: string;
  category_name?: string;
}

export default function EditorialCard({
  href,
  image,
  title,
  category_name,
}: EditorialCardProps) {
  const safeImage = image ?? "/image/placeholder.png";
  const safeTitle = title ?? "Untitled Article";
  const safeCategory = category_name ?? "Uncategorized";

  return (
    <Link href={`${href}`}>
    <div className="group cursor-pointer">
      {/* Image Card */}
      <div
        className="
          relative aspect-[16/9] overflow-hidden rounded-sm
          bg-zinc-900
        "
      >
        {/* Background image */}
        <Image
          src={safeImage}
          alt={safeTitle}
          fill
          className="
            object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
        />
      </div>

      {/* Text */}
      <div className="mt-3 space-y-1">
        <p className="text-md text-zinc-200">{title}</p>
        <span className="text-xs text-zinc-300">{safeCategory}</span>
      </div>
    </div>
    </Link>
  );
}
