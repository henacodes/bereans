"use client";

import { useState } from "react";
import { useVerseDialog } from "@/stores/useVerseDialog";
import { getBibleBook } from "@/data/bible";

import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation";

export function QuestionForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedPassage } = useVerseDialog();

  const bookId = selectedPassage?.bookId;
  const chapter = selectedPassage?.chapter;
  const verseStart = selectedPassage?.start;
  const verseEnd = selectedPassage?.end;
  const translation = selectedPassage?.translation;

  const questionMutation = useTRPCMutation(trpc.question.createQuestion);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const body = {
      title,
      text,
      bookId: bookId,
      chapter: chapter,
      verseStart,
      verseEnd,
      translation: translation,
    };

    const res = questionMutation.mutate(
      {
        text,
        title,
        bookId: bookId!,
        chapter: chapter!,
        verseStart: verseStart!,
        verseEnd: verseEnd!,
      },
      {
        onSuccess: (data) => {
          console.log("SUCCESS");
          console.log(data);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Question</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
      </div>

      <p className="text-sm text-gray-500">
        You’re asking about:{" "}
        <strong>
          {getBibleBook(bookId || 0).name} {chapter}:{verseStart}-{verseEnd} (
          {selectedPassage?.translation})
        </strong>
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-primary  text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post Question"}
      </button>
    </form>
  );
}
