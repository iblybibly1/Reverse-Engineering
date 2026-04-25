"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, Trophy } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <CheckCircle size={36} color="var(--brand)" />
      </div>

      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Payment confirmed!</h1>
      <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.7, marginBottom: 8 }}>
        Your entries have been received. We will review your photos and notify you of the results by email.
      </p>
      <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
        Winners receive a real rosette posted directly to your door. 🐴
      </p>

      {sessionId && (
        <p style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 32, fontFamily: "monospace" }}>
          Ref: {sessionId}
        </p>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/competitions" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Trophy size={16} /> Browse more shows
        </Link>
        <Link href="/" className="btn btn-secondary">Back to home</Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
