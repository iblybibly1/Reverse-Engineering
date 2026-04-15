import Link from "next/link";
import { Trophy, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          This page has trotted off somewhere. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
