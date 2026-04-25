import Link from "next/link";
import { getAllCompetitions } from "@/lib/data";
import { Calendar, ChevronRight, Trophy, Clock } from "lucide-react";

export const metadata = {
  title: "Shows — Nättely Suomi",
  description: "Browse all online horse shows. Open, upcoming, and completed competitions.",
};

function StatusBadge({ status }: { status: string }) {
  if (status === "open") return <span className="badge badge-green"><span className="badge-dot" />Entries open</span>;
  if (status === "upcoming") return <span className="badge badge-gray"><span className="badge-dot" />Coming soon</span>;
  return <span className="badge badge-gold"><span className="badge-dot" />Results out</span>;
}

export default function CompetitionsPage() {
  const all = getAllCompetitions();
  const open = all.filter((c) => c.status === "open");
  const upcoming = all.filter((c) => c.status === "upcoming");
  const completed = all.filter((c) => c.status === "completed" || c.status === "ongoing");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)", padding: "48px 0 40px" }}>
        <div className="page">
          <div className="section-label">Nättely Suomi</div>
          <h1 style={{ marginTop: 8 }}>All Shows</h1>
          <p style={{ fontSize: 17, color: "var(--text-muted)", marginTop: 12, maxWidth: 520 }}>
            Browse open and upcoming competitions. Every class costs €5. Winners receive rosettes posted directly to their door.
          </p>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {open.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, margin: 0 }}>Open for entries</h2>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{open.length} show{open.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
              {open.map((c) => (
                <Link key={c.id} href={`/competitions/${c.id}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: 4, background: "var(--brand)", borderRadius: "var(--r-lg) var(--r-lg) 0 0" }} />
                    <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <StatusBadge status={c.status} />
                        {c.closingDate && (
                          <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={12} />
                            Closes {new Date(c.closingDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: 18, marginBottom: 8 }}>{c.name}</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6, flex: 1 }}>{c.description}</p>
                      <div style={{ display: "flex", gap: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--brand)" }}>{c.classes.length}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>classes</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--gold)" }}>€5</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>per class</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--brand)", display: "flex", alignItems: "center", gap: 4 }}>
                            Enter now <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, margin: 0 }}>Coming soon</h2>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{upcoming.length} show{upcoming.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
              {upcoming.map((c) => (
                <Link key={c.id} href={`/competitions/${c.id}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ opacity: 0.85 }}>
                    <div className="card-body">
                      <StatusBadge status={c.status} />
                      <h3 style={{ fontSize: 18, margin: "12px 0 8px" }}>{c.name}</h3>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 16px", lineHeight: 1.6 }}>{c.description}</p>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--text-muted)" }}>
                        <Calendar size={13} /> {c.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <Trophy size={18} color="var(--gold)" />
              <h2 style={{ fontSize: 22, margin: 0 }}>Past shows</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {completed.map((c) => (
                <Link key={c.id} href={`/competitions/${c.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 20 }}>
                    <StatusBadge status={c.status} />
                    <div style={{ fontWeight: 700, fontSize: 16, margin: "12px 0 6px" }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={12} /> {c.date}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--brand)", marginTop: 8, fontWeight: 500 }}>View results →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {all.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Trophy size={48} color="var(--text-subtle)" style={{ margin: "0 auto 16px", display: "block" }} />
            <p style={{ fontSize: 18, fontWeight: 600, color: "var(--text-muted)" }}>No competitions yet</p>
            <p style={{ fontSize: 14, color: "var(--text-subtle)", marginTop: 8 }}>Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
