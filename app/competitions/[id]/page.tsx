"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Trophy, ChevronRight } from "lucide-react";
import { getCompetition } from "@/lib/data";
import EntryModal from "@/components/ui/EntryModal";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  if (status === "open") return <span className="badge badge-green"><span className="badge-dot" />Entries open</span>;
  if (status === "upcoming") return <span className="badge badge-gray"><span className="badge-dot" />Coming soon</span>;
  return <span className="badge badge-gold"><span className="badge-dot" />Results out</span>;
}

export default function CompetitionPage() {
  const params = useParams();
  const id = params?.id as string;
  const competition = getCompetition(id);
  const [modalClass, setModalClass] = useState<{ id: string; name: string } | null>(null);

  if (!competition) notFound();

  const isOpen = competition.status === "open";
  const isCompleted = competition.status === "completed" || competition.status === "ongoing";

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)", padding: "40px 0 36px" }}>
        <div className="page">
          <Link href="/competitions" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 20, fontWeight: 500 }}>
            <ArrowLeft size={14} /> All shows
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <StatusBadge status={competition.status} />
            {competition.closingDate && isOpen && (
              <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={13} />
                Closes {new Date(competition.closingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {competition.date && (
              <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={13} /> {competition.date}
              </span>
            )}
          </div>

          <h1 style={{ marginBottom: 12 }}>{competition.name}</h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.65 }}>{competition.description}</p>

          <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--brand)" }}>{competition.classes.length}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Classes</div>
            </div>
            {isOpen && (
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--gold)" }}>€5</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Per class</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Classes */}
      <div className="page" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>
          {isCompleted ? "Classes & Results" : "Classes"}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {competition.classes.map((cls) => (
            <div key={cls.id} className="card">
              <div className="card-body">
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{cls.name}</div>
                {cls.description && (
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.6 }}>{cls.description}</p>
                )}

                {isCompleted ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {cls.winner && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                        <Trophy size={14} color="var(--gold)" />
                        <span style={{ color: "var(--text-muted)" }}>Winner:</span>
                        <span style={{ fontWeight: 600 }}>{cls.winner}</span>
                      </div>
                    )}
                    <Link href={`/competitions/${competition.id}/classes/${cls.id}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--brand)", display: "flex", alignItems: "center", gap: 4, textDecoration: "none", marginLeft: "auto" }}>
                      View results <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : isOpen ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)" }}>€5</span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setModalClass({ id: cls.id, name: cls.name })}
                    >
                      Enter this class
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Entries open soon</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {competition.classes.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <p>No classes added yet. Check back soon.</p>
          </div>
        )}
      </div>

      {modalClass && (
        <EntryModal
          competitionId={competition.id}
          competitionName={competition.name}
          classId={modalClass.id}
          className={modalClass.name}
          onClose={() => setModalClass(null)}
        />
      )}
    </div>
  );
}
