export type BibleBook = {
  bookId: number;
  name: string;
  chapters: number;
  canons: ("protestant" | "catholic" | "orthodox" | "lxx")[];
};
export type Translation = {
  shortName: string;
  fullName: string;
  canon: "catholic" | "protestant" | "lxx";
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
  verseStart: number;
  verseEnd: number;
  passage: Verse[];
};

export type PassageSearchParams = {
  translation: string;
  bookId: string;
  chapter: string;
  verseStart: string;
  verseEnd: string;
};
