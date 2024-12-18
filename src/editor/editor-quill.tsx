import { formatEditorBgColor } from "@/lib/utils";
import { BgColorType } from "@/types";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
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
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (isInitialized || !editorRef.current) return;

      try {
        const QuillModule = await import("quill");

        const editorDiv = editorRef.current;
        editorDiv.innerHTML = "";

        const toolbarContainer = document.querySelector(".ql-toolbar");
        if (toolbarContainer) {
          toolbarContainer.remove();
        }

        const quill = new QuillModule.default(editorDiv, {
          theme: "snow",
          modules: {
            toolbar,
          },
        });

        console.log("defaultValue", defaultValue);
        if (defaultValue) {
          quill.root.innerHTML = defaultValue;
          console.log("in quill", quill.root.innerHTML);
        }

        if (onChange) {
          quill.on("text-change", () => {
            onChange(quill.root.innerHTML);
          });
        }

        quillRef.current = quill;
        setIsInitialized(true);
        console.log("init");
      } catch (error) {
        console.error("Quill 초기화 중 오류:", error);
      }
    })();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
    };
  }, [defaultValue, onChange, isInitialized]);

  return (
    <div>
      <div
        ref={editorRef}
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
