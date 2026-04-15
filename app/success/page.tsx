"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SuccessPage() {
  const { tr } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-16">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-3">{tr.success_title}</h1>
        <p className="text-slate-500 mb-8">{tr.success_sub}</p>
        <Link
          href="/competitions"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          {tr.success_back}
        </Link>
      </div>
    </div>
  );
}
