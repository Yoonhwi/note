import { BgColorType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (input: string) => {
  const date = new Date(input);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};

export const formatBgColor = (color: BgColorType) => {
  switch (color) {
    case "Red":
      return "bg-red-100";
    case "Blue":
      return "bg-blue-100";
    case "Yellow":
      return "bg-yellow-100";
    case "Green":
      return "bg-green-100";
  }
};
