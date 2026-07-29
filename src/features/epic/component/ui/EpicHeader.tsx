import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

type Props = {
  projectId: string;
};

export default function EpicHeader({ projectId }: Props) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="text-3xl font-semibold">Project Epics</h2>
      </div>

      <div className="flex  gap-3">
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder"
            size={18}
          />

          <Input className="pl-10" placeholder="Search epics..." />
        </div>

        <Link href={`/project/${projectId}/epics/new`}>
          <Button variant="primary" className="h-full">
            <PlusCircle size={18} />
            New Epic
          </Button>
        </Link>
      </div>
    </div>
  );
}
