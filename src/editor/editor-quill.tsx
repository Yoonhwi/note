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
}

const QuillEditor = ({ defaultValue = "", onChange }: QuillEditorProps) => {
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

  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.root.innerHTML = defaultValue;
  }, [defaultValue]);

  return (
    <div>
      <div
        id="editor-div"
        className="h-[480px] min-h-[300px] w-[500px] overflow-x-hidden"
        onClick={() => quillRef.current?.focus()}
      />
    </div>
  );
};

export default QuillEditor;
