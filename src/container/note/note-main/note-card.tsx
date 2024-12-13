import { Badge } from "@/components/ui/badge";
import { cn, formatBgColor, formatDate } from "@/lib/utils";
import { ModalContext, NoteContext } from "@/provider";
import { NoteType } from "@/types";
import { useContext } from "react";
import { BsFillPinFill } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModifyNote from "./modify-note";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaTrashRestore } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const NoteCard = ({ note }: { note: NoteType }) => {
  const { modifyNote, removeNote, reviveNote, eraseNote } =
    useContext(NoteContext);
  const { addModal } = useContext(ModalContext);

  return (
    <div
      className={cn(
        "border-2 h-[300px] rounded-md p-4 flex flex-col gap-4",
        formatBgColor(note.bgColor)
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl">{note.title}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-xs font-light">{note.priority}</span>
          <BsFillPinFill
            className={cn(
              "cursor-pointer",
              note.isPinned ? "text-red-500" : "text-gray-500"
            )}
            onClick={() => modifyNote(note.id, { isPinned: !note.isPinned })}
          />
        </div>
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: note.content }}
        className="text-sm flex-1"
      />
      <div className="flex gap-2">
        {note.tags.map((tag) => {
          return (
            <Badge
              key={`${note.id}_${tag}`}
              className="bg-black bg-opacity-5 hover:bg-black hover:bg-opacity-5 focus:ring-0 focus:outline-none text-[10px] text-gray-500"
            >
              {tag}
            </Badge>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-gray-500">
        <span className="text-[12px] ">{formatDate(note.createdAt)}</span>
        <div className="flex gap-2 items-center">
          {note.isDeleted ? (
            <>
              <FaTrashRestore
                onClick={() => reviveNote(note.id)}
                className="cursor-pointer"
              />
              <TiDelete
                className="text-[24px] text-red-500 cursor-pointer"
                onClick={() => eraseNote(note.id)}
              />
            </>
          ) : (
            <>
              <FaEdit
                onClick={() => addModal(<ModifyNote note={note} />)}
                className="cursor-pointer"
              />
              <FaTrash
                onClick={() => removeNote(note.id)}
                className="cursor-pointer"
              />
              {note.isArchived ? (
                <IoIosCheckmarkCircleOutline
                  className="text-[20px] cursor-pointer"
                  onClick={() => modifyNote(note.id, { isArchived: false })}
                />
              ) : (
                <IoIosCloseCircleOutline
                  className="text-[20px] cursor-pointer"
                  onClick={() => modifyNote(note.id, { isArchived: true })}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
