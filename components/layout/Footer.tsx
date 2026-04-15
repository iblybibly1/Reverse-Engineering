import Link from "next/link";
import { Trophy, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
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
              The premier online horse show platform. Celebrating equestrian
              excellence from the comfort of your home.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {["Instagram", "Facebook", "X (Twitter)"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors text-xs font-bold"
                  aria-label={name}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
              <a
                href="mailto:info@equineshow.online"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/competitions", label: "Competitions" },
                { href: "/about", label: "About Us" },
                { href: "/sponsors", label: "Sponsors" },
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

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#", label: "How it Works" },
                { href: "#", label: "FAQs" },
                { href: "#", label: "Contact Us" },
                { href: "#", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.label}>
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
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EquineShow Online. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with passion for the equestrian community.
          </p>
        </div>
      </div>
    </footer>
  );
}
