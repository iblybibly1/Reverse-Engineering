"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trophy, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getCompetition, getClass } from "@/lib/data";
import { getImageUrl, getEntryImages } from "@/lib/imageLoader";
import { useState, useCallback, useEffect } from "react";

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  isWinner,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isWinner: boolean;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }} aria-label="Close">
        <X size={20} />
      </button>

      <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500 }}>
        {currentIndex + 1} / {images.length}
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, width: "100%", margin: "0 16px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative", width: "100%", height: "75vh" }}>
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            style={{ objectFit: "contain" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/1200x800/e2e8f0/94a3b8?text=Image"; }}
          />
          {/* Watermark overlay */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none", opacity: 0.18 }}>
            <span style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 900, color: "white", letterSpacing: "0.04em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.2 }}>
              Nättely Suomi
            </span>
          </div>
          {isWinner && (
            <div style={{ position: "absolute", top: 16, left: 16, background: "var(--gold)", color: "white", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
              <Trophy size={14} /> Winner
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

export default function ClassPage() {
  const params = useParams();
  const id = params?.id as string;
  const classId = params?.classId as string;

  const competition = getCompetition(id);
  const cls = getClass(id, classId);

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  if (!competition || !cls) notFound();

  const winnerSrc = cls.winner ? getImageUrl(cls.folder, cls.winner) : null;
  const entrySrcs = getEntryImages(cls.folder, cls.entries);
  const allImages = winnerSrc ? [winnerSrc, ...entrySrcs] : entrySrcs;

  const goNext = useCallback(() => setModalIndex((p) => p !== null ? (p + 1) % allImages.length : 0), [allImages.length]);
  const goPrev = useCallback(() => setModalIndex((p) => p !== null ? (p - 1 + allImages.length) % allImages.length : 0), [allImages.length]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)", padding: "40px 0 36px" }}>
        <div className="page">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
            <Link href="/competitions" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Shows</Link>
            <span>/</span>
            <Link href={`/competitions/${id}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{competition.name}</Link>
            <span>/</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{cls.name}</span>
          </nav>

          <Link href={`/competitions/${id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 16, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Back to {competition.name}
          </Link>

          <h1 style={{ marginBottom: 8 }}>{cls.name}</h1>
          {cls.description && (
            <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 540, lineHeight: 1.65 }}>{cls.description}</p>
          )}

          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--brand)" }}>{allImages.length}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Entries</div>
            </div>
            {cls.winner && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Trophy size={14} /> {cls.winner.replace(/\.[^.]+$/, "")}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Winner</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="page" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {winnerSrc && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Trophy size={18} color="var(--gold)" />
              <h2 style={{ fontSize: 18, margin: 0 }}>Winner</h2>
            </div>
            <div
              style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", cursor: "pointer", maxWidth: 640, border: "2px solid var(--gold)" }}
              onClick={() => setModalIndex(0)}
            >
              <div style={{ position: "relative", paddingTop: "66%" }}>
                <Image
                  src={winnerSrc}
                  alt="Class winner"
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/800x600/fef3c7/d97706?text=Winner"; }}
                  priority
                />
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: "var(--gold)", color: "white", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                <Trophy size={12} /> Winner
              </div>
            </div>
          </section>
        )}

        {entrySrcs.length > 0 && (
          <section>
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>All Entries</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {entrySrcs.map((src, idx) => (
                <div
                  key={src}
                  style={{ position: "relative", paddingTop: "100%", borderRadius: "var(--r-md)", overflow: "hidden", cursor: "pointer", border: "1px solid var(--border)" }}
                  onClick={() => setModalIndex(winnerSrc ? idx + 1 : idx)}
                >
                  <Image
                    src={src}
                    alt={`Entry ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/400x400/f1f5f9/94a3b8?text=Entry"; }}
                  />
                  <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 11, fontWeight: 600, color: "white", background: "rgba(0,0,0,0.5)", borderRadius: 4, padding: "2px 6px" }}>
                    Entry {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {allImages.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <Trophy size={48} color="var(--text-subtle)" style={{ margin: "0 auto 16px", display: "block" }} />
            <p style={{ fontSize: 16, fontWeight: 600 }}>No entries yet</p>
          </div>
        )}
      </div>

      {modalIndex !== null && (
        <LightboxModal
          images={allImages}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNext={goNext}
          onPrev={goPrev}
          isWinner={modalIndex === 0 && winnerSrc !== null}
        />
      )}
    </div>
  );
}
