import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Modal } from "./container";
import DefaultPage from "./page/default-page";
import { ModalProvider, NoteProvider } from "./provider";

function App() {
  return (
    <NoteProvider>
      <ModalProvider>
        <Modal />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<DefaultPage />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </NoteProvider>
  );
}

export default App;
