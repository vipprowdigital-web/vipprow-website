"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { clientLogos } from "@/seeds/clientLogos";

export function ClientLogosConveyor() {
  const half = Math.ceil(clientLogos.length / 2);
  const row1 = clientLogos.slice(0, half);
  const row2 = clientLogos.slice(half);

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />

      <Marquee pauseOnHover className="[--gap:1rem] [--duration:35s] mb-3">
        {row1.map((client) => (
          <LogoCard key={client.name} client={client} />
        ))}
      </Marquee>

      <Marquee pauseOnHover reverse className="[--gap:1rem] [--duration:40s]">
        {row2.map((client) => (
          <LogoCard key={client.name} client={client} />
        ))}
      </Marquee>
    </div>
  );
}

function getOptimizedCloudinaryUrl(url: string): string {
  return url.replace(
    "/image/upload/",
    "/image/upload/w_320,h_200,c_fit,f_auto,q_auto/"
  );
}

function LogoCard({ client }: { client: { name: string; logo: string } }) {
  const src = client.logo.includes("res.cloudinary.com")
    ? getOptimizedCloudinaryUrl(client.logo)
    : client.logo;

  return (
    <div className="flex items-center justify-center rounded-lg border border-border px-3 py-2 shadow-sm transition-shadow hover:shadow-md">
      <Image
        src={src}
        alt={client.name}
        width={320}
        height={200}
        className="h-25 w-auto max-w-40 object-contain"
        unoptimized
      />
    </div>
  );
}
