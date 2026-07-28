import clsx from "clsx";

interface MemberAvatarProps {
  name: string;
  className?: string;
}

export function MemberAvatar({ name, className }: MemberAvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-200 font-semibold text-slate-900",
        className,
      )}
    >
      {initials}
    </div>
  );
}
