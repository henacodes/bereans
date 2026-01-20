"use client";

import { useState } from "react";
import { useVerseDialog } from "@/stores/useVerseDialog";
import { getBibleBook } from "@/data/bible";

import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation";
import { Button } from "../ui/button";

import TagInput from "../tag-input";

export function QuestionForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { selectedPassage } = useVerseDialog();
  const [tags, setTags] = useState<string[]>([]);
  const bookId = selectedPassage?.bookId;
  const chapter = selectedPassage?.chapter;
  const verseStart = selectedPassage?.verseStart;
  const verseEnd = selectedPassage?.verseEnd;
  const translation = selectedPassage?.translation;

  const questionMutation = useTRPCMutation(trpc.question.createQuestion);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const body = {
      title,
      text,
      bookId: bookId,
      chapter: chapter,
      verseStart,
      verseEnd,
      translation: translation,
    };

    const resetState = () => {
      setTitle("");
      setText("");
      setTags([]);
    };

    questionMutation.mutate(
      {
        text,
        title,
        bookId: bookId!,
        chapter: chapter!,
        verseStart: verseStart!,
        verseEnd: verseEnd!,
        tags,
        translation: translation!,
      },
      {
        onSuccess() {
          resetState();
        },
      },
    );
  };

  console.log("tagsssss", tags);
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

      <div>
        <TagInput setTags={setTags} tags={tags} />
      </div>

      <p className="text-sm text-gray-500">
        You’re asking about:{" "}
        <strong>
          {getBibleBook(bookId || 0).name} {chapter}:{verseStart}-{verseEnd} (
          {selectedPassage?.translation})
        </strong>
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" variant="default" className="cursor-pointer">
        {questionMutation.isPending ? "Posting..." : "Post Question"}
      </Button>
    </form>
  );
}
