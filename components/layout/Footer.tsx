"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const fi = lang === "fi";

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">🐴 Nättely Suomi</div>
            <p className="footer-tagline">
              {fi
                ? "Suomen johtava online-hevosshow-alusta. Kilpaile kotoa käsin, saa tuomio ammattilaiselta ja voita oikean rusetin."
                : "Finland's leading online horse show platform. Compete from home, get judged by professionals, and win real rosettes."}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569" }}>EST. 2026</span>
              <span style={{ color: "#334155" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569" }}>HELSINKI · ONLINE</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">{fi ? "Kilpaile" : "Compete"}</div>
            <ul className="footer-links">
              <li><Link href="/competitions">{fi ? "Selaa kilpailuja" : "Browse shows"}</Link></li>
              <li><Link href="/about">{fi ? "Miten toimii" : "How it works"}</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/cart">{fi ? "Ostoskori" : "Cart"}</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">{fi ? "Kumppanit" : "Partners"}</div>
            <ul className="footer-links">
              <li><Link href="/sponsors">{fi ? "Sponsorit" : "Sponsors"}</Link></li>
              <li><a href="mailto:info@nattelysuomi.fi">{fi ? "Sponsorointi" : "Become a sponsor"}</a></li>
              <li><a href="mailto:info@nattelysuomi.fi">{fi ? "Ota yhteyttä" : "Contact us"}</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">{fi ? "Yritys" : "Company"}</div>
            <ul className="footer-links">
              <li><Link href="/about">{fi ? "Tietoa meistä" : "About"}</Link></li>
              <li><Link href="/privacy">{fi ? "Tietosuoja" : "Privacy policy"}</Link></li>
              <li><a href="mailto:info@nattelysuomi.fi">{fi ? "Sähköposti" : "Email us"}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} Nättely Suomi Oy.{" "}
            {fi ? "Kaikki oikeudet pidätetään." : "All rights reserved."}
          </span>
          <span className="footer-copy">
            {fi ? "Tehty Helsingissä 🇫🇮 · Ratsastajilta ratsastajille" : "Made in Helsinki 🇫🇮 · For riders, by riders"}
          </span>
        </div>
      </div>
    </footer>
  );
}
