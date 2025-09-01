import type { Citation } from "@/types/forum";

export function CitedComponent({
  citation,
  k,
}: {
  citation: Citation;
  k: number;
}) {
  return (
    <li key={k} className=" text-slate-400 ">
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
