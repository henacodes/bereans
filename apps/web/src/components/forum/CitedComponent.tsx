import type { Citation } from "@/types/forum";

export function CitedComponent({
  citation,
  key,
}: {
  citation: Citation;
  key: number;
}) {
  return (
    <li key={key}>
      {citation.title}
      {citation.author && ` — ${citation.author}`}
      {citation.context && ` (${citation.context})`}
      {citation.url && (
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-primary underline"
        >
          [link]
        </a>
      )}
    </li>
  );
}
