import Image from "next/image";
import icon from "@/assets/icons/icon.svg";

function Logo() {
  return (
    <div className="gap-2 flex items-center">
      <Image src={icon} alt="Icon" width={18} height={20} />
      <h1 className="text-lg font-bold leading-7 tracking-tight ">TASKLY</h1>
    </div>
  );
}

export default Logo;
