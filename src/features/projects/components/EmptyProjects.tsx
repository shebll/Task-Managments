import Image from "next/image";
import Button from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";

export const EmptyProjects = () => {
  return (
    <div className="flex gap-11 flex-col items-center justify-center w-full h-full">
      <Image
        src="/assets/imgs/empty.png"
        alt="No projects illustration"
        width={280}
        height={280}
        className="mb-6"
      />

      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-4xl font-semibold ">No Projects</h2>

        <p className="text-lg text-text-secondary font-normal text-center ">
          You don’t have any projects yet. Start by defining <br /> your first
          architectural workspace to begin tracking
          <br /> tasks and epics.
        </p>
      </div>

      <Button
        variant="primary"
        className="text-lg font-bold flex gap-2.5 py-4 px-8 leading-8"
      >
        <PlusCircle size={20} />
        Create New Project
      </Button>
    </div>
  );
};
