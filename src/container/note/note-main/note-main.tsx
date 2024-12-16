import { Button } from "@/components/ui/button";
import { ModalContext } from "@/provider";
import { NoteType } from "@/types";
import { useContext, useEffect, useState } from "react";
import CreateNote from "./create-note";
import NoteCard from "./note-card";
import NoteEditSort from "./note.edit-sort";

interface NoteMainProps {
  notes: NoteType[];
  pathname: string;
}

const NoteMain = ({ notes, pathname }: NoteMainProps) => {
  const [serchQuery, setSearchQuery] = useState<string>("");
  const [searchedNotes, setSearchedNotes] = useState<NoteType[]>([]);
  const { addModal } = useContext(ModalContext);
  const pinnedNotes = notes.filter((note) => note.isPinned);

  useEffect(() => {
    if (serchQuery === "") {
      return;
    }
    const search = serchQuery.toLowerCase();
    const searched = notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search)
      );
    });
    setSearchedNotes(searched);
  }, [notes, serchQuery]);

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex items-center min-h-[100px] justify-between px-6 shadow-md">
        <span className="font-bold text-2xl">
          {pathname ? pathname : "Notes"}
        </span>
        <Button onClick={() => addModal(<CreateNote />)}>+</Button>
      </div>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex gap-8">
          <form
            className="flex gap-2 flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              const search = e.currentTarget.search.value;
              setSearchQuery(search);
            }}
          >
            <input
              className="flex-1 border-2 px-4 py-2"
              type="text"
              name="search"
            />
            <Button type="submit" className="h-full">
              검색
            </Button>
          </form>
          <Button
            variant={"destructive"}
            onClick={() => addModal(<NoteEditSort />)}
            className="h-full"
          >
            정렬
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-400 font-semibold">
            Search Note ({searchedNotes.length})
          </h3>
          <div className="grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {searchedNotes.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-400 font-semibold">
            Pinned Notes ({pinnedNotes.length})
          </h3>
          <div className="grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-400 font-semibold">
            All Notes ({notes.length})
          </h3>
          <div className="grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {notes.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteMain;
