"use client";

import { useVerseDialog } from "@web/stores/useVerseDialog";
import { useEffect, useState } from "react";

type Verse = {
  pk: number;
  verse: number;
  text: string;
};

export function VersesList({
  verses,
  bookId,
  chapter,
  translation,
}: {
  verses: Verse[];
  bookId: number;
  chapter: number;
  translation: string;
}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [firstSelectedVerse, setFirstSelectedVerse] = useState<number | null>(
    null
  );
  const [mouseHoveredVerse, setMouseHoveredVerse] = useState<number | null>(
    null
  );

  const setSelectedPassage = useVerseDialog(
    (state) => state.setSelectedPassage
  );

  const resetState = () => {
    setIsSelecting(false);
    setFirstSelectedVerse(null);
    setMouseHoveredVerse(null);
  };

  const handleVerseClick = (v: Verse) => {
    if (isSelecting) {
      const endVerse = v.verse;

      const min = Math.min(firstSelectedVerse!, endVerse!);
      const max = Math.max(firstSelectedVerse!, endVerse!);
      const selectedPassage = verses.slice(min - 1, max);

      setSelectedPassage({
        verseStart: min!,
        verseEnd: max!,
        passage: selectedPassage,
        translation,
        bookId,
        chapter,
      });

      resetState();

      setIsSelecting(false);
    } else {
      setIsSelecting(true);
      setFirstSelectedVerse(v.verse);
    }
  };

  const handleMouseHover = (v: Verse) => {
    if (isSelecting) {
      setMouseHoveredVerse(v.verse);
    }
  };

  // close out of the selection mode
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isSelecting) {
        resetState();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSelecting]);

  return (
    <article className="prose max-w-none  h-[84vh] overflow-auto  scrollbar-hide      ">
      {verses.map((v) => {
        const isSelected =
          firstSelectedVerse !== null &&
          mouseHoveredVerse !== null &&
          v.verse >= Math.min(firstSelectedVerse, mouseHoveredVerse) &&
          v.verse <= Math.max(firstSelectedVerse, mouseHoveredVerse);
        return (
          <p
            key={v.pk}
            className={
              "cursor-pointer my-1 rounded transition  p-1   " +
              ((isSelected || v.verse == firstSelectedVerse) &&
                " bg-primary/40  ")
            }
            onClick={() => handleVerseClick(v)}
            onMouseEnter={() => handleMouseHover(v)}
            dangerouslySetInnerHTML={{
              __html: `<strong>${v.verse}.</strong> ${v.text}`,
            }}
          />
        );
      })}
    </article>
  );
}
