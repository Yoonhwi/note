import { formatEditorBgColor } from "@/lib/utils";
import { BgColorType } from "@/types";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { Quill } from "react-quill-new";

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
];

interface QuillEditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  bgColor: BgColorType;
}

const QuillEditor = ({
  defaultValue = "",
  onChange,
  bgColor = "White",
}: QuillEditorProps) => {
  const quillRef = useRef<Quill>();
  const loaded = useRef(false);

  useEffect(() => {
    (async () => {
      if (loaded.current) return;
      loaded.current = true;
      const { default: Quill } = await import("quill");

      quillRef.current = new Quill("#editor-div", {
        theme: "snow",
        modules: {
          toolbar,
        },
      });

      if (!onChange) return;
      quillRef.current.on("text-change", () => {
        onChange(quillRef.current!.root.innerHTML);
      });

      quillRef.current.root.innerHTML = defaultValue;
    })();
  }, [defaultValue, onChange]);

  return (
    <div>
      <div
        id="editor-div"
        className="min-h-[300px] w-[500px] overflow-x-hidden"
        onClick={() => quillRef.current?.focus()}
        style={{
          backgroundColor: formatEditorBgColor(bgColor),
        }}
      />
    </div>
  );
};

export default QuillEditor;
