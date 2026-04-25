"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash2, CreditCard, Smartphone, ChevronRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

type PaymentMethod = "stripe" | "mobilepay";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;
    setError(null);

    if (paymentMethod === "mobilepay") {
      window.location.href = "/mobilepay";
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
        <ShoppingCart size={56} color="var(--text-subtle)" style={{ marginBottom: 24 }} />
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Your cart is empty</h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 32, maxWidth: 400 }}>
          Browse open shows and add entry classes to your cart.
        </p>
        <Link href="/competitions" className="btn btn-primary">Browse shows</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)", padding: "40px 0 36px" }}>
        <div className="page">
          <Link href="/competitions" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 20, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Continue browsing
          </Link>
          <h1 style={{ marginBottom: 8 }}>Your Cart</h1>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>{items.length} entr{items.length !== 1 ? "ies" : "y"} · €{total.toFixed(2)} total</p>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr min(400px, 100%)", gap: 40, alignItems: "start" }}>
          {/* Items */}
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 20 }}>Entries</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.cartId} className="card">
                  <div className="card-body" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {item.entry.imageBase64 && (
                      <div style={{ width: 72, height: 72, borderRadius: "var(--r-md)", overflow: "hidden", flexShrink: 0, border: "1px solid var(--border)" }}>
                        <Image src={item.entry.imageBase64} alt="Horse" width={72} height={72} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{item.className}</div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{item.competitionName}</div>
                      <div style={{ fontSize: 13, marginTop: 6, display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span><span style={{ color: "var(--text-muted)" }}>Rider: </span>{item.entry.participantName}</span>
                        <span><span style={{ color: "var(--text-muted)" }}>Horse: </span>{item.entry.horseName}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: "var(--brand)" }}>€{item.priceEur.toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-subtle)", padding: 4 }}
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary + payment */}
          <div style={{ position: "sticky", top: 24 }}>
            <div className="card">
              <div className="card-body">
                <h2 style={{ fontSize: 18, marginBottom: 20 }}>Order summary</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {items.map((item) => (
                    <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                      <span style={{ color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{item.className}</span>
                      <span style={{ fontWeight: 600, flexShrink: 0 }}>€{item.priceEur.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: 22, color: "var(--brand)" }}>€{total.toFixed(2)}</span>
                </div>

                {/* Payment method */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Payment method</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: "var(--r-md)", border: `2px solid ${paymentMethod === "stripe" ? "var(--brand)" : "var(--border)"}`, cursor: "pointer", background: paymentMethod === "stripe" ? "var(--brand-pale)" : "var(--bg)" }}>
                      <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} style={{ accentColor: "var(--brand)" }} />
                      <CreditCard size={18} color={paymentMethod === "stripe" ? "var(--brand)" : "var(--text-muted)"} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>Card payment</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Visa, Mastercard via Stripe</div>
                      </div>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: "var(--r-md)", border: `2px solid ${paymentMethod === "mobilepay" ? "var(--brand)" : "var(--border)"}`, cursor: "pointer", background: paymentMethod === "mobilepay" ? "var(--brand-pale)" : "var(--bg)" }}>
                      <input type="radio" name="payment" value="mobilepay" checked={paymentMethod === "mobilepay"} onChange={() => setPaymentMethod("mobilepay")} style={{ accentColor: "var(--brand)" }} />
                      <Smartphone size={18} color={paymentMethod === "mobilepay" ? "var(--brand)" : "var(--text-muted)"} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>MobilePay</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Pay with QR code or link</div>
                      </div>
                    </label>
                  </div>
                </div>

                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--r-sm)", padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button
                  className="btn btn-primary btn-full"
                  onClick={handleCheckout}
                  disabled={loading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  {loading ? "Redirecting…" : (
                    <>
                      {paymentMethod === "stripe" ? "Pay with card" : "Continue to MobilePay"}
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>

                <button
                  onClick={clearCart}
                  style={{ width: "100%", marginTop: 10, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--text-subtle)", padding: "6px 0" }}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
