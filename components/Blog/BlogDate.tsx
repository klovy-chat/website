export default function BlogDate({
  date,
  lang,
  className,
}: {
  date: string;
  lang: string;
  className?: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(
    lang === "pl" ? "pl-PL" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${date}T00:00:00Z`));

  return (
    <time dateTime={date} className={className}>
      {formattedDate}
    </time>
  );
}
