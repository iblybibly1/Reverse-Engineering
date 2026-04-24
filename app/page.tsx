"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllCompetitions } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

const SHOWS = [
  { day: "14", mo: "Jun", title: "Midsummer Qualifier", series: "Suomi Open series · Prelim → Advanced", disc: "Dressage · Working Hunter", entries: 147, open: true },
  { day: "21", mo: "Jun", title: "Youth Pony Club Spring", series: "Under-16 · All abilities", disc: "In-Hand · Showmanship", entries: 82, open: true },
  { day: "28", mo: "Jun", title: "Nordic Eventing Invitational", series: "Dressage test · BE90–BE100", disc: "Eventing · Dressage", entries: 61, open: false },
  { day: "05", mo: "Jul", title: "Working Hunter Summer Series", series: "Round 2 of 4 · Open & Novice", disc: "Working Hunter", entries: null as number | null, open: false },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const fi = lang === "fi";
  const competitions = getAllCompetitions();
  const featured = competitions[0];

  const S = { fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--ink-soft)" };

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }}>

      {/* ── HERO ── */}
      <main className="page">
        <section style={{ padding: "48px 0 80px", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "end" }}>
            <div>
              <div className="kicker" style={{ marginBottom: 32 }}>Est. Helsinki · 2026 · {fi ? "Online-hevosshowt" : "Online horse shows"}</div>
              <h1 style={{ fontSize: "clamp(56px,8.5vw,128px)", letterSpacing: "-0.035em", fontWeight: 350 }}>
                {fi ? <>Kilpaile<br />tallilta.<br />Voita <em style={{ color: "var(--brass-dark)" }}>oikea</em><br />rusetti.</> : <>Ride from<br />the yard.<br />Win <em style={{ color: "var(--brass-dark)" }}>real</em><br />rosettes.</>}
              </h1>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", margin: "32px 0 28px" }}>
                {[{ num: "€5", label: fi ? "Luokkamaksu" : "Per class entry" }, { num: "47", label: fi ? "Lisensoidut tuomarit" : "Licensed judges" }, { num: "12", label: fi ? "Lajia" : "Disciplines" }].map(({ num, label }) => (
                  <div key={label}>
                    <div className="bignum" style={{ fontSize: 48 }}>{num}</div>
                    <span style={S}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/competitions" className="btn-suomi lg">{fi ? "Selaa kilpailuja" : "Browse shows"} <span className="arrow">→</span></Link>
                <Link href="/about" className="btn-suomi ghost lg">{fi ? "Miten toimii" : "How it works"}</Link>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ position: "relative", aspectRatio: "4/5", width: "100%", overflow: "hidden" }}>
                <Image src="/images/hero-horse.jpg" alt="Horse show" fill style={{ objectFit: "cover" }} priority />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", ...S }}>
                <span>No.001 — {fi ? "Kevätkilpailu" : "Spring Qualifier"}</span>
                <span>Helsinki → Online</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── TICKER ── */}
      <div style={{ padding: "18px 0", background: "var(--ink)", color: "var(--paper)", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap", animation: "suomi-scroll 60s linear infinite" }}>
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "flex", gap: 48, flexShrink: 0 }}>
              <span>{fi ? "Ilmoittaudu ennen 15. päivää" : "Enter by the 15th"}</span><span style={{ color: "var(--brass)" }}>✦</span>
              <span>{fi ? "Kouluratsastus — €5" : "Dressage Prelim — €5"}</span><span style={{ color: "var(--brass)" }}>✦</span>
              <span>{fi ? "Nuorten ratsastus — €5" : "Working Hunter Youth — €5"}</span><span style={{ color: "var(--brass)" }}>✦</span>
              <span>{fi ? "Tulokset joka sunnuntai" : "Live results every Sunday"}</span><span style={{ color: "var(--brass)" }}>✦</span>
              <span>{fi ? "47 tuomaria · 12 lajia" : "47 judges · 12 disciplines"}</span><span style={{ color: "var(--brass)" }}>✦</span>
              <span>{fi ? "Rusetit toimitetaan kotiin" : "Rosettes shipped worldwide"}</span><span style={{ color: "var(--brass)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED SHOW ── */}
      <main className="page">
        <section>
          <div className="section-head">
            <div>
              <div className="kicker" style={{ marginBottom: 20 }}>{fi ? "Nostettu esiin" : "Featured show"}</div>
              <h2>{fi ? <>Kesäkuun Qualifier —<br />ilmoittautuminen auki.</> : <>The Midsummer Qualifier —<br />open for entries.</>}</h2>
            </div>
            <Link href={featured ? `/competitions/${featured.id}` : "/competitions"} className="link-arrow">{fi ? "Katso ohjelma →" : "See full programme →"}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--rule)", background: "var(--paper)" }}>
            <div style={{ position: "relative", aspectRatio: "5/4" }}>
              <Image src="/images/hero-horse.jpg" alt="Featured show" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="suomi-tag brass-tag"><span className="dot" />{fi ? "Ilmoittautuminen auki" : "Entries open"}</span>
                <span className="suomi-tag">{fi ? "Sulkeutuu 20. kesäk." : "Closes 20 Jun"}</span>
              </div>
              <h3 style={{ fontSize: 40 }}>{fi ? "Kesäkuun Qualifier" : "Midsummer Qualifier"}<br /><em style={{ color: "var(--ink-soft)", fontSize: 28 }}>{fi ? "— Suomi Open 2026" : "— Suomi Open 2026"}</em></h3>
              <p style={{ color: "var(--ink-soft)", maxWidth: 460 }}>{fi ? "Seitsemän luokkaa kouluratsastuksessa, ratsukkoluokissa ja in-hand. Lisensoitu tuomari. Voittajat etenevät finaaliin lokakuussa." : "Seven classes across dressage, working hunter and in-hand. Licensed FEI judges. Winners ride through to the Suomi Open Final in October."}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, padding: "20px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
                {[{ num: "14", label: fi ? "Kesäkuuta" : "June opens" }, { num: "€5", label: fi ? "Per luokka" : "Per class" }, { num: "7", label: fi ? "Luokkaa" : "Classes" }].map(({ num, label }) => (
                  <div key={label}><div className="bignum" style={{ fontSize: 36 }}>{num}</div><span style={{ ...S, marginTop: 4, display: "block" }}>{label}</span></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href={featured ? `/competitions/${featured.id}` : "/competitions"} className="btn-suomi">{fi ? "Ilmoittaudu →" : "Enter now →"}</Link>
                <Link href="/competitions" className="btn-suomi ghost">{fi ? "Näytä tiedot" : "View details"}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── HOW IT WORKS ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div className="section-head">
            <div>
              <div className="kicker" style={{ marginBottom: 20 }}>{fi ? "Miten toimii" : "How it works"}</div>
              <h2>{fi ? <>Neljä askelta tallilta<br />rusetin postilaatikkoosi.</> : <>Four steps between<br />your arena and a rosette.</>}</h2>
            </div>
            <Link href="/about" className="link-arrow">{fi ? "Koko tarina →" : "The full story →"}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--rule)" }}>
            {[
              { n: "01", title: fi ? "Valitse luokka" : "Pick a class", desc: fi ? "Selaa yli 60 luokkaa kuukausittain. Jokainen luokka on €5." : "Browse 60+ classes every month. Filter by discipline and level. Every class is €5." },
              { n: "02", title: fi ? "Kuvaa suorituksesi" : "Film your round", desc: fi ? "Yksi editoimaton otto. Kuvaa puhelimella maneesissa." : "One unedited take. Shoot on a phone from the arena. We publish the exact framing guide." },
              { n: "03", title: fi ? "Lisensioitu pisteytys" : "Licensed scoring", desc: fi ? "FEI-hyväksytyt tuomarit pisteyttävät 72 tunnin sisällä täydellisellä palautteella." : "FEI-credentialed judges score within 72 hours, with full feedback." },
              { n: "04", title: fi ? "Oikeat rusetit" : "Real rosettes", desc: fi ? "Jokainen osallistuja saa rusetin. Kolme parasta jakavat palkintopotin." : "Every entrant receives a rosette. Top three receive prize money, delivered to your yard." },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: 40, paddingLeft: i === 0 ? 0 : 32, paddingRight: i === 3 ? 0 : 32, borderRight: i < 3 ? "1px solid var(--rule)" : "none" }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 14, color: "var(--brass-dark)", marginBottom: 48, fontStyle: "italic" }}>N<sup>o</sup> {s.n}</div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 350, letterSpacing: "-0.015em", marginBottom: 12 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── DISCIPLINES ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div className="section-head">
            <div>
              <div className="kicker" style={{ marginBottom: 20 }}>{fi ? "Lajit" : "Disciplines"}</div>
              <h2>{fi ? "Luokat jokaiselle ratsastajalle." : "Classes for every rider."}</h2>
            </div>
            <Link href="/competitions" className="link-arrow">{fi ? "Kaikki lajit →" : "All disciplines →"}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid var(--rule)" }}>
            {[
              { count: "12", name: fi ? "Kouluratsastus" : "Dressage" },
              { count: "09", name: fi ? "Ratsukkoluokka" : "Working Hunter" },
              { count: "06", name: fi ? "Esteet" : "Showjumping" },
              { count: "07", name: fi ? "Näyttelyluokka" : "Showmanship" },
            ].map((d, i) => (
              <Link key={d.name} href="/competitions"
                style={{ aspectRatio: "1", borderRight: i < 3 ? "1px solid var(--rule)" : "none", padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                <div style={S}>{d.count} {fi ? "luokkaa auki" : "open classes"}</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 28 }}>{d.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── UPCOMING SHOWS ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div className="section-head">
            <div>
              <div className="kicker" style={{ marginBottom: 20 }}>{fi ? "Tulevat" : "Upcoming"}</div>
              <h2>{fi ? "Tämän kuun avoimet showt." : "Shows open this month."}</h2>
            </div>
            <Link href="/competitions" className="link-arrow">{fi ? "Näytä kaikki →" : "View all →"}</Link>
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            {SHOWS.map((s) => (
              <Link key={s.title} href="/competitions"
                style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 120px 120px 150px", gap: 24, alignItems: "center", padding: "24px 0", borderBottom: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic" }}>
                  <div style={{ fontSize: 32, lineHeight: 1 }}>{s.day}</div>
                  <span style={{ ...S, marginTop: 6, display: "block", fontStyle: "normal" }}>{s.mo}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 22 }}>{s.title}</div>
                  <div style={S}>{s.series}</div>
                </div>
                <div style={S}>{s.disc}</div>
                <div style={{ fontSize: 14 }}>
                  {s.entries !== null ? <><span style={{ fontFamily: "var(--f-display)", fontSize: 20 }}>{s.entries}</span> <span style={{ color: "var(--ink-soft)" }}>{fi ? "os." : "entries"}</span></> : <span style={{ fontFamily: "var(--f-display)", fontSize: 20 }}>—</span>}
                </div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 20 }}>€5 <span style={{ ...S, fontSize: 10 }}>{fi ? "/ luokka" : "/ class"}</span></div>
                {s.open
                  ? <span className="suomi-tag brass-tag"><span className="dot" />{fi ? "Auki" : "Open"}</span>
                  : <span className="suomi-tag"><span className="dot" />{fi ? "Aukeaa pian" : "Opens soon"}</span>}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── PRIZE STORY ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="kicker" style={{ marginBottom: 24 }}>{fi ? "Oikeat rusetit. Oikeat palkinnot." : "Real rosettes. Real prizes."}</div>
              <h2>{fi ? <>Pieni maksu.<br />Oikea palkinto.</> : <>Low entry.<br />Proper reward.</>}</h2>
              <p style={{ fontSize: 18, maxWidth: 480, marginTop: 24, color: "var(--ink-2)" }}>
                {fi ? "Jokainen luokka on €5. Jokainen osallistuja saa numeroidun rusetin. Kolme parasta jakavat palkintopotin — ja kokonaisvoittaja voittaa €500." : "Every class is €5. Every entrant receives a numbered rosette. The top three split a prize pool — and the overall champion wins €500 and a season sponsorship."}
              </p>
              <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--rule)" }}>
                <div><div className="bignum" style={{ fontSize: 56 }}>€500</div><span style={S}>{fi ? "Kokonaisvoittaja" : "Overall champion"}</span></div>
                <div><div className="bignum" style={{ fontSize: 56 }}>100%</div><span style={S}>{fi ? "Saa rusetin" : "Get a rosette"}</span></div>
              </div>
              <Link href="/sponsors" className="link-arrow" style={{ marginTop: 40, display: "inline-flex" }}>{fi ? "Katso kaikki palkinnot →" : "See all prizes →"}</Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 240 240" width="240" height="240">
                <defs>
                  <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                    <rect width="2" height="4" fill="#b8924f"/><rect x="2" width="2" height="4" fill="#8a6b36"/>
                  </pattern>
                </defs>
                <g transform="translate(120 100)">
                  <circle r="78" fill="url(#stripes)" stroke="#8a6b36" strokeWidth="1"/>
                  <circle r="78" fill="none" stroke="#0f1310" strokeWidth="0.5" strokeDasharray="2 3"/>
                  <circle r="60" fill="#eee7d5" stroke="#0f1310" strokeWidth="0.5"/>
                  <circle r="58" fill="none" stroke="#b8924f" strokeWidth="0.5"/>
                  <text textAnchor="middle" y="-8" fontFamily="Fraunces, serif" fontSize="11" fill="#0f1310" letterSpacing="2">SUOMI</text>
                  <text textAnchor="middle" y="14" fontFamily="Fraunces, serif" fontSize="32" fontStyle="italic" fill="#0f1310">1st</text>
                  <text textAnchor="middle" y="36" fontFamily="JetBrains Mono" fontSize="7" fill="#4a4f49" letterSpacing="1.5">CHAMPION</text>
                </g>
                <path d="M90 160 L78 230 L100 210 L110 240 L120 170 Z" fill="#b8924f" stroke="#8a6b36" strokeWidth="1"/>
                <path d="M150 160 L162 230 L140 210 L130 240 L120 170 Z" fill="#8a6b36" stroke="#6d5525" strokeWidth="1"/>
              </svg>
            </div>
          </div>
        </section>
      </main>

      {/* ── TESTIMONIAL ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="kicker" style={{ marginBottom: 32 }}>{fi ? "Tallilta" : "From the yard"}</div>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.2, letterSpacing: "-0.015em", fontWeight: 350 }}>
              {fi
                ? <>&ldquo;Asun kaksi tuntia lähimmästä kilpailusta. Suomi tarkoittaa, että tyttäreni voi kilpailla joka viikonloppu — <em style={{ color: "var(--brass-dark)" }}>ja hän on oikeasti sijoittunut</em>. Rusetit ovat aitoja.&rdquo;</>
                : <>&ldquo;I live two hours from the nearest judged show. Suomi means my daughter can compete every weekend — and <em style={{ color: "var(--brass-dark)" }}>she&apos;s actually placed</em>. The rosettes are real.&rdquo;</>}
            </p>
            <div style={{ marginTop: 48, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--bone)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", ...S }}>MK</div>
              <div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 20 }}>Marja Koskinen</div>
                <div style={S}>{fi ? "Valmentaja · Tampere" : "Trainer · Tampere"}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── CTA ── */}
      <main className="page">
        <section style={{ paddingTop: 40 }}>
          <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "clamp(48px,8vw,96px)", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "end" }}>
            <div>
              <div className="kicker" style={{ color: "var(--brass)", marginBottom: 24 }}>{fi ? "Valmis ilmoittautumaan?" : "Ready to enter?"}</div>
              <h2 style={{ color: "var(--paper)", fontSize: "clamp(40px,6vw,88px)" }}>
                {fi ? <>Seuraava rusettisi<br />on yhden ratsastuksen päässä.</> : <>Your next rosette<br />is one ride away.</>}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <p style={{ color: "#c4bca9", maxWidth: 360 }}>{fi ? "Selaa avoimia luokkia ja ilmoittaudu suoraan." : "Browse open classes and enter directly."}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/competitions" className="btn-suomi brass-btn">{fi ? "Selaa kilpailuja →" : "Browse shows →"}</Link>
                <Link href="/sponsors" className="btn-suomi" style={{ background: "transparent", color: "var(--paper)", borderColor: "var(--paper)" }}>{fi ? "Sponsorit" : "Sponsors"}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
