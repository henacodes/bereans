"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { bibleBooks, getBibleBook } from "@/data/bible";
import { supportedTranslations } from "@/data/bible";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChapterSelectorProps {
  currentTranslation: string;
  currentBookId: number;
  currentBookName: string;
  currentChapter: number;
}

export default function ChapterSelector({
  currentTranslation,
  currentBookId,
  currentBookName,
  currentChapter,
}: ChapterSelectorProps) {
  const router = useRouter();

  const [translation, setTranslation] = useState(
    currentTranslation.toUpperCase()
  );
  const [selectedBook, setSelectedBook] = useState(currentBookId);
  const [selectedChapter, setSelectedChapter] = useState(currentChapter);

  const selectedBookObj = getBibleBook(selectedBook) ?? bibleBooks[0];

  const filteredBooks = useMemo(() => {
    const canon = getTranslationCanon(translation);
    return bibleBooks.filter((b) => b.canons.includes(canon));
  }, [translation]);

  function getTranslationCanon(
    shortName: string
  ): "protestant" | "catholic" | "lxx" {
    const translation = supportedTranslations.find(
      (t) => t.shortName === shortName
    );
    return translation?.canon ?? "protestant";
  }

  useEffect(() => {
    if (selectedChapter > selectedBookObj.chapters) {
      setSelectedChapter(1);
    }
  }, [selectedBook, selectedBookObj.chapters, selectedChapter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/bible/${translation}/${selectedBook}/${selectedChapter}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"mb-6 flex flex-wrap gap-4 items-center  "}
    >
      <Select value={translation} onValueChange={(val) => setTranslation(val)}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select translation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Translation</SelectLabel>
            {supportedTranslations.map((t) => (
              <SelectItem key={t.shortName} value={t.shortName}>
                {t.fullName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={String(selectedBook)}
        onValueChange={(val) => setSelectedBook(parseInt(val, 10))}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select book" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Book</SelectLabel>
            {filteredBooks.map((b) => (
              <SelectItem key={b.bookId} value={String(b.bookId)}>
                {b.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={String(selectedChapter)}
        onValueChange={(val) => setSelectedChapter(parseInt(val, 10))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select chapter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Chapter</SelectLabel>
            {Array.from(
              { length: selectedBookObj.chapters },
              (_, i) => i + 1
            ).map((c) => (
              <SelectItem key={c} value={String(c)}>
                {c}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <button
        type="submit"
        className="ml-4 rounded-md bg-primary text-secondary px-8 py-2 cursor-pointer   "
      >
        Go
      </button>
    </form>
  );
}
