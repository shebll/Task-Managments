import { CheckCircle2, Circle } from "lucide-react";

type Props = { completed: boolean; text: string };

/* At least 8 characters
One uppercase,
lowercase, and digit
One special character
 */
function InfoItem({ completed, text }: Props) {
  return (
    <div className="flex items-center gap-[8px]">
      {completed ? (
        <CheckCircle2 size={11} className="text-[#004E32]" />
      ) : (
        <Circle size={11} className="text-[#737685]" />
      )}

      <span className="text-xs text-[#434654] ">{text}</span>
    </div>
  );
}

export default InfoItem;
