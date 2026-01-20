import type { Question } from "@bereans/api/types/forum";
import { create } from "zustand";
type State = {
  question: Question | null;
  setQuestion: (passage: Question) => void;
};

export const useQuestionDetail = create<State>((set) => ({
  question: null,
  setQuestion: (q) => set({ question: q }),
}));
