"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { ShoppingCart, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/competitions", fi: "Kilpailut", en: "Shows" },
  { href: "/about", fi: "Miten toimii", en: "How it works" },
  { href: "/sponsors", fi: "Sponsorit", en: "Sponsors" },
  { href: "/faq", fi: "UKK", en: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { count, openCart } = useCart();
  const fi = lang === "fi";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-icon">🐴</span>
          <span>Nättely Suomi</span>
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${pathname.startsWith(l.href) ? " active" : ""}`}>
              {fi ? l.fi : l.en}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageToggle />

          <button className="cart-btn" onClick={openCart} aria-label={fi ? "Ostoskori" : "Cart"}>
            <ShoppingCart size={18} />
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>

          <Link href="/competitions" className="btn btn-primary btn-sm" style={{ marginLeft: 4 }}>
            {fi ? "Ilmoittaudu" : "Enter a show"}
          </Link>

          <button onClick={() => setMobileOpen((o) => !o)} className="btn btn-ghost btn-sm" aria-label="Menu" style={{ padding: "7px 10px", display: "none" }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "12px var(--pad)", background: "white" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "10px 12px", fontSize: 15, fontWeight: 500, color: pathname.startsWith(l.href) ? "var(--brand)" : "var(--text)", borderRadius: "var(--r-sm)" }}>
              {fi ? l.fi : l.en}
            </Link>
          ))}
          <Link href="/competitions" className="btn btn-primary btn-full" style={{ marginTop: 12 }} onClick={() => setMobileOpen(false)}>
            {fi ? "Ilmoittaudu kilpailuun" : "Enter a show"}
          </Link>
        </div>
      )}
    </header>
  );
}
