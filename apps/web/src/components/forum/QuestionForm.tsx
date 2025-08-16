"use client";

import { useState } from "react";
import { useVerseDialog } from "@/stores/useVerseDialog";
import { getBibleBook } from "@/data/bible";

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

    try {
      const res = await fetch("/api/question/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong");
      } else {
        // Optionally close modal or redirect
        alert("Question posted!");
      }
    } catch (err) {
      setError("Failed to post question");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="bg-primary  text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post Question"}
      </button>
    </form>
  );
}
