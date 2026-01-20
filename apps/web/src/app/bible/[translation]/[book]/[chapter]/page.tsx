import { CoolBackground } from "@/components/background";
import ChapterSelector from "@/components/bible/ChapterSelector";
import { VerseDialog } from "@/components/bible/VerseDialogue";
import { VersesList } from "@/components/bible/Verses";
import { bibleBooks } from "@/data/bible";

type Verse = {
  pk: number;
  verse: number;
  text: string;
};

async function fetchPassage(
  translation: string,
  book: number,
  chapter: number,
): Promise<Verse[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BIBLE_API}/get-text/${translation}/${book}/${chapter}/`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function BiblePage({
  params,
}: {
  params: Promise<{ translation?: string; book?: string; chapter?: string }>;
}) {
  let { translation, book, chapter } = await params;

  translation = translation?.toUpperCase() ?? "ESV";
  let selectedBookId = parseInt(book ?? "1", 10);
  const selectedChapter = parseInt(chapter ?? "1", 10);

  const verses = await fetchPassage(
    translation,
    selectedBookId,
    selectedChapter,
  );

  const selectedBook =
    bibleBooks.find((b) => b.bookId === selectedBookId) ?? bibleBooks[0];

  let isLoggedIn = false; //session?.user != undefined;

  return (
    <main className=" px-32 relative z-0  ">
      <CoolBackground />
      <h1 className="text-2xl font-bold mb-4">{selectedBook.name}</h1>

      <ChapterSelector
        currentBookId={selectedBookId}
        currentBookName={selectedBook.name}
        currentChapter={selectedChapter}
        currentTranslation={translation}
      />

      {verses.length === 0 ? (
        <p>No passage found.</p>
      ) : (
        <article className="prose max-w-none    ">
          <VersesList
            verses={verses}
            bookId={selectedBookId}
            chapter={selectedChapter}
            translation={translation}
          />
        </article>
      )}

      <VerseDialog isLoggedIn={isLoggedIn} />
    </main>
  );
}
