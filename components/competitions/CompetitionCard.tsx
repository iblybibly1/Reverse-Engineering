import Link from "next/link";
import { Calendar, ChevronRight, Trophy } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import type { Competition } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface CompetitionCardProps {
  competition: Competition;
}

const statusConfig = {
  completed: { label: "Completed", variant: "success" as const },
  upcoming: { label: "Upcoming", variant: "info" as const },
  ongoing: { label: "Live Now", variant: "warning" as const },
  open: { label: "Entries Open", variant: "success" as const },
};

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const status = statusConfig[competition.status];

  return (
    <Link href={`/competitions/${competition.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <SafeImage
            src={competition.banner}
            alt={competition.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            fallback="https://placehold.co/800x450/1e3a5f/ffffff?text=Horse+Show"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {competition.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-slate-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{competition.date}</span>
          </div>
          <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">
            {competition.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Trophy className="w-4 h-4" />
              <span>{competition.classes.length} classes</span>
            </div>
            <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
              View Classes <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
