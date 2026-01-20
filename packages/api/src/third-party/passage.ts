import { type PassageSearchParams } from "../types/bible";

export async function fetchPassage(params: PassageSearchParams) {
  const body = {
    translation: params.translation.toUpperCase(),
    book: Number(params.bookId),
    chapter: Number(params.chapter),
    verses: Array.from(
      { length: Number(params.verseEnd) - Number(params.verseStart) + 1 },
      (_, i) => Number(params.verseStart) + i,
    ),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BIBLE_API}/get-verses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([body]),
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
