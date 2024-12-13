import { Button } from "@/components/ui/button";
import { ModalContext } from "@/provider";
import { NoteType } from "@/types";
import { useContext } from "react";
import CreateNote from "./create-note";
import NoteCard from "./note-card";

interface NoteMainProps {
  notes: NoteType[];
  pathname: string;
}

const NoteMain = ({ notes, pathname }: NoteMainProps) => {
  const { addModal } = useContext(ModalContext);
  const pinnedNotes = notes.filter((note) => note.isPinned);

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex items-center min-h-[100px] justify-between px-6 shadow-md">
        <span className="font-bold text-2xl">
          {pathname ? pathname : "Notes"}
        </span>
        <Button onClick={() => addModal(<CreateNote />)}>+</Button>
      </div>
      <div className="flex flex-col gap-8 p-6">
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
