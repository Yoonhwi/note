import { useCallback, useContext } from "react";
import { NoteContext } from "../../../provider/note-context";
import { Button } from "../../../components/ui/button";
import { Divider } from "@/components";

const EditTags = () => {
  const { categories, addCategory, removeCategory } = useContext(NoteContext);

  const handleAddCategory = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        category: { value: string };
      };
      if (categories.includes(target.category.value)) return;
      addCategory(target.category.value);
      target.category.value = "";
    },
    [addCategory, categories]
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-lg">태그 추가/제거</h1>
      <form className="flex gap-2 h-[50px]" onSubmit={handleAddCategory}>
        <input
          type="text"
          className="flex-1 border-2 border-gray-100 px-2"
          placeholder="카테고리를 추가하세요."
          name="category"
        />
        <Button className="h-full" type="submit">
          추가
        </Button>
      </form>
      <Divider />
      {categories.map((category) => {
        return (
          <div key={category} className="flex gap-2">
            <span className="flex-1">{category}</span>
            <Button onClick={() => removeCategory(category)}>X</Button>
          </div>
        );
      })}
    </div>
  );
};

export default EditTags;
