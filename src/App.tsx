import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Modal } from "./container";
import DefaultPage from "./pages/default-page";
import { ModalProvider, NoteProvider } from "./provider";
import TrashPage from "./pages/trash";

function App() {
  return (
    <NoteProvider>
      <ModalProvider>
        <Modal />
        <BrowserRouter>
          <Routes>
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/*" element={<DefaultPage />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </NoteProvider>
  );
}

export default App;
