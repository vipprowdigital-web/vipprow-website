"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        .nav-links { display: flex; }
        .nav-cta { display: inline-flex; }
        .hamburger { display: none !important; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={scrolled || menuOpen ? styles.navScrolled : styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
          <Link
            href="/"
            style={styles.logo}
            onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}
          >
            <Image
              src="/assets/images/logo/vipprow_logo.svg"
              alt="Vipprow Digital Marketing"
              width={160}
              height={45}
              style={styles.logoImg}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links" style={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={styles.link}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-muted)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="tel:7974718311"
            className="btn-primary nav-cta"
            style={styles.cta}
          >
            Get In Touch
          </a>

          {/* Hamburger */}
          <button
            className="hamburger"
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href="tel:7974718311"
              className="btn-primary"
              style={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              📞 7974718311
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "1.25rem 0",
    transition: "all 0.3s ease",
    background: "transparent",
  },

  navScrolled: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "0.875rem 0",
    transition: "all 0.3s ease",
    background: "rgba(26,10,46,0.97)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-md)",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    flexShrink: 0,
  },

  logoImg: {
    height: "35px",
    width: "auto",
    objectFit: "contain",
    display: "block",
  },

  links: {
    display: "flex",
    listStyle: "none",
    gap: "2rem",
    margin: 0,
    padding: 0,
    alignItems: "center",
  } as React.CSSProperties,

  link: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-medium)",
    color: "var(--color-text-muted)",
    letterSpacing: "0.5px",
    transition: "color var(--transition-normal)",
    cursor: "pointer",
  },

 cta: {
  flexShrink: 0,
  padding: "0.6rem 1.25rem",
  fontSize: "0.75rem",
  color: "#ffffff",   // 👈 add kiya
},

  hamburger: {
    background: "none",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text)",
    fontSize: "1.2rem",
    cursor: "pointer",
    padding: "0.4rem 0.7rem",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as React.CSSProperties,

  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "0.25rem",
    margin: "0.85rem 1rem 0",
    padding: "1rem 1rem 1.25rem",
    background: "rgba(26,10,46,0.98)",
    backdropFilter: "blur(20px)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
  } as React.CSSProperties,

  mobileLink: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-text-muted)",
    padding: "0.75rem 0",
    borderBottom: "1px solid rgba(201,169,110,0.08)",
    letterSpacing: "0.5px",
    display: "block",
  },

  mobileCta: {
  margin: "0.75rem 0 0",
  textAlign: "center",
  justifyContent: "center",
  width: "100%",
  color: "#ffffff",   // 👈 add kiya
},
};
