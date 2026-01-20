// stores/useVerseDialog.ts
import type { SelectedPassage } from "@bereans/api/types/bible";
import { create } from "zustand";

type State = {
  open: boolean;
  selectedPassage: SelectedPassage | null;
  setOpen: (open: boolean) => void;
  setSelectedPassage: (passage: SelectedPassage) => void;
  clearSelectedPassage: () => void;
};

export const useVerseDialog = create<State>((set) => ({
  open: false,
  selectedPassage: null,
  setOpen: (open) => set({ open }),
  setSelectedPassage: (passage) =>
    set({ selectedPassage: passage, open: true }),
  clearSelectedPassage: () => set({ selectedPassage: null, open: false }),
}));
