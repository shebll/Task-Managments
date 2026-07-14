import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="gap-2 flex items-center">
      <Image src={"/assets/icons/icon.svg"} alt="Icon" width={18} height={20} />
      <h1 className="text-lg font-bold leading-7 tracking-tight ">TASKLY</h1>
    </Link>
  );
}

export default Logo;
