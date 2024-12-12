import { Button } from "@/components/ui/button";

interface CreateNoteEditTagProps {
  allCategories: string[];
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateNoteEditTag = ({
  allCategories,
  currentCategories,
  setCurrentCategories,
}: CreateNoteEditTagProps) => {
  return (
    <>
      {allCategories.map((category) => {
        const isCurrent = currentCategories.includes(category);
        console.log("category:", isCurrent);
        return (
          <div
            key={`${isCurrent}_${category}`}
            className="flex gap-1 items-center h-[30px]"
          >
            <span className="flex-1 bg-yellow-50 h-full py-2 flex items-center px-2">
              {category}
            </span>
            {isCurrent ? (
              <Button
                className="h-full"
                onClick={() => {
                  setCurrentCategories((prev) => {
                    return prev.filter((item) => item !== category);
                  });
                }}
              >
                -
              </Button>
            ) : (
              <Button
                className="h-full"
                onClick={() => {
                  setCurrentCategories((prev) => {
                    return [...prev, category];
                  });
                }}
              >
                +
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CreateNoteEditTag;
