import { NoteMain, NoteNav } from "@/container";
import { NoteContext } from "@/provider";
import { NoteType } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DefaultPage = () => {
  const [categoryNotes, setCategoryNotes] = useState<NoteType[]>([]);
  const [pathname, setPathname] = useState<string>("");
  const { notes, trashNotes, archiveNotes } = useContext(NoteContext);
  const location = useLocation();

  useEffect(() => {
    const decodedPath = decodeURIComponent(location.pathname).replace("/", "");
    setPathname(decodedPath.replace("/", ""));

    switch (decodedPath) {
      case "":
        setCategoryNotes(notes);
        break;
      case "Trash":
        setCategoryNotes(trashNotes);
        break;
      case "Archive":
        setCategoryNotes(archiveNotes);
        break;
      default:
        setCategoryNotes(
          notes.filter((note) => note.tags.includes(decodedPath))
        );
        break;
    }
  }, [archiveNotes, location.pathname, notes, trashNotes]);

  return (
    <div className="flex min-h-screen h-0 w-full">
      <NoteNav />
      <NoteMain notes={categoryNotes} pathname={pathname} />
    </div>
  );
};

export default DefaultPage;
