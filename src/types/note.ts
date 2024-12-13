export type BgColorType = "Red" | "Yellow" | "Green" | "Blue";
export type PriorityType = "High" | "Low";

export interface NoteType {
  id: number;
  title: string;
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  bgColor: BgColorType;
  priority: PriorityType;
}

export interface RequestNoteType {
  title: string;
  tags: string[];
  content: string;
  bgColor: BgColorType;
  priority: PriorityType;
  isPinned: boolean;
  isArchived: boolean;
}
