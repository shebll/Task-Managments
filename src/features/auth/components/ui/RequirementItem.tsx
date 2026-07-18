import { CheckCircle2, Circle } from "lucide-react";

type Props = { completed: boolean; text: string };

/* At least 8 characters
One uppercase,
lowercase, and digit
One special character
 */
function RequirementItem({ completed, text }: Props) {
  return (
    <div className="flex items-center gap-2">
      {completed ? (
        <CheckCircle2 size={11} className="text-text-success" />
      ) : (
        <Circle size={11} className="text-text-placeholder" />
      )}

      <span className="text-xs text-text-secondary">{text}</span>
    </div>
  );
}

export default RequirementItem;
