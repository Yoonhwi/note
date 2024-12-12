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
}
