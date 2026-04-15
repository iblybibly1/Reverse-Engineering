"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Slideshow from "@/components/ui/Slideshow";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import { getAllCompetitions, getSlideshowImages } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  const { tr } = useLanguage();
  const competitions = getAllCompetitions();
  const slideshowImages = getSlideshowImages();
  const featured = competitions.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center">
        <div className="absolute inset-0">
          <Slideshow images={slideshowImages} autoPlayInterval={6000} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {tr.hero_badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              {tr.hero_title_1}<br />
              <span className="text-blue-300">{tr.hero_title_2}</span><br />
              {tr.hero_title_3}
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-lg leading-relaxed drop-shadow">
              {tr.hero_sub}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/competitions"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/30"
              >
                {tr.hero_browse}
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/30 transition-all"
              >
                {tr.hero_learn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">{tr.feat_badge}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{tr.feat_title}</h2>
            </div>
            <Link href="/competitions" className="flex items-center gap-1.5 text-blue-600 font-semibold hover:gap-2.5 transition-all text-sm">
              {tr.feat_all} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">No competitions yet. Check back soon!</div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">{tr.hiw_badge}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{tr.hiw_title}</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">{tr.hiw_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: tr.hiw_1_title, desc: tr.hiw_1_desc },
              { step: "02", title: tr.hiw_2_title, desc: tr.hiw_2_desc },
              { step: "03", title: tr.hiw_3_title, desc: tr.hiw_3_desc },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl font-black text-blue-50 mb-4 leading-none select-none font-mono">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-violet-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tr.cta_title}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            {tr.cta_sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              {tr.cta_browse} <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sponsors"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
            >
              {tr.cta_sponsor}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
