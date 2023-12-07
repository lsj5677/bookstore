import { useState } from "react";
import { useModalContext } from "../context/ModalContext";
import { ModalDataType } from "../types/modal.types";
import { ModalForm } from "./ModalForm";
import { BookType } from "../types/book.types";

export const Modal = () => {
  const { isOpen, modalData, closeModal, openModal } = useModalContext();
  const { data, onCancel } = modalData as ModalDataType;
  const { title, description, price, category } = data;

  const [test, setTest] = useState<boolean>(false);

  console.log(`data`, data);
  if (!isOpen) {
    return <></>;
  }

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  const handleChange = (data: any) => {
    setTest(true);
    openModal({
      type: "FORM",
      data: data,
      onCancel: () => {},
    });
  };

  return (
    <div className=" fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen place-items-center justify-center bg-slate-300/50">
      <div className="flex h-[600px] w-[500px] items-center justify-center rounded-lg bg-white p-10 shadow-lg">
        {test ? (
          <ModalForm />
        ) : (
          <div className="flex w-full flex-col gap-2 px-3 py-5 text-center">
            <span className="text-sm text-gray-500">[{category}]</span>
            <h2 className="flex-auto text-xl font-semibold">{title}</h2>
            <span className="px-3">$ {price}</span>
            <p className="border-t border-gray-300 py-3">{description}</p>
            <div className="mt-10 flex justify-center gap-3">
              <button
                className="bg-blue-800 text-sm text-white"
                onClick={() => handleChange(data)}
              >
                Update
              </button>
              <button
                className="bg-red-800 text-sm text-white"
                onClick={handleCancel}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
