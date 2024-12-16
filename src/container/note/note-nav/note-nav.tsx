import { useContext } from "react";
import { FaLightbulb, FaPen, FaTag } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import EditTags from "./note-nav.edit-tags";
import { ModalContext, NoteContext } from "@/provider";
import { useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";

const NoteNav = () => {
  const { addModal } = useContext(ModalContext);
  const { categories } = useContext(NoteContext);
  const navigate = useNavigate();

  return (
    <div className="w-[300px] h-full min-h-full bg-primary flex flex-col">
      <div className="flex items-center h-[100px] shadow-md px-6 font-bold text-2xl">
        Keep
      </div>
      <div className="flex flex-col py-4">
        <div
          className="h-[60px] flex items-center gap-5 px-6 hover:bg-chart-4 cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          <FaLightbulb />
          <span>Notes</span>
        </div>
        {categories.map((category) => {
          return (
            <div
              className="h-[60px] flex items-center gap-5 px-6 hover:bg-chart-4 cursor-pointer"
              key={category}
              onClick={() => navigate(`/${category}`)}
            >
              <FaTag />
              <span>{category}</span>
            </div>
          );
        })}
        <div
          className="h-[60px] flex items-center gap-5 px-6 hover:bg-chart-4 cursor-pointer"
          onClick={() => addModal(<EditTags />)}
        >
          <FaPen />
          <span>Edit Tags</span>
        </div>
        <div
          className="h-[60px] flex items-center gap-5 px-6 hover:bg-chart-4 cursor-pointer"
          onClick={() => navigate(`/archive`)}
        >
          <FaBoxArchive />
          <span>Archive</span>
        </div>
        <div
          className="h-[60px] flex items-center gap-5 px-6 hover:bg-chart-4 cursor-pointer"
          onClick={() => navigate(`/trash`)}
        >
          <FaTrash />
          <span>Trash</span>
        </div>
      </div>
    </div>
  );
};

export default NoteNav;
