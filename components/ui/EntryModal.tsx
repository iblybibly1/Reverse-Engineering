"use client";

import { useState, useRef, useCallback } from "react";
import { X, Upload, Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

interface EntryModalProps {
  competitionId: string;
  competitionName: string;
  classId: string;
  className: string;
  onClose: () => void;
}

interface FormState {
  participantName: string;
  horseName: string;
  horseAge: string;
  phone: string;
  address: string;
}

const EMPTY: FormState = { participantName: "", horseName: "", horseAge: "", phone: "", address: "" };

export default function EntryModal({ competitionId, competitionName, classId, className, onClose }: EntryModalProps) {
  const { lang } = useLanguage();
  const fi = lang === "fi";
  const { addItem } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [imageFileName, setImageFileName] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [imageError, setImageError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const processFile = useCallback((file: File) => {
    setImageError("");
    if (!file.type.startsWith("image/")) {
      setImageError(fi ? "Lataa kuvatiedosto (JPG, PNG)" : "Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImageError(fi ? "Kuva liian suuri (max 10 MB)" : "Image too large (max 10 MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      setImageBase64(b64);
      setImagePreview(b64);
      setImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  }, [fi]);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.participantName.trim()) e.participantName = fi ? "Pakollinen" : "Required";
    if (!form.horseName.trim()) e.horseName = fi ? "Pakollinen" : "Required";
    if (!form.horseAge.trim()) e.horseAge = fi ? "Pakollinen" : "Required";
    if (!form.phone.trim()) e.phone = fi ? "Pakollinen" : "Required";
    if (!form.address.trim()) e.address = fi ? "Pakollinen" : "Required";
    setErrors(e);
    if (!imageBase64) {
      setImageError(fi ? "Lataa kuva hevosestasi" : "Please upload a photo of your horse");
      return false;
    }
    return Object.keys(e).length === 0;
  };

  const handleAddToCart = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      addItem({
        competitionId, competitionName, classId, className, priceEur: 5,
        entry: {
          participantName: form.participantName.trim(),
          horseName: form.horseName.trim(),
          horseAge: form.horseAge.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          imageBase64,
          imageFileName,
        },
      });
      setAdded(true);
      setLoading(false);
      setTimeout(onClose, 1400);
    }, 300);
  };

  if (added) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" style={{ maxWidth: 360, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-body" style={{ padding: "48px 32px" }}>
            <CheckCircle size={48} style={{ color: "var(--brand)", margin: "0 auto 16px", display: "block" }} />
            <h3 style={{ marginBottom: 8 }}>{fi ? "Lisätty koriin!" : "Added to cart!"}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{className} — {form.horseName}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{competitionName}</div>
            <h3 style={{ fontSize: 20 }}>{className}</h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4, marginBottom: 0 }}>{fi ? "Täytä tiedot · €5 / luokka" : "Fill in your details · €5 per class"}</p>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal-body" style={{ paddingTop: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label className="label label-required">{fi ? "Osallistujan nimi" : "Your full name"}</label>
              <input className={`input${errors.participantName ? " input-error" : ""}`} value={form.participantName} onChange={(e) => set("participantName", e.target.value)} placeholder={fi ? "Etunimi Sukunimi" : "First Last"} />
              {errors.participantName && <span className="error-msg">{errors.participantName}</span>}
            </div>
            <div className="field">
              <label className="label label-required">{fi ? "Hevosen nimi" : "Horse name"}</label>
              <input className={`input${errors.horseName ? " input-error" : ""}`} value={form.horseName} onChange={(e) => set("horseName", e.target.value)} placeholder={fi ? "Hevosen nimi" : "Horse name"} />
              {errors.horseName && <span className="error-msg">{errors.horseName}</span>}
            </div>
            <div className="field">
              <label className="label label-required">{fi ? "Hevosen ikä (vuotta)" : "Horse age (years)"}</label>
              <input className={`input${errors.horseAge ? " input-error" : ""}`} type="number" min="0" max="40" value={form.horseAge} onChange={(e) => set("horseAge", e.target.value)} placeholder="e.g. 8" />
              {errors.horseAge && <span className="error-msg">{errors.horseAge}</span>}
            </div>
            <div className="field">
              <label className="label label-required">{fi ? "Puhelinnumero" : "Phone number"}</label>
              <input className={`input${errors.phone ? " input-error" : ""}`} type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+358 40 123 4567" />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <label className="label label-required">{fi ? "Osoite (katu, postinumero, kaupunki)" : "Address (street, postcode, city)"}</label>
            <input className={`input${errors.address ? " input-error" : ""}`} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder={fi ? "Esimerkkikatu 1, 00100 Helsinki" : "1 Example Street, London W1A 1AA"} />
            {errors.address && <span className="error-msg">{errors.address}</span>}
          </div>

          <div style={{ marginTop: 20 }}>
            <label className="label label-required" style={{ marginBottom: 8, display: "block" }}>{fi ? "Kuva hevosestasi" : "Photo of your horse"}</label>
            {imagePreview ? (
              <div style={{ position: "relative", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
                <button onClick={() => { setImageBase64(undefined); setImagePreview(undefined); setImageFileName(undefined); }} style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "white", border: "none", cursor: "pointer", display: "grid", placeItems: "center" }}><X size={14} /></button>
                <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 12, padding: "3px 10px", borderRadius: 4 }}>{imageFileName}</div>
              </div>
            ) : (
              <div
                className={`file-upload${dragging ? " dragover" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}
              >
                <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} style={{ display: "none" }} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--r-md)", background: "var(--brand-bg)", display: "grid", placeItems: "center" }}><Upload size={22} color="var(--brand)" /></div>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--brand)" }}>{fi ? "Klikkaa ladataksesi" : "Click to upload"}</span>
                    <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{fi ? " tai vedä tänne" : " or drag and drop"}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-subtle)", margin: 0 }}>JPG, PNG, WEBP · max 10 MB</p>
                </div>
              </div>
            )}
            {imageError && <span className="error-msg">{imageError}</span>}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-subtle)", marginTop: 12, marginBottom: 0 }}>
            {fi ? "Kuvasi lähetetään tuomareille. Emme jaa kuvia ilman lupaasi." : "Your photo is sent to our licensed judges. We never share images without permission."}
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{fi ? "Luokkamaksu" : "Entry fee"}: <span style={{ color: "var(--brand)" }}>€5.00</span></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" onClick={onClose}>{fi ? "Peruuta" : "Cancel"}</button>
            <button className="btn btn-primary" onClick={handleAddToCart} disabled={loading} style={{ minWidth: 140, gap: 8 }}>
              {loading && <Loader2 size={14} />}
              {fi ? "Lisää koriin" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
