import { Divider } from "@/components";
import { Button } from "@/components/ui/button";
import { NoteContext } from "@/provider";
import { useContext } from "react";

const NoteEditSort = () => {
  const { sortDate, setSortDate, sortPriority, setSortPriority, sortClear } =
    useContext(NoteContext);

  return (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <div className="flex gap-4 items-center">
        <h1 className="text-lg font-bold">정렬</h1>
        <Button variant={"outline"} onClick={sortClear}>
          CLEAR
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <h3>PRIORITY</h3>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="priority"
            checked={sortPriority === "low-to-high"}
            onChange={() => setSortPriority("low-to-high")}
          />
          <label htmlFor="low-to-high">Low to High</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="priority"
            checked={sortPriority === "high-to-low"}
            onChange={() => setSortPriority("high-to-low")}
          />
          <label htmlFor="high-to-low">High to Low</label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3>DATE</h3>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="date"
            checked={sortDate === "latest"}
            onChange={() => setSortDate("latest")}
          />
          <label htmlFor="low-to-high">Sort by Latest</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="date"
            checked={sortDate === "created"}
            onChange={() => setSortDate("created")}
          />
          <label htmlFor="high-to-low">Sort by Created</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="date"
            checked={sortDate === "edited"}
            onChange={() => setSortDate("edited")}
          />
          <label htmlFor="high-to-low">Sort by Edited</label>
        </div>
      </div>
    </div>
  );
};

export default NoteEditSort;
