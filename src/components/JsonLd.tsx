export default function JsonLd({ data }: { data: string }) {
  if (!data || !data.trim()) return null;

  try {
    JSON.parse(data);
  } catch {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
