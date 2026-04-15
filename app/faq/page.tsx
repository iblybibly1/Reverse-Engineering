"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqsFi = [
  {
    q: "Miten ilmoittaudun kilpailuun?",
    a: "Avaa haluamasi kilpailu, valitse luokat joihin haluat osallistua ja klikkaa 'Ilmoittaudu kilpailuun'. Sinut ohjataan turvalliseen Stripe-maksusivulle. Maksu on 5 € per luokka.",
  },
  {
    q: "Mitkä maksutavat ovat tuettuja?",
    a: "Hyväksymme kaikki yleisimmät luotto- ja pankkikortit (Visa, Mastercard) sekä Apple Payn ja Google Payn Strapen kautta.",
  },
  {
    q: "Voinko ilmoittautua useampaan luokkaan?",
    a: "Kyllä! Voit valita useita luokkia samassa kassassa. Maksu on 5 € per valittu luokka.",
  },
  {
    q: "Miten tulokset julkaistaan?",
    a: "Tuomarointitulokset ja voittajakuvat julkaistaan kilpailun gallerioissa heti tulosten valmistuttua.",
  },
  {
    q: "Miten otan yhteyttä järjestäjään?",
    a: "Lähetä meille sähköpostia osoitteeseen info@equineshow.online tai käytä sivuston yhteydenottolomaketta.",
  },
];

const faqsEn = [
  {
    q: "How do I enter a competition?",
    a: "Open the competition you want, select the classes you wish to enter, and click 'Enter This Competition'. You'll be redirected to a secure Stripe payment page. The fee is €5 per class.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards (Visa, Mastercard), as well as Apple Pay and Google Pay via Stripe.",
  },
  {
    q: "Can I enter multiple classes?",
    a: "Yes! You can select multiple classes in one checkout. The fee is €5 per selected class.",
  },
  {
    q: "How are results published?",
    a: "Judging results and winner photos are published in the competition galleries as soon as results are ready.",
  },
  {
    q: "How do I contact the organiser?",
    a: "Email us at info@equineshow.online or use the contact form on the site.",
  },
];

export default function FaqPage() {
  const { lang, tr } = useLanguage();
  const faqs = lang === "fi" ? faqsFi : faqsEn;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-gradient-to-br from-blue-50 to-violet-50 border-b border-blue-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{tr.faq_title}</h1>
          <p className="text-slate-500 text-lg">{tr.faq_sub}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
