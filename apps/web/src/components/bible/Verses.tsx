"use client";

import { useVerseDialog } from "@/stores/useVerseDialog";
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
    null,
  );
  const [mouseHoveredVerse, setMouseHoveredVerse] = useState<number | null>(
    null,
  );

  const setSelectedPassage = useVerseDialog(
    (state) => state.setSelectedPassage,
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
    <article className="prose max-w-none h-[84vh] overflow-auto scrollbar-hide font-playfair text-[1.15rem] leading-[2.2rem] text-foreground/90 antialiased">
      <div className="inline">
        {verses.map((v) => {
          const isSelected =
            firstSelectedVerse !== null &&
            mouseHoveredVerse !== null &&
            v.verse >= Math.min(firstSelectedVerse, mouseHoveredVerse) &&
            v.verse <= Math.max(firstSelectedVerse, mouseHoveredVerse);

          return (
            <span
              key={v.pk}
              onClick={() => handleVerseClick(v)}
              onMouseEnter={() => handleMouseHover(v)}
              className={
                "inline cursor-pointer transition-all duration-150 px-1 py-1 mx-0.5 rounded-sm " +
                (isSelected || v.verse === firstSelectedVerse
                  ? "bg-primary/30 ring-4 ring-primary/10 " // Slight ring adds 'air' around selection
                  : "hover:bg-muted/50 ")
              }
            >
              <sup className="text-[11px] font-medium mr-1.5 select-none opacity-60 italic">
                {v.verse}
              </sup>
              <span
                className="inline"
                dangerouslySetInnerHTML={{
                  // Added a non-breaking space after the text for breathing room
                  __html: v.text.trim() + "&nbsp; ",
                }}
              />
            </span>
          );
        })}
      </div>
    </article>
  );
}
