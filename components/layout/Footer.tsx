"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const fi = lang === "fi";

  return (
    <footer className="suomi-footer">
      <div className="suomi-footer-inner">
        <div>
          <div className="suomi-footer-brand">Suomi <em>Horse Show</em></div>
          <p style={{ maxWidth: 360, color: "#c4bca9", fontSize: 14 }}>
            {fi
              ? "Suomen johtava online-hevosshow-alusta. Kilpaile kotoa käsin, saat tuomion ammattilaiselta ja oikean rusetin postilaatikkoosi."
              : "Finland's online horse show platform. Enter from the yard, get judged by professionals, and win real rosettes."}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <span className="suomi-tag" style={{ background: "transparent", borderColor: "#2a2f2a", color: "#c4bca9" }}>EST. 2026</span>
            <span className="suomi-tag" style={{ background: "transparent", borderColor: "#2a2f2a", color: "#c4bca9" }}>HELSINKI · ONLINE</span>
          </div>
        </div>
        <div>
          <h4>{fi ? "Kilpaile" : "Compete"}</h4>
          <ul>
            <li><Link href="/competitions">{fi ? "Kilpailut" : "Browse shows"}</Link></li>
            <li><Link href="/about">{fi ? "Miten toimii" : "How it works"}</Link></li>
            <li><Link href="/faq">{fi ? "UKK" : "FAQ"}</Link></li>
            <li><Link href="/sponsors">{fi ? "Sponsorit" : "Sponsors"}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{fi ? "Kumppanit" : "Partners"}</h4>
          <ul>
            <li><Link href="/sponsors">{fi ? "Sponsorointi" : "Sponsorship"}</Link></li>
            <li><a href="mailto:info@suomihorsshow.fi">{fi ? "Ota yhteyttä" : "Contact"}</a></li>
          </ul>
        </div>
        <div>
          <h4>{fi ? "Yritys" : "Company"}</h4>
          <ul>
            <li><Link href="/about">{fi ? "Tietoa meistä" : "About"}</Link></li>
            <li><Link href="/privacy">{fi ? "Tietosuoja" : "Privacy"}</Link></li>
          </ul>
        </div>
      </div>
      <div className="suomi-footer-bottom">
        <span>© {new Date().getFullYear()} Suomi Horse Show Oy</span>
        <span>{fi ? "Tehty Helsingissä · Ratsastajilta ratsastajille" : "Made in Helsinki · For riders, by riders"}</span>
      </div>
    </footer>
  );
}
