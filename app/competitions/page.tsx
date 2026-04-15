import { getAllCompetitions } from "@/lib/data";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Competitions — EquineShow Online",
  description: "Browse all online horse show competitions.",
};

export default function CompetitionsPage() {
  const competitions = getAllCompetitions();
  const completed = competitions.filter((c) => c.status === "completed");
  const upcoming = competitions.filter((c) => c.status === "upcoming" || c.status === "ongoing");

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">All Shows</p>
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Competitions</h1>
          <p className="mt-2 text-slate-500 max-w-xl">
            Browse all online horse show competitions. Click a show to view classes and entries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Upcoming &amp; Active Shows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((c) => (
                <CompetitionCard key={c.id} competition={c} />
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Past Shows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((c) => (
                <CompetitionCard key={c.id} competition={c} />
              ))}
            </div>
          </section>
        )}

        {competitions.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No competitions yet</p>
            <p className="text-sm mt-1">Check back soon for upcoming shows!</p>
          </div>
        )}
      </div>
    </div>
  );
}
