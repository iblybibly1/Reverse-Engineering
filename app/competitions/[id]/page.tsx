import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronRight, ArrowLeft, Trophy } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { getCompetition, getAllCompetitions } from "@/lib/data";
import ClassCard from "@/components/competitions/ClassCard";
import Badge from "@/components/ui/Badge";

export async function generateStaticParams() {
  const competitions = getAllCompetitions();
  return competitions.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const competition = getCompetition(id);
  return {
    title: competition ? `${competition.name} — EquineShow Online` : "Competition Not Found",
  };
}

const statusConfig = {
  completed: { label: "Completed", variant: "success" as const },
  upcoming: { label: "Upcoming", variant: "info" as const },
  ongoing: { label: "Live Now", variant: "warning" as const },
};

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const competition = getCompetition(id);

  if (!competition) notFound();

  const status = statusConfig[competition.status];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 bg-slate-900">
        <SafeImage
          src={competition.banner}
          alt={competition.name}
          fill
          className="object-cover opacity-60"
          priority
          fallback="https://placehold.co/1600x600/1e3a5f/ffffff?text=Horse+Show"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link
            href="/competitions"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-4 w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Competitions
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant={status.variant}>{status.label}</Badge>
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <Calendar className="w-4 h-4" />
              {competition.date}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">{competition.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Description */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
          <p className="text-slate-600 leading-relaxed">{competition.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              {competition.classes.length} classes
            </div>
          </div>
        </div>

        {/* Classes grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Classes</h2>
          <p className="text-slate-500 text-sm">Select a class to view entries and winners.</p>
        </div>

        {competition.classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {competition.classes.map((cls) => (
              <ClassCard key={cls.id} competitionId={competition.id} classEntry={cls} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <p>No classes added yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
