import Link from "next/link";

function FormFooter({
  text,
  linkText,
  linkHref,
}: {
  text: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <p className="text-sm text-text-muted pt-8">
      {text}
      <Link href={linkHref} className="text-text-link font-semibold">
        {linkText}
      </Link>
    </p>
  );
}

export default FormFooter;
