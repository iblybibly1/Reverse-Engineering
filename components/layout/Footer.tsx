"use client";

import Link from "next/link";
import { Trophy, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { tr } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                <span className="text-blue-400">Equine</span>Show Online
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {tr.footer_tagline}
            </p>
            <a
              href="mailto:info@equineshow.online"
              className="mt-4 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              info@equineshow.online
            </a>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {tr.footer_platform}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/competitions", label: tr.nav_competitions },
                { href: "/about", label: tr.nav_about },
                { href: "/sponsors", label: tr.nav_sponsors },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {tr.footer_support}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about#how-it-works", label: tr.footer_how },
                { href: "/faq", label: tr.footer_faq },
                { href: "mailto:info@equineshow.online", label: tr.footer_contact },
                { href: "/privacy", label: tr.footer_privacy },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EquineShow Online. {tr.footer_copy}
          </p>
          <p className="text-xs text-slate-500">
            {tr.footer_made}
          </p>
        </div>
      </div>
    </footer>
  );
}
