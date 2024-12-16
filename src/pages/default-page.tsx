import { NoteMain, NoteNav } from "@/container";
import { NoteContext } from "@/provider";
import { NoteType } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DefaultPage = () => {
  const [notesByCategory, setNotesByCategory] = useState<NoteType[]>([]);
  const [pathname, setPathname] = useState<string>("");
  const { notes, trashNotes } = useContext(NoteContext);
  const location = useLocation();

  useEffect(() => {
    const decodedPath = decodeURIComponent(location.pathname).replace("/", "");
    setPathname(decodedPath.replace("/", ""));

    switch (decodedPath) {
      case "":
        setNotesByCategory(notes);
        break;
      case "archive":
        setNotesByCategory(() => {
          return notes.filter((note) => note.isArchived);
        });
        break;
      default:
        setNotesByCategory(
          notes.filter((note) => note.tags.includes(decodedPath))
        );
        break;
    }
  }, [location.pathname, notes, trashNotes]);

  return (
    <div className="flex min-h-screen h-0 w-full">
      <NoteNav />
      <NoteMain notes={notesByCategory} pathname={pathname} />
    </div>
  );
};

export default DefaultPage;
