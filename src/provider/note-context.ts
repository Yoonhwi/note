import { createContext } from "react";
import { NoteType, RequestNoteType } from "../types";

interface NoteContextInterface {
  notes: NoteType[];
  pinnedNotes: NoteType[];
  trashNotes: NoteType[];
  addNote: (note: RequestNoteType) => void;
  removeNote: (id: number) => void;
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  modifyNote: (id: number, note: Partial<RequestNoteType>) => void;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
  pinnedNotes: [],
  trashNotes: [],
  addNote: () => {},
  removeNote: () => {},
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
  modifyNote: () => {},
});
