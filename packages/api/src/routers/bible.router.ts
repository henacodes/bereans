// server/routers/bible.ts
import { z } from "zod";
import { publicProcedure, router } from "../";
import { fetchPassage } from "../third-party/passage";

export const bibleRouter = router({
  getPassage: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        chapter: z.string(),
        verseStart: z.string(),
        verseEnd: z.string(),
        translation: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const res = await fetchPassage(input);

        return res;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }
    }),
});
