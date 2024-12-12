import { createContext } from "react";
import { NoteType } from "../types";

interface NoteContextInterface {
  notes: NoteType[];
  addNote: (note: NoteType) => void;
  removeNote: (id: number) => void;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
  addNote: () => {},
  removeNote: () => {},
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
});
