"use client";

import Link from "next/link";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CartDrawer() {
  const { items, removeItem, total, count, isOpen, closeCart } = useCart();
  const { lang } = useLanguage();
  const fi = lang === "fi";

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={closeCart} />
      <div className="drawer">
        <div className="drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart size={20} color="var(--brand)" />
            <h4 style={{ margin: 0 }}>{fi ? "Ostoskori" : "Your cart"}</h4>
            {count > 0 && (
              <span style={{ background: "var(--brand)", color: "white", borderRadius: "var(--r-full)", fontSize: 12, fontWeight: 700, padding: "2px 8px" }}>
                {count}
              </span>
            )}
          </div>
          <button className="modal-close" onClick={closeCart}><X size={16} /></button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <ShoppingCart size={40} color="var(--text-subtle)" style={{ margin: "0 auto 16px", display: "block" }} />
              <p style={{ color: "var(--text-muted)", fontSize: 15, margin: 0 }}>
                {fi ? "Korisi on tyhjä" : "Your cart is empty"}
              </p>
              <p style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 6 }}>
                {fi ? "Selaa kilpailuja ja lisää luokkia koriin." : "Browse shows and add classes to enter."}
              </p>
              <Link href="/competitions" className="btn btn-primary btn-sm" style={{ marginTop: 16, display: "inline-flex" }} onClick={closeCart}>
                {fi ? "Selaa kilpailuja" : "Browse shows"}
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.cartId} style={{ background: "var(--bg-muted)", borderRadius: "var(--r-md)", padding: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    {item.entry.imageBase64 && (
                      <img
                        src={item.entry.imageBase64}
                        alt={item.entry.horseName}
                        style={{ width: 56, height: 56, objectFit: "cover", borderRadius: "var(--r)", flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.className}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>{item.competitionName}</div>
                      <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                        {item.entry.horseName} · {item.entry.participantName}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, color: "var(--brand)", fontSize: 15 }}>€{item.priceEur}</span>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        style={{ color: "var(--danger)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}
                      >
                        <Trash2 size={13} />
                        {fi ? "Poista" : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
                {fi ? `${count} luokkaa` : `${count} ${count === 1 ? "class" : "classes"}`}
              </span>
              <div>
                <span style={{ fontSize: 14, color: "var(--text-muted)", marginRight: 8 }}>{fi ? "Yhteensä" : "Total"}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>€{total}</span>
              </div>
            </div>
            <Link href="/cart" className="btn btn-primary btn-full" style={{ display: "flex" }} onClick={closeCart}>
              {fi ? "Siirry kassalle" : "Proceed to checkout"}
              <ArrowRight size={16} />
            </Link>
            <button className="btn btn-ghost btn-full" style={{ marginTop: 8 }} onClick={closeCart}>
              {fi ? "Jatka selailua" : "Continue browsing"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
