import { useEffect, useState } from "react";
import { NoteContext } from ".";
import { NoteType, RequestNoteType } from "../types";

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
  const [trashNotes, setTrashNotes] = useState<NoteType[]>(
    JSON.parse(localStorage.getItem("trash") || "[]")
  );

  const pinnedNotes = notes.filter((note) => note.isPinned);

  /** category */
  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((v) => v !== category));
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.tags.includes(category)) {
          return {
            ...note,
            tags: note.tags.filter((tag) => tag !== category),
          };
        }
        return note;
      });
    });
  };

  /** note */
  const addNote = (note: RequestNoteType) => {
    const id = Math.floor(Math.random() * 10000000000);
    setNotes((prev) => {
      return [
        ...prev,
        {
          id,
          ...note,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isArchived: false,
          isPinned: false,
          isDeleted: false,
        },
      ];
    });
  };

  const removeNote = (id: number) => {
    const note = notes.find((note) => note.id === id);
    if (!note) return;
    setTrashNotes((prev) => {
      return [...prev, note];
    });

    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  };

  const modifyNote = (id: number, note: Partial<RequestNoteType>) => {
    setNotes((prev) => {
      return prev.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            ...note,
            updatedAt: new Date().toISOString(),
          };
        }
        return n;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trashNotes));
  }, [trashNotes]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        pinnedNotes,
        trashNotes,
        addNote,
        removeNote,
        categories,
        addCategory,
        removeCategory,
        modifyNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
