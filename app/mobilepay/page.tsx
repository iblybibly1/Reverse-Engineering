"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Smartphone, CheckCircle, ArrowLeft, Copy } from "lucide-react";
import { useState } from "react";

export default function MobilePayPage() {
  const { items, total } = useCart();
  const [copied, setCopied] = useState(false);

  const mobilepayLink = process.env.NEXT_PUBLIC_MOBILEPAY_LINK || "";
  const mobilepayPhone = process.env.NEXT_PUBLIC_MOBILEPAY_PHONE || "";

  const participantNames = [...new Set(items.map((i) => i.entry.participantName))].join(", ");
  const paymentNote = participantNames || "Your full name";

  function copyNote() {
    navigator.clipboard.writeText(paymentNote).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)", padding: "40px 0 36px" }}>
        <div className="page">
          <Link href="/cart" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 20, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Back to cart
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Smartphone size={28} color="var(--brand)" />
            <h1>Pay with MobilePay</h1>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
            Complete your payment of <strong>€{total.toFixed(2)}</strong> via MobilePay.
          </p>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 680 }}>
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {([
            {
              step: 1,
              title: "Open MobilePay",
              body: mobilepayLink ? (
                <span>
                  Scan the QR code below or{" "}
                  <a href={mobilepayLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontWeight: 600 }}>open this link</a>.
                </span>
              ) : mobilepayPhone ? (
                <span>Send payment to phone number <strong>{mobilepayPhone}</strong>.</span>
              ) : (
                <span>Open your MobilePay app and send the payment.</span>
              ),
            },
            {
              step: 2,
              title: `Send €${total.toFixed(2)}`,
              body: <span>Enter the exact amount: <strong>€{total.toFixed(2)}</strong>.</span>,
            },
            {
              step: 3,
              title: "Write your full name in the note",
              body: (
                <div>
                  <p style={{ marginBottom: 10 }}>
                    In the payment note/message field, write your <strong>full name</strong> so we can match your payment to your entry.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-muted)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "10px 14px" }}>
                    <code style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{paymentNote}</code>
                    <button onClick={copyNote} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--brand)", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                      {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ),
            },
            {
              step: 4,
              title: "Email confirmation",
              body: <span>Once we receive your payment we will email your entry confirmation within 24 hours.</span>,
            },
          ] as { step: number; title: string; body: React.ReactNode }[]).map(({ step, title, body }) => (
            <div key={step} style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--brand)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                {step}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* QR code */}
        {mobilepayLink && (
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", padding: 16, border: "2px solid var(--border)", borderRadius: "var(--r-lg)", background: "white" }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(mobilepayLink)}`}
                alt="MobilePay QR code"
                width={180}
                height={180}
                style={{ display: "block", borderRadius: 4 }}
              />
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10 }}>Scan with your phone camera</p>
          </div>
        )}

        {/* Entry summary */}
        {items.length > 0 && (
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="card-body">
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Your entries</div>
              {items.map((item) => (
                <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  <span>
                    {item.className}{" "}
                    <span style={{ color: "var(--text-muted)" }}>— {item.competitionName}</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>€{item.priceEur.toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, paddingTop: 12 }}>
                <span>Total</span>
                <span style={{ color: "var(--brand)" }}>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/competitions" className="btn btn-primary">Browse more shows</Link>
          <Link href="/cart" className="btn btn-secondary">Back to cart</Link>
        </div>
      </div>
    </div>
  );
}
