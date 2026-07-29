import { Boxes, GitBranch, TrendingUp } from "lucide-react";

const tips = [
  {
    title: "High-Level Goals",
    icon: Boxes,
    description: "Define broad objectives your team can focus on.",
  },
  {
    title: "Hierarchy Design",
    icon: GitBranch,
    description: "Link related work together under one epic.",
  },
  {
    title: "Track Velocity",
    icon: TrendingUp,
    description: "Visualize progress across your project.",
  },
];

export default function EpicTips() {
  return (
    <div className="grid gap-5 md:grid-cols-3 max-w-2xl">
      {tips.map((tip) => {
        const Icon = tip.icon;

        return (
          <article
            key={tip.title}
            className="rounded-lg bg-blue-100 p-5 flex flex-col gap-4"
          >
            <div className="bg-card-background p-3 w-fit rounded-md">
              <Icon size={20} className=" text-primary " />
            </div>

            <h4 className="font-semibold">{tip.title}</h4>

            <p className="mt-2 text-sm text-text-secondary">
              {tip.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
