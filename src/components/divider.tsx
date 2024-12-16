import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

const Divider = (...inputs: ClassValue[]) => {
  return <div className={cn("h-[2px] border-b-2 border-primary", ...inputs)} />;
};

export default Divider;
