"use client";

import { useState } from "react";

import EpicCard from "./ui/EpicCard";
import EpicDetailsModal from "./ui/EpicDetailsModal";
import { EpicResponse } from "../types/Epic";

type Props = {
  epics: EpicResponse[];
};

export default function EpicsGrid({ epics }: Props) {
  const [selectedEpic, setSelectedEpic] = useState<EpicResponse | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {epics.map((epic) => (
          <EpicCard
            key={epic.id}
            epic={epic}
            onClick={() => setSelectedEpic(epic)}
          />
        ))}
      </div>

      <p className="text-sm text-text-secondary">
        Showing {epics.length} epics
      </p>

      {/* {selectedEpic && (
        <EpicDetailsModal
          epic={selectedEpic}
          open={!!selectedEpic}
          onClose={() => setSelectedEpic(null)}
        />
      )} */}
    </>
  );
}
