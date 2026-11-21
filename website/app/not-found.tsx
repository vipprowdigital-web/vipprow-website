import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Vipprow",
  robots: { index: false },
};

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/client-case-study", label: "Our clients" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center">
      {/* soft glow behind the number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl sm:h-96 sm:w-96"
      />

      <p className="relative font-heading text-8xl font-extrabold leading-none tracking-tight text-transparent bg-linear-to-b from-white to-white/20 bg-clip-text sm:text-9xl">
        404
      </p>

      <h1 className="relative mt-6 font-heading text-2xl font-semibold text-white sm:text-3xl">
        This page doesn&apos;t exist
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        The link may be broken, or the page may have been moved or removed.
      </p>

      <Link
        href="/"
        className="relative mt-8 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      >
        Back to home
      </Link>

      <nav aria-label="Popular pages" className="relative mt-10">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Or try one of these
        </p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-zinc-300 underline-offset-4 hover:text-blue-400 hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
