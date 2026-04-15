import SafeImage from "@/components/ui/SafeImage";
import { Star, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sponsors — EquineShow Online",
  description: "Meet the sponsors supporting EquineShow Online.",
};

const tierConfig = {
  gold: { label: "Gold Sponsor", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  silver: { label: "Silver Sponsor", color: "text-slate-600", bg: "bg-slate-50 border-slate-200" },
  bronze: { label: "Bronze Sponsor", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
};

const perks = [
  { tier: "Gold", price: "£500/show", perks: ["Logo on all show pages", "Featured in hero banner", "Social media mention", "Premium placement", "Unlimited logo size"] },
  { tier: "Silver", price: "£250/show", perks: ["Logo on competition pages", "Listed on sponsors page", "Social media mention", "Standard placement"] },
  { tier: "Bronze", price: "£100/show", perks: ["Logo on sponsors page", "Listed as a supporter", "Basic placement"] },
];

export default function SponsorsPage() {
  const sponsors = [
    { name: "EquiSupplies Ltd", logo: "/images/sponsors/equisupplies.png", website: "#", tier: "gold" as const, desc: "Premium equine supplies for professional yards and private owners alike." },
    { name: "HorseCare Pro", logo: "/images/sponsors/horsecuarepro.png", website: "#", tier: "silver" as const, desc: "Expert veterinary and care products trusted by professionals." },
    { name: "Stable Solutions", logo: "/images/sponsors/stablesolutions.png", website: "#", tier: "bronze" as const, desc: "Innovative stable management systems for modern equestrian facilities." },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4" /> Sponsors & Partners
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Our Amazing Sponsors
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            EquineShow Online is made possible by the generous support of our sponsors.
            Their contribution helps us run world-class online horse shows.
          </p>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Current Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => {
              const tier = tierConfig[sponsor.tier];
              return (
                <a
                  key={sponsor.name}
                  href={sponsor.website}
                  className={`group block rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${tier.bg}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${tier.color}`}>
                      {tier.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <div className="relative w-32 h-16 mb-4">
                    <SafeImage
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                      fallback="https://placehold.co/200x80/e2e8f0/64748b?text=Sponsor"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{sponsor.name}</h3>
                  <p className="text-slate-600 text-sm">{sponsor.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship packages */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Sponsorship Packages</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Partner with us and reach thousands of passionate horse enthusiasts across the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perks.map((pkg, i) => (
              <div
                key={pkg.tier}
                className={`rounded-2xl p-7 border transition-all hover:shadow-lg ${
                  i === 0
                    ? "bg-gradient-to-b from-amber-400 to-amber-500 border-amber-400 text-white shadow-lg shadow-amber-200"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${i === 0 ? "text-amber-100" : "text-slate-400"}`}>
                  {pkg.tier}
                </div>
                <div className={`text-3xl font-black mb-1 ${i === 0 ? "text-white" : "text-slate-900"}`}>
                  {pkg.price}
                </div>
                <ul className="mt-4 space-y-2">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className={`flex items-center gap-2 text-sm ${i === 0 ? "text-amber-50" : "text-slate-600"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-amber-200" : "bg-blue-400"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="mailto:sponsors@equineshow.online"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Become a Sponsor <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
