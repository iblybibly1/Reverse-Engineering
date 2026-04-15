import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crown } from "lucide-react";
import { getCompetition, getAllCompetitions, getClass } from "@/lib/data";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getImageUrl, getEntryImages } from "@/lib/imageLoader";

export async function generateStaticParams() {
  const competitions = getAllCompetitions();
  return competitions.flatMap((c) =>
    c.classes.map((cls) => ({ id: c.id, classId: cls.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; classId: string }>;
}) {
  const { id, classId } = await params;
  const cls = getClass(id, classId);
  return {
    title: cls ? `${cls.name} — EquineShow Online` : "Class Not Found",
  };
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ id: string; classId: string }>;
}) {
  const { id, classId } = await params;
  const competition = getCompetition(id);
  const cls = getClass(id, classId);

  if (!competition || !cls) notFound();

  const winnerSrc = getImageUrl(cls.folder, cls.winner);
  const entrySrcs = getEntryImages(cls.folder, cls.entries);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Breadcrumb header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4 flex-wrap">
            <Link href="/competitions" className="hover:text-blue-600 transition-colors">
              Competitions
            </Link>
            <span>/</span>
            <Link href={`/competitions/${id}`} className="hover:text-blue-600 transition-colors">
              {competition.name}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{cls.name}</span>
          </nav>

          <Link
            href={`/competitions/${id}`}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm font-medium mb-4 w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Classes
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-amber-600 font-semibold">Class Gallery</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{cls.name}</h1>
              {cls.description && (
                <p className="text-slate-500 mt-2 max-w-xl">{cls.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Crown className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs text-amber-600 font-medium">Total Entries</p>
                <p className="text-xl font-bold text-amber-700">{cls.entries.length + 1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <GalleryGrid winnerSrc={winnerSrc} entrySrcs={entrySrcs} />
      </div>
    </div>
  );
}
