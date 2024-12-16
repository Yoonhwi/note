import { createContext } from "react";
import {
  NoteType,
  RequestNoteType,
  SortDateType,
  SortPriorityType,
} from "../types";

interface NoteContextInterface {
  notes: NoteType[];
  trashNotes: NoteType[];
  categories: string[];
  sortPriority: SortPriorityType;
  sortDate: SortDateType;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addNote: (note: RequestNoteType) => void;
  removeNote: (id: number) => void;
  modifyNote: (id: number, note: Partial<RequestNoteType>) => void;
  reviveNote: (id: number) => void;
  eraseNote: (id: number) => void;
  setSortPriority: (priority: SortPriorityType) => void;
  setSortDate: (date: SortDateType) => void;
  sortClear: () => void;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
  trashNotes: [],
  categories: [],
  sortDate: "default",
  sortPriority: "default",
  addCategory: () => {},
  removeCategory: () => {},
  addNote: () => {},
  removeNote: () => {},
  modifyNote: () => {},
  reviveNote: () => {},
  eraseNote: () => {},
  setSortPriority: () => {},
  setSortDate: () => {},
  sortClear: () => {},
});
