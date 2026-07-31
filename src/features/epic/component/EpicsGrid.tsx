"use client";

import { useState } from "react";

import EpicCard from "./ui/EpicCard";
import EpicDetailsModal from "./ui/EpicDetailsModal";
import { EpicResponse, UpdateEpicRequest } from "../types/Epic";
import { updateEpic } from "../api/epic-api";
import { useToast } from "@/provider/ToastProvider";

type Props = {
  epics: EpicResponse[];
};

export default function EpicsGrid({ epics }: Props) {
  const { showToast } = useToast();
  const [selectedEpic, setSelectedEpic] = useState<EpicResponse | null>(null);
  const [localEpics, setLocalEpics] = useState<EpicResponse[]>(epics);

  const onEpicUpdate = async (updatedEpic: Partial<UpdateEpicRequest>) => {
    const prevEpicUi = selectedEpic;
    // ui updated
    setSelectedEpic((prev) => (prev ? { ...prev, ...updatedEpic } : prev));
    setLocalEpics((prev) =>
      prev.map((epic) =>
        epic.id == selectedEpic?.id ? { ...epic, ...updatedEpic } : epic,
      ),
    );

    try {
      await updateEpic(selectedEpic!.id, updatedEpic);

      showToast(`Epic Updated `, "success");
    } catch (error) {
      // ui rollback
      setSelectedEpic(prevEpicUi);
      setLocalEpics((prev) =>
        prev.map((epic) => (epic.id == selectedEpic?.id ? prevEpicUi! : epic)),
      );

      showToast("Something went wrong", "error");
    }
  };
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {localEpics.map((epic) => (
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
      {selectedEpic && (
        <EpicDetailsModal
          epic={selectedEpic}
          onEpicUpdate={onEpicUpdate}
          onClose={() => setSelectedEpic(null)}
        />
      )}
    </>
  );
}
