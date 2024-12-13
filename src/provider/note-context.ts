import { createContext } from "react";
import { NoteType, RequestNoteType } from "../types";

interface NoteContextInterface {
  notes: NoteType[];
  pinnedNotes: NoteType[];
  trashNotes: NoteType[];
  archiveNotes: NoteType[];
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addNote: (note: RequestNoteType) => void;
  removeNote: (id: number) => void;
  modifyNote: (id: number, note: Partial<RequestNoteType>) => void;
  reviveNote: (id: number) => void;
  eraseNote: (id: number) => void;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
  pinnedNotes: [],
  trashNotes: [],
  archiveNotes: [],
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
  addNote: () => {},
  removeNote: () => {},
  modifyNote: () => {},
  reviveNote: () => {},
  eraseNote: () => {},
});
