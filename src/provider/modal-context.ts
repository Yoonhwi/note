import { createContext } from "react";

interface ModalContextInterface {
  modals: React.ReactNode[];
  addModal: (modal: React.ReactNode) => void;
  removeModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface>({
  modals: [],
  addModal: () => {},
  removeModal: () => {},
});
