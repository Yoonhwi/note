import { Modal, NoteMain, NoteNav } from "./container";
import { ModalProvider, NoteProvider } from "./provider";

function App() {
  return (
    <NoteProvider>
      <ModalProvider>
        <Modal />
        <div className="flex min-h-screen h-0 w-full">
          <NoteNav />
          <NoteMain />
        </div>
      </ModalProvider>
    </NoteProvider>
  );
}

export default App;
