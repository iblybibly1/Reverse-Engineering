"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";

const NAV_LINKS = [
  { href: "/competitions", fi: "Kilpailut", en: "Shows" },
  { href: "/about", fi: "Tietoa", en: "How it works" },
  { href: "/sponsors", fi: "Sponsorit", en: "Sponsors" },
  { href: "/faq", fi: "UKK", en: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="suomi-nav">
      <div className="suomi-nav-inner">
        <Link href="/" className="suomi-nav-logo">
          <span className="crest">S</span>
          <span>Suomi Horse Show</span>
        </Link>

        <nav className="suomi-nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={pathname.startsWith(l.href) ? "active" : ""}>
              {lang === "fi" ? l.fi : l.en}
            </Link>
          ))}
        </nav>

        <div className="suomi-nav-cta">
          <LanguageToggle />
          <Link href="/competitions" className="btn-suomi sm">
            {lang === "fi" ? "Ilmoittaudu" : "Enter a show"}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{ display: "none" }}
            className="suomi-hamburger"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid var(--rule)", padding: "16px var(--pad)" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 0", fontSize: 15 }}>
              {lang === "fi" ? l.fi : l.en}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
