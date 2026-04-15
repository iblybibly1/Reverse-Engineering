"use client";

import { useState } from "react";
import { X, CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClassOption {
  id: string;
  name: string;
}

interface EntryModalProps {
  competitionId: string;
  competitionName: string;
  classes: ClassOption[];
  onClose: () => void;
}

export default function EntryModal({ competitionId, competitionName, classes, onClose }: EntryModalProps) {
  const { tr } = useLanguage();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setError("");
  };

  const total = selected.size * 5;

  const handlePay = async () => {
    if (selected.size === 0) {
      setError(tr.modal_select_one);
      return;
    }
    setLoading(true);
    try {
      const selectedClasses = classes.filter((c) => selected.has(c.id));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classes: selectedClasses, competitionId, competitionName }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{tr.modal_title}</h2>
              <p className="text-blue-100 text-sm mt-0.5">{competitionName}</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-slate-600 text-sm mb-5">{tr.modal_sub}</p>

          {/* Classes */}
          <div className="space-y-2 mb-6">
            {classes.map((cls) => (
              <label
                key={cls.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selected.has(cls.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selected.has(cls.id)}
                    onChange={() => toggle(cls.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-medium text-slate-900 text-sm">{cls.name}</span>
                </div>
                <span className="text-slate-500 text-sm font-semibold">5 {tr.modal_per_class}</span>
              </label>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-4 border-t border-slate-200 mb-4">
            <span className="font-semibold text-slate-700">{tr.modal_total}</span>
            <span className="text-2xl font-black text-slate-900">€{total}.00</span>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
            >
              {tr.modal_cancel}
            </button>
            <button
              onClick={handlePay}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {tr.modal_pay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
