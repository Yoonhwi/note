import { NoteMain, NoteNav } from "@/container";
import { NoteContext } from "@/provider";
import { useContext } from "react";

const TrashPage = () => {
  const { trashNotes } = useContext(NoteContext);
  return (
    <div className="flex min-h-screen h-0 w-full">
      <NoteNav />
      <NoteMain notes={trashNotes} pathname={"trash"} />
    </div>
  );
};

export default TrashPage;
