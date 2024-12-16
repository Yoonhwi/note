import { useCallback, useEffect, useMemo, useState } from "react";
import { NoteContext } from ".";
import {
  NoteType,
  RequestNoteType,
  SortDateType,
  SortPriorityType,
} from "../types";

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

  const [sortPriority, setSortPriority] = useState<SortPriorityType>("default");
  const [sortDate, setSortDate] = useState<SortDateType>("default");

  /** category */
  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((v) => v !== category));

    const filteredNotes = notes.map((note) => {
      if (note.tags.includes(category)) {
        return {
          ...note,
          tags: note.tags.filter((tag) => tag !== category),
        };
      }
      return note;
    });
    const filteredTrash = trashNotes.map((note) => {
      if (note.tags.includes(category)) {
        return {
          ...note,
          tags: note.tags.filter((tag) => tag !== category),
        };
      }
      return note;
    });

    setNotes(filteredNotes);
    setTrashNotes(filteredTrash);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    localStorage.setItem("trash", JSON.stringify(filteredTrash));
  };

  /** note */
  const addNote = (request: RequestNoteType) => {
    const id = Math.floor(Math.random() * 10000000000);
    const note = {
      id,
      ...request,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isArchived: false,
      isPinned: false,
      isDeleted: false,
    };

    localStorage.setItem("notes", JSON.stringify([...notes, note]));
    setNotes((prev) => {
      return [...prev, note];
    });
  };

  const removeNote = (id: number) => {
    const note = notes.find((note) => note.id === id);
    if (!note) return;

    note.isDeleted = true;
    const filteredNotes = notes.filter((note) => note.id !== id);
    const newTrash = [...trashNotes, note];

    setNotes(filteredNotes);
    setTrashNotes(newTrash);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    localStorage.setItem("trash", JSON.stringify(newTrash));
  };

  const eraseNote = (id: number) => {
    const filteredTrash = trashNotes.filter((note) => note.id !== id);
    localStorage.setItem("trash", JSON.stringify(filteredTrash));
    setTrashNotes(filteredTrash);
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

  const reviveNote = (id: number) => {
    const note = trashNotes.find((note) => note.id === id);
    if (!note) return;
    note.isDeleted = false;
    const filteredTrash = trashNotes.filter((note) => note.id !== id);
    setTrashNotes(filteredTrash);
    setNotes((prev) => {
      return [...prev, note];
    });
    localStorage.setItem("trash", JSON.stringify(filteredTrash));
    localStorage.setItem("notes", JSON.stringify([...notes, note]));
  };

  /** sort */
  const priorityOrder = useMemo(() => {
    return {
      High: 2,
      Low: 1,
    };
  }, []);

  const sortNotes = useCallback(
    (key: "createdAt" | "updatedAt" | "priority", isAscending = false) => {
      const compare = (a: NoteType, b: NoteType) => {
        if (key === "priority") {
          return isAscending
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        } else {
          return isAscending
            ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
            : new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }
      };

      setNotes((prev) => [...prev.sort(compare)]);
      setTrashNotes((prev) => [...prev.sort(compare)]);
    },
    [priorityOrder]
  );

  const sortByCreated = useCallback(() => {
    sortNotes("createdAt", false);
  }, [sortNotes]);

  const sortByEdited = useCallback(() => {
    sortNotes("updatedAt", false);
  }, [sortNotes]);

  const sortByLatest = useCallback(() => {
    sortNotes("createdAt", true);
  }, [sortNotes]);

  const sortByLow = useCallback(() => {
    sortNotes("priority", true);
  }, [sortNotes]);

  const sortByHigh = useCallback(() => {
    sortNotes("priority", false);
  }, [sortNotes]);

  const sortClear = useCallback(() => {
    setSortPriority("default");
    setSortDate("default");
    sortByCreated();
  }, [sortByCreated]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (sortDate === "created") {
      sortByCreated();
    } else if (sortDate === "latest") {
      sortByLatest();
    } else if (sortDate === "edited") {
      sortByEdited();
    }
  }, [sortDate, sortByCreated, sortByEdited, sortByLatest]);

  useEffect(() => {
    if (sortPriority === "low-to-high") {
      sortByLow();
    } else if (sortPriority === "high-to-low") {
      sortByHigh();
    }
  }, [sortByHigh, sortByLow, sortPriority]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        trashNotes,
        categories,
        sortPriority,
        sortDate,
        addCategory,
        removeCategory,
        addNote,
        removeNote,
        modifyNote,
        reviveNote,
        eraseNote,
        setSortPriority,
        setSortDate,
        sortClear,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
