"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { lang, tr } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-slate-50 border-b border-slate-200 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{tr.priv_title}</h1>
          <p className="text-slate-500 text-sm">{lang === "fi" ? "Päivitetty: huhtikuu 2025" : "Last updated: April 2025"}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate text-sm leading-relaxed space-y-6">
          {lang === "fi" ? (
            <>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Rekisterinpitäjä</h2>
                <p className="text-slate-600">EquineShow Online, Suomi. Sähköposti: info@equineshow.online</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Kerättävät tiedot</h2>
                <p className="text-slate-600">Keräämme vain kilpailutoimintaan tarvittavat tiedot: nimi, sähköpostiosoite ja maksutiedot (käsitellään Strapen kautta – emme tallenna kortitietoja). Maksut käsitellään EUR-valuutassa.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">3. Tietojen käyttö</h2>
                <p className="text-slate-600">Tietoja käytetään kilpailuun ilmoittautumiseen, maksujen käsittelyyn ja tulosten tiedottamiseen. Tietoja ei myydä kolmansille osapuolille.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">4. Evästeet</h2>
                <p className="text-slate-600">Käytämme vain välttämättömiä evästeitä (kielivalinta). Emme käytä seurantaevästeitä.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">5. Yhteystiedot</h2>
                <p className="text-slate-600">Tietosuojaan liittyvissä kysymyksissä: info@equineshow.online</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Data Controller</h2>
                <p className="text-slate-600">EquineShow Online, Finland. Email: info@equineshow.online</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Data Collected</h2>
                <p className="text-slate-600">We collect only the data necessary for competition entry: name, email address, and payment information (processed via Stripe — we do not store card details). Payments are processed in EUR.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">3. Use of Data</h2>
                <p className="text-slate-600">Data is used for competition entry, payment processing, and results communication. Data is never sold to third parties.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">4. Cookies</h2>
                <p className="text-slate-600">We use only essential cookies (language preference). No tracking cookies are used.</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact</h2>
                <p className="text-slate-600">For privacy-related questions: info@equineshow.online</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
