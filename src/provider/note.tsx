import { useState } from "react";
import { NoteType } from "../types";
import { NoteContext } from ".";

interface NoteProviderProps {
  children: React.ReactNode;
}

const NoteProvider = ({ children }: NoteProviderProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);

  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((v) => v !== category));
  };

  const addNote = (note: NoteType) => {
    setNotes([...notes, note]);
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        removeNote,
        categories,
        addCategory,
        removeCategory,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
