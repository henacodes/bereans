export type BibleBook = {
  bookId: number;
  name: string;
  chapters: number;
};

export type Verse = {
  pk: number;
  verse: number;
  text: string;
};

export type SelectedPassage = {
  translation: string;
  bookId: number;
  chapter: number;
  start: number;
  end: number;
  passage: Verse[];
};

export type PassageSearchParams = {
  translation: string;
  bookId: string;
  chapter: string;
  verseStart: string;
  verseEnd: string;
};
