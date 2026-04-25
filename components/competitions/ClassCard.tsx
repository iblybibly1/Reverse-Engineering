import Link from "next/link";
import { Images, ChevronRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import type { ClassEntry } from "@/lib/data";
import { getImageUrl } from "@/lib/imageLoader";

interface ClassCardProps {
  competitionId: string;
  classEntry: ClassEntry;
}

export default function ClassCard({ competitionId, classEntry }: ClassCardProps) {
  const winnerSrc = classEntry.winner ? getImageUrl(classEntry.folder, classEntry.winner) : "";

  return (
    <Link
      href={`/competitions/${competitionId}/classes/${classEntry.id}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <SafeImage
            src={winnerSrc}
            alt={classEntry.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            fallback="https://placehold.co/600x400/e2e8f0/64748b?text=Class+Image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg leading-tight">{classEntry.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-slate-500 text-sm line-clamp-2">{classEntry.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Images className="w-4 h-4" />
              <span>{classEntry.entries.length + 1} entries</span>
            </div>
            <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
              View Gallery <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
