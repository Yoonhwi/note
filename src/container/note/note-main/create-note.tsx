import { Button } from "@/components/ui/button";
import { QuillEditor } from "@/editor";
import { NoteContext } from "@/provider";
import { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CreateNoteEditTag from "./create-note.edit-tag";

const CreateNote = () => {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isOpen, setIsOpen] = useState(false);

  const { categories } = useContext(NoteContext);
  const contentRef = useRef("");

  const ModalPortal = ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    return createPortal(
      <div
        className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md z-40 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative z-50 min-h-[300px] max-h-[500px] overflow-y-auto p-4 shadow-md rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <div className="absolute top-2 right-2">
            <Button onClick={onClose} variant={"ghost"}>
              X
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        const target = e.target as typeof e.target & {
          title: { value: string };
        };

        e.preventDefault();
        console.log({
          tags: currentCategories,
          title: target.title.value,
          content: contentRef.current,
          bgColor,
          priority,
        });
      }}
    >
      <span className="font-semibold text-lg">노트 생성하기</span>

      <input
        className="border-[1px] border-[rgb(204,204,204)] h-[30px] p-5"
        placeholder="title"
        name="title"
        type="text"
      />

      <QuillEditor defaultValue="" onChange={(v) => (contentRef.current = v)} />

      <div className="flex justify-between items-center">
        <Button variant={"outline"} onClick={() => setIsOpen(true)}>
          Add Tag
        </Button>
        <div className="flex gap-1 items-center">
          <span>배경색:</span>
          <select
            className="relative bottom-[1px] border-2"
            onChange={(v) => setBgColor(v.target.value)}
          >
            <option>Red</option>
            <option>Yellow</option>
            <option>Green</option>
            <option>Blue</option>
          </select>
        </div>
        <div className="flex gap-1 items-center">
          <span>우선순위:</span>
          <select
            className="relative bottom-[1px] border-2"
            onChange={(v) => setPriority(v.target.value)}
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
            <div className="h-[2px] border-b-2 border-primary" />
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
