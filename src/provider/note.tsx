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
  const [search, setSearch] = useState<string>("");
  const [searchedNotes, setSearchedNotes] = useState<NoteType[]>([]);

  const [sortPriority, setSortPriority] = useState<SortPriorityType>("default");
  const [sortDate, setSortDate] = useState<SortDateType>("default");

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const archiveNotes = notes.filter((note) => note.isArchived);

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
      return [...prev, { ...note, isDeleted: true }];
    });

    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  };

  const eraseNote = (id: number) => {
    setTrashNotes((prev) => {
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

  const reviveNote = (id: number) => {
    const note = trashNotes.find((note) => note.id === id);
    if (!note) return;
    setNotes((prev) => {
      return [...prev, { ...note, isDeleted: false }];
    });

    setTrashNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  };

  const searchNotes = useCallback(
    (search: string) => {
      if (!search) {
        setSearchedNotes([]);
        return;
      }
      setSearchedNotes(() => {
        return notes.filter((note) => {
          return (
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase())
          );
        });
      });
    },
    [notes]
  );

  /** sort */
  const sortByCreated = useCallback(() => {
    setNotes((prev) => {
      return [
        ...prev.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }),
      ];
    });

    setTrashNotes((prev) => {
      return prev.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    });
  }, []);

  const sortByEdited = useCallback(() => {
    setNotes((prev) => {
      return [
        ...prev.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }),
      ];
    });

    setTrashNotes((prev) => {
      return prev.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    });
  }, []);

  const sortByLatest = useCallback(() => {
    setNotes((prev) => {
      return [
        ...prev.sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }),
      ];
    });

    setTrashNotes((prev) => {
      return prev.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    });
  }, []);

  const priorityOrder = useMemo(() => {
    return {
      High: 2,
      Low: 1,
    };
  }, []);

  const sortByLow = useCallback(() => {
    setNotes((prev) => {
      return [
        ...prev.sort((a, b) => {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }),
      ];
    });

    setTrashNotes((prev) => {
      return prev.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });
  }, [priorityOrder]);

  const sortByHigh = useCallback(() => {
    setNotes((prev) => {
      return [
        ...prev.sort((a, b) => {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }),
      ];
    });

    setTrashNotes((prev) => {
      return prev.sort((a, b) => {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    });
  }, [priorityOrder]);

  const sortClear = useCallback(() => {
    setSortPriority("default");
    setSortDate("default");
    sortByCreated();
  }, [sortByCreated]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    console.log("notes rerender");
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trashNotes));
  }, [trashNotes]);

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

  useEffect(() => {
    searchNotes(search);
    console.log("search rerender");
  }, [notes, search, searchNotes]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        pinnedNotes,
        trashNotes,
        archiveNotes,
        categories,
        sortPriority,
        sortDate,
        searchedNotes,
        addCategory,
        removeCategory,
        addNote,
        removeNote,
        modifyNote,
        reviveNote,
        eraseNote,
        setSearch,
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
