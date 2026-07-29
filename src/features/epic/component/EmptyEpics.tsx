import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import EpicTips from "./ui/EpicTips";

type Props = {
  projectId: string;
};

export default function EmptyEpics({ projectId }: Props) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/imgs/empty-epic.png"
          alt="No epics"
          width={224}
          height={224}
        />

        <h2 className="mt-6 text-3xl font-semibold">
          No epics in this project yet.
        </h2>

        <p className="mt-3 max-w-xl text-center text-text-secondary">
          Break down your large project into manageable epics to track progress
          and maintain architectural clarity.
        </p>

        <Link href={`/project/${projectId}/epics/new`} className="mt-8">
          <Button variant="primary">
            <PlusCircle size={18} />
            Create First Epic
          </Button>
        </Link>
      </div>

      <EpicTips />
    </div>
  );
}
