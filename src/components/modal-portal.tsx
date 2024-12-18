import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const ModalPortal = ({
  children,
  onClose,
  style = [],
}: {
  children: React.ReactNode;
  onClose: () => void;
  style?: ClassValue[];
}) => {
  return createPortal(
    <div
      className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative z-50 min-h-[300px] max-h-[500px] overflow-y-auto p-4 shadow-md rounded-md bg-white",
          ...style
        )}
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

export default ModalPortal;
