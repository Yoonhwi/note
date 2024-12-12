import { useEffect, useState } from "react";
import { NoteType } from "../types";
import { NoteContext } from ".";

interface NoteProviderProps {
  children: React.ReactNode;
}

const NoteProvider = ({ children }: NoteProviderProps) => {
  const [categories, setCategories] = useState<string[]>(
    JSON.parse(localStorage.getItem("categories") || "[]")
  );
  const [notes, setNotes] = useState<NoteType[]>(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );

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

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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
