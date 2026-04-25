"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import EntryModal from "@/components/ui/EntryModal";

interface Props {
  competitionId: string;
  competitionName: string;
  classId: string;
  className: string;
}

export default function CompetitionEntryButton({ competitionId, competitionName, classId, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        Enter <ChevronRight size={14} />
      </button>
      {open && (
        <EntryModal
          competitionId={competitionId}
          competitionName={competitionName}
          classId={classId}
          className={className}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
