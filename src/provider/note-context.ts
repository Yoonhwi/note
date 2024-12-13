import { createContext } from "react";
import {
  NoteType,
  RequestNoteType,
  SortDateType,
  SortPriorityType,
} from "../types";

interface NoteContextInterface {
  notes: NoteType[];
  pinnedNotes: NoteType[];
  trashNotes: NoteType[];
  archiveNotes: NoteType[];
  categories: string[];
  searchedNotes: NoteType[];
  sortPriority: SortPriorityType;
  sortDate: SortDateType;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addNote: (note: RequestNoteType) => void;
  removeNote: (id: number) => void;
  modifyNote: (id: number, note: Partial<RequestNoteType>) => void;
  reviveNote: (id: number) => void;
  eraseNote: (id: number) => void;
  setSearch: (search: string) => void;
  setSortPriority: (priority: SortPriorityType) => void;
  setSortDate: (date: SortDateType) => void;
  sortClear: () => void;
}

export const NoteContext = createContext<NoteContextInterface>({
  notes: [],
  pinnedNotes: [],
  trashNotes: [],
  archiveNotes: [],
  categories: [],
  searchedNotes: [],
  sortDate: "default",
  sortPriority: "default",
  addCategory: () => {},
  removeCategory: () => {},
  addNote: () => {},
  removeNote: () => {},
  modifyNote: () => {},
  reviveNote: () => {},
  eraseNote: () => {},
  setSearch: () => {},
  setSortPriority: () => {},
  setSortDate: () => {},
  sortClear: () => {},
});
