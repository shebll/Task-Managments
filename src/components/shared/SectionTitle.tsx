function SectionTitle({
  title,
  des,
}: {
  title: string;
  des: { desktop: string; mobile: string };
}) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 pb-10 ">
      <h2 className="font-semibold text-3xl leading-9 tracking-tight w-full">
        {title}
      </h2>
      <p className="hidden md:block font-normal text-sm text-text-muted">
        {des.desktop}
      </p>
      <p className="block md:hidden font-normal text-sm text-text-muted">
        {des.mobile}
      </p>
    </div>
  );
}

export default SectionTitle;
