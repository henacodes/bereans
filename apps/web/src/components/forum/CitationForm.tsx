"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type CitationInput = {
  title: string;
  author?: string;
  url?: string;
  type: "book" | "article" | "video";
  context?: string;
};

export function CitationForm({
  citations,
  setCitations,
}: {
  setCitations: (citations: CitationInput[]) => void;
  citations: CitationInput[];
}) {
  const addCitation = () => {
    const newCitations = [
      ...citations,
      { title: "", type: "book", author: "", url: "", context: "" },
    ] as CitationInput[];
    setCitations(newCitations);
  };

  const updateCitation = (
    index: number,
    field: keyof CitationInput,
    value: string,
  ) => {
    const newCitations = citations.map((c, i) =>
      i === index ? { ...c, [field]: value } : c,
    );
    setCitations(newCitations);
  };

  const removeCitation = (index: number) => {
    const newCitations = citations.filter((_, i) => i !== index);
    setCitations(newCitations);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-slate-700 flex flex-col justify-start items-start   ">
          <p className=" dark:text-slate-400 ">Citations </p>
          <small>Receipts, please.</small>
        </Label>
        <Button
          type="button"
          variant="secondary"
          className=" text-slate-300 "
          size="sm"
          onClick={addCitation}
        >
          + Add Citation
        </Button>
      </div>

      {citations.map((citation, index) => (
        <div
          key={index}
          className="grid gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <div>
            <Label className=" mb-2 mt-4 ">Title *</Label>
            <input
              className="w-full border p-2 rounded"
              value={citation.title}
              onChange={(e) => updateCitation(index, "title", e.target.value)}
              placeholder="e.g. The City of God"
            />
          </div>

          <div>
            <Label className=" mb-2 mt-4 ">Author</Label>
            <input
              className="w-full border p-2 rounded"
              value={citation.author ?? ""}
              onChange={(e) => updateCitation(index, "author", e.target.value)}
              placeholder="Augustine of Hippo"
            />
          </div>

          <div>
            <Label className=" mb-2 mt-4 ">URL</Label>
            <input
              className="w-full border p-2 rounded"
              value={citation.url ?? ""}
              onChange={(e) => updateCitation(index, "url", e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label className=" mb-2 mt-4 ">Type *</Label>
            <Select
              value={citation.type}
              onValueChange={(value) => updateCitation(index, "type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className=" mb-2 mt-4 ">Context</Label>
            <input
              className="w-full border p-2 rounded"
              value={citation.context ?? ""}
              onChange={(e) => updateCitation(index, "context", e.target.value)}
              placeholder="Page 42, or 12:34 mark"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeCitation(index)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
