"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";

export function NavbarMenu() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Company",
      link: "/company",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Our Clients",
      link: "/client-case-study",
      dropdown: [
        {
          name: "Our Clients",
          link: "/client-case-study",
          description: "See the brands we've worked with",
        },
        {
          name: "Client Case Studies",
          link: "/case-studies",
          description: "In-depth results & success stories",
        },
      ],
    },
    {
      name: "Articles",
      link: "/articles",
    },
    {
      name: "Careers",
      link: "/careers",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 font-heading">
            <RainbowButton className="rounded-4xl">
              <Link href="/contact">Get In Touch</Link>
            </RainbowButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) =>
              item.dropdown ? (
                /* ── Accordion item with sub-links ── */
                <div key={`mobile-link-${idx}`} className="w-full">
                  <button
                    className="flex w-full items-center justify-between py-1 text-neutral-600 dark:text-neutral-300"
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.name ? null : item.name,
                      )
                    }
                  >
                    <span className="font-medium">{item.name}</span>
                    <svg
                      className={`h-4 w-4 opacity-50 transition-transform duration-200 ${
                        mobileExpanded === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {mobileExpanded === item.name && (
                    <div className="mt-1 flex flex-col gap-1 border-l-2 border-blue-500/30 pl-3">
                      {item.dropdown.map((child, cidx) => (
                        <a
                          key={cidx}
                          href={child.link}
                          onClick={() => {
                            setMobileExpanded(null);
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex flex-col py-1.5 text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="text-sm font-semibold">
                            {child.name}
                          </span>
                          {child.description && (
                            <span className="text-xs text-neutral-400">
                              {child.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* ── Plain link ── */
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ),
            )}

            <div className="flex w-full flex-col gap-4">
              <RainbowButton className="rounded-4xl">
                <Link href="/contact">Get In Touch</Link>
              </RainbowButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
