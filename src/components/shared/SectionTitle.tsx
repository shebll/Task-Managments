function SectionTitle({ title, des }: { title: string; des: string }) {
  return (
    <div className="flex flex-col justify-between items-center gap-2 pb-10">
      <h2 className="font-semibold text-3xl leading-9 tracking-tight">
        {title}
      </h2>
      <p className="font-normal text-sm text-text-muted">{des}</p>
    </div>
  );
}

export default SectionTitle;
