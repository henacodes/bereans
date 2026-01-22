"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { bibleBooks, getBibleBook, supportedTranslations } from "@/data/bible";
import { Loader } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  // Helper to handle the string | null from Shadcn Select
  const navigate = (t: string | null, b: string | null, c: string | null) => {
    // Fallbacks to ensure we never pass 'null' to the router
    const translation = t || currentTranslation;
    const bookId = b || String(currentBookId);
    const chapter = c || "1";

    if (
      translation.toUpperCase() === currentTranslation.toUpperCase() &&
      parseInt(bookId) === currentBookId &&
      parseInt(chapter) === currentChapter
    ) {
      return;
    }

    setLoading(true);
    router.push(`/bible/${translation.toLowerCase()}/${bookId}/${chapter}`);
  };

  // Memoize books based on the current translation's canon
  const filteredBooks = useMemo(() => {
    const translationData = supportedTranslations.find(
      (t) => t.shortName.toUpperCase() === currentTranslation.toUpperCase(),
    );
    const canon = translationData?.canon ?? "protestant";
    return bibleBooks.filter((b) => b.canons.includes(canon));
  }, [currentTranslation]);

  const selectedBookObj = getBibleBook(currentBookId) ?? bibleBooks[0];

  return (
    <div className="mb-6 flex flex-wrap gap-3 items-center">
      {loading && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader className="animate-spin text-primary" size={50} />
        </div>
      )}

      {/* Translation Select */}
      <Select
        value={currentTranslation.toUpperCase()}
        onValueChange={(val) => navigate(val, null, "1")}
      >
        <SelectTrigger className="w-48 rounded-xl border-white/10 bg-white/5 backdrop-blur-md text-slate-200 focus:ring-primary/50">
          <SelectValue placeholder="Translation" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-white/10 bg-slate-900 text-slate-200">
          <SelectGroup>
            <SelectLabel className="text-[10px] uppercase tracking-widest opacity-50">
              Translation
            </SelectLabel>
            {supportedTranslations.map((t) => (
              <SelectItem
                key={t.shortName}
                value={t.shortName}
                className="rounded-lg"
              >
                {t.fullName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Book Select */}
      <Select
        value={String(currentBookId)}
        onValueChange={(val) => navigate(null, val, "1")}
      >
        <SelectTrigger className="w-52 rounded-xl border-white/10 bg-white/5 backdrop-blur-md text-slate-200">
          <SelectValue>{currentBookName}</SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-white/10 bg-slate-900 text-slate-200 max-h-80">
          <SelectGroup>
            <SelectLabel className="text-[10px] uppercase tracking-widest opacity-50">
              Book
            </SelectLabel>
            {filteredBooks.map((b) => (
              <SelectItem
                key={b.bookId}
                value={String(b.bookId)}
                className="rounded-lg"
              >
                {b.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Chapter Select */}
      <Select
        value={String(currentChapter)}
        onValueChange={(val) => navigate(null, null, val)}
      >
        <SelectTrigger className="w-24 rounded-xl border-white/10 bg-white/5 backdrop-blur-md text-slate-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-white/10 bg-slate-900 text-slate-200 max-h-72">
          <SelectGroup>
            <SelectLabel className="text-[10px] uppercase tracking-widest opacity-50">
              Chapter
            </SelectLabel>
            {Array.from(
              { length: selectedBookObj.chapters },
              (_, i) => i + 1,
            ).map((c) => (
              <SelectItem key={c} value={String(c)} className="rounded-lg">
                {c}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
