import { useState } from "react";
import { ModalContext } from ".";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<React.ReactNode[]>([]);

  const addModal = (modal: React.ReactNode) => {
    setModals((prev) => {
      return [...prev, modal];
    });
  };

  const removeModal = () => {
    setModals((prev) => {
      return prev.slice(0, prev.length - 1);
    });
  };

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
