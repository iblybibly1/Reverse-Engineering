"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import EntryModal from "@/components/ui/EntryModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  competitionId: string;
  competitionName: string;
  classes: { id: string; name: string }[];
}

export default function CompetitionEntryButton({ competitionId, competitionName, classes }: Props) {
  const [open, setOpen] = useState(false);
  const { tr } = useLanguage();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
      >
        {tr.comp_enter} <ChevronRight className="w-4 h-4" />
      </button>
      {open && (
        <EntryModal
          competitionId={competitionId}
          competitionName={competitionName}
          classes={classes}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
