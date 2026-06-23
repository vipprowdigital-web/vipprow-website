"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollTo } from "../../utils/scrollTo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Client Experience", href: "/portfolio/client-experience" },
  { label: "Milestones", href: "/portfolio/milestones" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-100 px-6 md:px-10 py-4
                    flex items-center justify-between transition-all duration-300
                    ${
                      scrolled
                        ? "bg-[rgba(5,5,8,0.85)] backdrop-blur-xl border-b border-white/6"
                        : "bg-transparent"
                    }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-sora text-xl font-extrabold tracking-widest select-none"
        >
          <div className="relative w-40 h-10">
            <Image
              src="/assets/images/logo/vipprow_logo.svg"
              alt="Vipprow Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={label} className="relative">
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1
                    ${isActive ? "text-white" : "text-white/50 hover:text-white"}`}
                >
                  {label}

                  {/* 3. Framer Motion Sliding Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <motion.button
          onClick={() => scrollTo("contact")}
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-white
               px-5 py-2.5 rounded-lg border-none cursor-pointer"
          style={{
            background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
            boxShadow: "0 0 24px rgba(139,92,246,0.3)",
          }}
        >
          Book a Strategy Call
        </motion.button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-99 rounded-2xl p-5 glass-card border border-white/8 flex flex-col gap-3 bg-[#0a0a0f]/90 backdrop-blur-2xl"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-left text-sm font-medium py-3 px-4 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                scrollTo("contact");
                setMobileOpen((v) => !v);
              }}
              className="mt-2 text-center text-sm font-medium text-white py-3 px-4 rounded-xl
                         border-none cursor-pointer"
              style={{ background: "linear-gradient(135deg,#8B5CF6,#6D28D9)" }}
            >
              Book a Strategy Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
