import { Button } from "@/components/ui/button";
import { ModalContext } from "@/provider";
import { useContext } from "react";
import CreateNote from "./create-note";

const NoteMain = () => {
  const { addModal } = useContext(ModalContext);

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex items-center  h-[100px] justify-between px-6 shadow-md">
        <span className="font-bold text-2xl">Notes</span>
        <Button onClick={() => addModal(<CreateNote />)}>+</Button>
      </div>
    </div>
  );
};

export default NoteMain;
