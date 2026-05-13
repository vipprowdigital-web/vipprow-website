"use client";

import { useState } from "react";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";

const NAV_ITEMS = ["Home", "API", "Company", "Colossus", "Careers", "News"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-tight text-white font-heading">
            VIPPROW
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em] text-zinc-400 ">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-white transition font-heading"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="hidden sm:inline-block text-sm tracking-widest transition font-heading"
              >
                <RainbowButton>Get In Touch</RainbowButton>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-zinc-600 text-white"
            >
              ☰
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      </header>

      {/* MOBILE SIDE NAV */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* Top */}
          <div className="flex h-16 items-center justify-between px-6">
            <span className="text-xl font-extrabold text-white">
              VIPPROW
            </span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-600 text-white"
            >
              ✕
            </button>
          </div>

          {/* Nav */}
          <div className="px-6 pt-8">
            <nav className="space-y-6">
              {NAV_ITEMS.map((item) => (
                <div key={item} className="border-b border-zinc-800 pb-4">
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-white"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Bottom Links */}
            <div className="mt-16 space-y-4 text-xs uppercase tracking-widest text-zinc-500">
              <Link href="#" className="block text-white">
                GET IN TOUCH
              </Link>
              <div className="border-b border-zinc-800 pb-3">Contact</div>
              <div className="border-b border-zinc-800 pb-3">Legal</div>
              <div>Privacy Policy</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
