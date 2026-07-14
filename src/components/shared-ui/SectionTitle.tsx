function SectionTitle({ title, des }: { title: string; des: string }) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 pb-10">
      <h2 className=" font-semibold text-[30px] leading-9 tracking-[-.075px]">
        {title}
      </h2>
      <p className="font-normal text-[14px] text-muted-foreground">{des}</p>
    </div>
  );
}

export default SectionTitle;
