import { Divider, ModalPortal } from "@/components";
import { Button } from "@/components/ui/button";
import { QuillEditor } from "@/editor";
import { ModalContext, NoteContext } from "@/provider";
import { BgColorType, PriorityType } from "@/types";
import { useContext, useRef, useState } from "react";
import CreateNoteEditTag from "./create-note.edit-tag";

const CreateNote = () => {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState<BgColorType>("White");
  const [priority, setPriority] = useState<PriorityType>("Low");
  const [isOpen, setIsOpen] = useState(false);

  const { categories, addNote } = useContext(NoteContext);
  const { removeModal } = useContext(ModalContext);
  const contentRef = useRef("");

  const bgOptions: BgColorType[] = ["White", "Red", "Yellow", "Green", "Blue"];

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        const target = e.target as typeof e.target & {
          title: { value: string };
        };

        e.preventDefault();
        addNote({
          tags: currentCategories,
          title: target.title.value,
          content: contentRef.current,
          bgColor,
          priority,
          isPinned: false,
          isArchived: false,
        });

        removeModal();
      }}
    >
      <span className="font-semibold text-lg">노트 생성하기</span>

      <input
        className="border-[1px] border-[rgb(204,204,204)] h-[30px] p-5"
        placeholder="title"
        name="title"
        type="text"
        required
      />

      <QuillEditor
        defaultValue=""
        onChange={(v) => (contentRef.current = v)}
        bgColor={bgColor}
      />

      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Add Tag
        </Button>
        <div className="flex gap-1 items-center">
          <span>배경색:</span>
          <select
            className="relative bottom-[1px] border-2"
            onChange={(v) => setBgColor(v.target.value as BgColorType)}
          >
            {bgOptions.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-1 items-center">
          <span>우선순위:</span>
          <select
            className="relative bottom-[1px] border-2"
            onChange={(v) => setPriority(v.target.value as PriorityType)}
          >
            <option>Low</option>
            <option>High</option>
          </select>
        </div>
      </div>
      {isOpen && (
        <ModalPortal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div>태그 추가/제거</div>
            <Divider />
            <CreateNoteEditTag
              allCategories={categories}
              currentCategories={currentCategories}
              setCurrentCategories={setCurrentCategories}
            />
          </div>
        </ModalPortal>
      )}
      <Button type="submit">생성하기</Button>
    </form>
  );
};

export default CreateNote;
