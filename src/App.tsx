import "./App.css";
import { List } from "./components/List";
import { Modal } from "./components/Modal";
import { ModalForm } from "./components/ModalForm";
import { ModalContextProvider, useModalContext } from "./context/ModalContext";

function App() {
  return (
    <>
      <ModalContextProvider>
        <List />
      </ModalContextProvider>
    </>
  );
}

export default App;
