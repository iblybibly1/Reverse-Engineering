"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllCompetitions } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

const STEPS = [
  { en: "Pick a class", fi: "Valitse luokka", descEn: "Browse 60+ classes every month. Every class is €5.", descFi: "Selaa yli 60 luokkaa kuukausittain. Jokainen luokka on €5." },
  { en: "Upload your photo", fi: "Lataa kuva", descEn: "One clear, unedited photo of your horse from your own yard.", descFi: "Yksi editoimaton kuva hevosestasi omalta tallilta." },
  { en: "Licensed scoring", fi: "Ammattituomari", descEn: "FEI-credentialed judges score within 72 hours with full written feedback.", descFi: "FEI-tuomarit pisteyttävät 72 tunnin sisällä täydellisellä palautteella." },
  { en: "Win real rosettes", fi: "Voita oikea rusetti", descEn: "Every entrant receives a numbered rosette posted to their door. Top 3 win prize money.", descFi: "Jokainen osallistuja saa numeroidun rusetin. Kolme parasta jakavat palkintopotin." },
];

const DISCIPLINES = [
  { icon: "🏆", en: "Dressage", fi: "Kouluratsastus", count: 12 },
  { icon: "🌿", en: "Working Hunter", fi: "Ratsukkoluokka", count: 9 },
  { icon: "⭐", en: "Showjumping", fi: "Esteet", count: 6 },
  { icon: "🎀", en: "Showmanship", fi: "Näyttelyluokka", count: 7 },
  { icon: "🐴", en: "In-Hand", fi: "Kädessä", count: 8 },
  { icon: "🎖️", en: "Veteran", fi: "Veteraani", count: 4 },
  { icon: "🌟", en: "Youngstock", fi: "Varsat", count: 5 },
  { icon: "🏅", en: "Best of Breed", fi: "Parhaimmisto", count: 6 },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const fi = lang === "fi";
  const competitions = getAllCompetitions();
  const openShows = competitions.filter((c) => c.status === "open");
  const upcomingShows = competitions.filter((c) => c.status === "upcoming");

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="section-label">{fi ? "Online-hevosshowt · Helsinki 2026" : "Online horse shows · Helsinki 2026"}</div>
              <h1 style={{ fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 1.1, marginBottom: 24, marginTop: 12 }}>
                {fi ? (
                  <>Kilpaile kotoa.<br /><span style={{ color: "var(--brand)" }}>Voita oikea rusetti.</span></>
                ) : (
                  <>Compete from<br />the yard.<br /><span style={{ color: "var(--brand)" }}>Win real rosettes.</span></>
                )}
              </h1>
              <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.7, marginBottom: 32 }}>
                {fi
                  ? "Ilmoittaudu online-hevosshowhin, saa palaute lisensoidulta tuomarilta ja voita oikea rusetti — kaikki kotitalliltasi käsin."
                  : "Enter online horse shows, get scored by a licensed judge, and win a real rosette posted to your door — all from your own yard."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/competitions" className="btn btn-primary btn-lg">
                  {fi ? "Selaa kilpailuja" : "Browse shows"} <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn btn-secondary btn-lg">
                  {fi ? "Miten toimii" : "How it works"}
                </Link>
              </div>
              <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
                {[
                  { num: "€5", label: fi ? "Per luokka" : "Per class entry" },
                  { num: "47", label: fi ? "Tuomaria" : "Licensed judges" },
                  { num: "12", label: fi ? "Lajia" : "Disciplines" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "var(--brand)", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "4/5", position: "relative", boxShadow: "var(--shadow-xl)" }}>
                <Image src="/images/hero-horse.jpg" alt="Horse show" fill style={{ objectFit: "cover" }} priority />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "var(--r-md)", padding: "14px 18px", backdropFilter: "blur(8px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>🏆</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Spring Open Show 2026</div>
                        <div style={{ fontSize: 12, color: "var(--brand)", fontWeight: 600 }}>
                          {fi ? "Ilmoittautuminen auki" : "Entries open"} · 8 {fi ? "luokkaa" : "classes"}
                        </div>
                      </div>
                      <span className="badge badge-green" style={{ marginLeft: "auto" }}>
                        <span className="badge-dot" />{fi ? "Auki" : "Open"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", top: -16, right: -16, background: "white", borderRadius: "var(--r-lg)", padding: "14px 18px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 4 }}>{fi ? "Tällä hetkellä" : "Prize pool"}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)" }}>€500</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{fi ? "Palkintopotti" : "to be won"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: "var(--brand)", color: "white", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", animation: "suomi-scroll 60s linear infinite" }}>
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", gap: 48, flexShrink: 0 }}>
              <span>{fi ? "Ilmoittaudu ennen 15. päivää" : "Enter before the 15th"}</span><span style={{ opacity: 0.5 }}>✦</span>
              <span>{fi ? "Jokainen luokka €5" : "Every class €5"}</span><span style={{ opacity: 0.5 }}>✦</span>
              <span>{fi ? "47 lisensioitua tuomaria" : "47 licensed judges"}</span><span style={{ opacity: 0.5 }}>✦</span>
              <span>{fi ? "Rusetit toimitetaan kotiin" : "Rosettes shipped to your door"}</span><span style={{ opacity: 0.5 }}>✦</span>
              <span>{fi ? "12 lajia auki" : "12 disciplines open"}</span><span style={{ opacity: 0.5 }}>✦</span>
              <span>{fi ? "Tulokset joka sunnuntai" : "Results every Sunday"}</span><span style={{ opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SHOWS OPEN THIS MONTH ── */}
      {openShows.length > 0 && (
        <section style={{ padding: "80px 0 40px" }}>
          <div className="page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
              <div>
                <div className="section-label">{fi ? "Tällä hetkellä auki" : "Open now"}</div>
                <h2 style={{ marginTop: 8 }}>{fi ? "Tämän kuun avoimet showt." : "Shows open this month."}</h2>
              </div>
              <Link href="/competitions" className="btn btn-secondary">{fi ? "Näytä kaikki →" : "View all →"}</Link>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-xl)", overflow: "hidden" }}>
              {openShows.map((show, idx) => {
                const parts = show.date.split(" ");
                const month = parts[0]?.slice(0, 3) ?? "";
                const day = parts[1]?.replace(/\D/g, "") ?? "1";
                return (
                  <Link key={show.id} href={`/competitions/${show.id}`}
                    style={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto", gap: 20, alignItems: "center", padding: "20px 24px", borderBottom: idx < openShows.length - 1 ? "1px solid var(--border)" : "none", textDecoration: "none", background: "white", transition: "background 0.15s", color: "inherit" }}>
                    <div style={{ textAlign: "center", background: "var(--brand-bg)", borderRadius: "var(--r-md)", padding: "10px 0" }}>
                      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, color: "var(--brand)" }}>{day}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--brand)", marginTop: 2 }}>{month}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{show.name}</div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Calendar size={13} /> {show.date}
                        </span>
                        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                          {show.classes.length} {fi ? "luokkaa" : "classes"}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--brand)" }}>
                      €5 <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>/{fi ? "luokka" : "class"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="badge badge-green"><span className="badge-dot" />{fi ? "Auki" : "Open"}</span>
                      <ChevronRight size={16} color="var(--text-subtle)" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--bg-muted)", padding: "80px 0" }}>
        <div className="page">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>{fi ? "Miten toimii" : "How it works"}</div>
            <h2 style={{ marginTop: 8 }}>{fi ? "Neljä askelta rusetille." : "Four steps to a rosette."}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: "var(--r-lg)", padding: 28, border: "1px solid var(--border)" }}>
                <div style={{ width: 40, height: 40, background: "var(--brand-bg)", border: "2px solid var(--brand-light)", borderRadius: "var(--r-md)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14, color: "var(--brand)", marginBottom: 20 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 style={{ marginBottom: 10 }}>{fi ? s.fi : s.en}</h4>
                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{fi ? s.descFi : s.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="page">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="section-label">{fi ? "Lajit" : "Disciplines"}</div>
              <h2 style={{ marginTop: 8 }}>{fi ? "Luokat jokaiselle ratsastajalle." : "Classes for every rider."}</h2>
            </div>
            <Link href="/competitions" className="btn btn-secondary">{fi ? "Kaikki lajit →" : "All disciplines →"}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {DISCIPLINES.map((d) => (
              <Link key={d.en} href="/competitions" className="discipline-tile">
                <span style={{ fontSize: 28 }}>{d.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{fi ? d.fi : d.en}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{d.count} {fi ? "luokkaa auki" : "open classes"}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIZES ── */}
      <section style={{ background: "var(--bg-muted)", padding: "80px 0" }}>
        <div className="page">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-label">{fi ? "Oikeat palkinnot" : "Real prizes"}</div>
              <h2 style={{ marginTop: 8 }}>{fi ? "Pieni maksu. Oikea palkinto." : "Low entry. Proper reward."}</h2>
              <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 440, marginTop: 20, lineHeight: 1.7 }}>
                {fi
                  ? "Jokainen luokka on €5. Jokainen osallistuja saa numeroidun rusetin postissa. Kolme parasta jakavat palkintopotin — ja kokonaisvoittaja voittaa €500."
                  : "Every class is €5. Every entrant receives a numbered rosette. The top three split a prize pool — and the overall champion wins €500 and a season sponsorship."}
              </p>
              <div style={{ display: "flex", gap: 40, marginTop: 36, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1 }}>€500</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>{fi ? "Kokonaisvoittaja" : "Overall champion"}</div>
                </div>
                <div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: "var(--brand)", lineHeight: 1 }}>100%</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>{fi ? "Saa rusetin" : "Get a rosette"}</div>
                </div>
              </div>
              <Link href="/sponsors" className="btn btn-secondary" style={{ marginTop: 28 }}>
                {fi ? "Katso kaikki palkinnot →" : "See all prizes →"}
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🥇", title: fi ? "1. sija" : "1st place", desc: fi ? "Rusetti + €100 + palkintopotin osuus" : "Rosette + €100 + prize pool share", bg: "var(--gold-bg)", border: "var(--gold-light)" },
                { icon: "🥈", title: fi ? "2. sija" : "2nd place", desc: fi ? "Rusetti + €50" : "Rosette + €50", bg: "var(--bg-subtle)", border: "var(--border)" },
                { icon: "🥉", title: fi ? "3. sija" : "3rd place", desc: fi ? "Rusetti + €25" : "Rosette + €25", bg: "var(--bg-subtle)", border: "var(--border)" },
                { icon: "🎀", title: fi ? "Kaikki osallistujat" : "All entrants", desc: fi ? "Numeroitu rusetti postissa" : "Numbered rosette by post", bg: "var(--brand-bg)", border: "var(--brand-light)" },
              ].map((p) => (
                <div key={p.title} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: "var(--r-lg)", padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="page" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>{fi ? "Tallilta" : "From the yard"}</div>
            <blockquote style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 600, lineHeight: 1.4, color: "var(--text)", marginTop: 24, letterSpacing: "-0.02em" }}>
              {fi ? (
                <>&ldquo;Asun kaksi tuntia lähimmästä kilpailusta. Nättely tarkoittaa, että tyttäreni voi kilpailla joka viikonloppu — <em style={{ color: "var(--brand)", fontStyle: "normal" }}>ja hän on oikeasti sijoittunut</em>. Rusetit ovat aitoja.&rdquo;</>
              ) : (
                <>&ldquo;I live two hours from the nearest judged show. Nättely means my daughter can compete every weekend — and <em style={{ color: "var(--brand)", fontStyle: "normal" }}>she&apos;s actually placed</em>. The rosettes are real.&rdquo;</>
              )}
            </blockquote>
            <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--brand-light)", display: "grid", placeItems: "center", fontWeight: 700, color: "var(--brand)", fontSize: 16 }}>MK</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Marja Koskinen</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{fi ? "Valmentaja · Tampere" : "Trainer · Tampere"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING ── */}
      {upcomingShows.length > 0 && (
        <section style={{ background: "var(--bg-muted)", padding: "60px 0" }}>
          <div className="page">
            <div className="section-label">{fi ? "Tulossa pian" : "Coming soon"}</div>
            <h2 style={{ marginTop: 8, marginBottom: 32 }}>{fi ? "Seuraavat kilpailut." : "Upcoming shows."}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {upcomingShows.map((show) => (
                <div key={show.id} style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 24 }}>
                  <span className="badge badge-gray" style={{ marginBottom: 16, display: "inline-flex" }}><span className="badge-dot" />{fi ? "Tulossa" : "Upcoming"}</span>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{show.name}</div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} /> {show.date}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
                    {show.classes.length} {fi ? "luokkaa" : "classes"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="page">
          <div style={{ background: "var(--brand)", borderRadius: "var(--r-xl)", padding: "clamp(40px, 6vw, 72px)", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                {fi ? "Valmis ilmoittautumaan?" : "Ready to enter?"}
              </div>
              <h2 style={{ color: "white", fontSize: "clamp(28px, 4vw, 48px)" }}>
                {fi ? "Seuraava rusetin on yhden ratsastuksen päässä." : "Your next rosette is one ride away."}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, margin: 0 }}>
                {fi ? "Selaa avoimia luokkia ja ilmoittaudu suoraan." : "Browse open classes and enter directly."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/competitions" className="btn btn-gold btn-lg">
                  {fi ? "Selaa kilpailuja →" : "Browse shows →"}
                </Link>
                <Link href="/sponsors" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
                  {fi ? "Sponsorit" : "Sponsors"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
