import { Button } from "@/components/ui/button";
import { QuillEditor } from "@/editor";
import { ModalContext, NoteContext } from "@/provider";
import { useContext, useEffect, useRef, useState } from "react";
import CreateNoteEditTag from "./create-note.edit-tag";

const CreateNote = () => {
  const { addModal } = useContext(ModalContext);
  const { categories } = useContext(NoteContext);

  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(categories);

  const [bgColor, setBgColor] = useState("");
  const [priority, setPriority] = useState("Low");
  const contentRef = useRef("");

  useEffect(() => {
    console.log("rerender current", currentCategories);
    setAllCategories(() => {
      return [...categories];
    });
  }, [categories, currentCategories]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        const target = e.target as typeof e.target & {
          title: { value: string };
        };

        e.preventDefault();
        console.log({
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
        <Button
          variant={"outline"}
          onClick={() =>
            addModal(
              <div className="flex flex-col gap-2 min-w-[200px]">
                <div>태그 추가/제거</div>
                <div className="h-[2px] border-b-2 border-primary" />
                <CreateNoteEditTag
                  allCategories={allCategories}
                  currentCategories={currentCategories}
                  setCurrentCategories={setCurrentCategories}
                />
              </div>
            )
          }
        >
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

      <Button type="submit">생성하기</Button>
    </form>
  );
};

export default CreateNote;
