"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <XCircle size={36} color="var(--text-muted)" />
      </div>

      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Payment cancelled</h1>
      <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 400, lineHeight: 1.7, marginBottom: 32 }}>
        No worries — your cart is still saved. You can try again whenever you&apos;re ready.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/cart" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={16} /> Back to cart
        </Link>
        <Link href="/competitions" className="btn btn-secondary">Browse shows</Link>
      </div>
    </div>
  );
}
