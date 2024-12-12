import { useContext } from "react";
import { ModalContext } from "../../provider/modal-context";
import { Button } from "../../components/ui/button";

const Modal = () => {
  const { modals, removeModal } = useContext(ModalContext);
  return (
    <>
      {modals?.map((modal, index) => (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md z-40 flex items-center justify-center"
          key={`modal_${index}`}
          onClick={removeModal}
        >
          <div
            className="relative z-50 min-h-[300px] max-h-[500px] overflow-y-auto p-4 shadow-md rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            {modal}
            <div className="absolute top-2 right-2">
              <Button
                onClick={() => {
                  console.log("hit");
                  removeModal();
                }}
                variant={"ghost"}
              >
                X
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Modal;
