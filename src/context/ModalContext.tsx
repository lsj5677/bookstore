import { createContext, useContext, useState } from "react";

type ModalData = {
  type: "FORM" | "DETAIL" | "";
  data?: {};
  onCancel: () => void;
  onSubmit?: () => void;
};

const ModalContext = createContext<{
  type: string;
  data: {};
  isOpen: boolean;
  openModal: (modalData: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData;
}>({} as ModalData | any);

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    type: "",
    data: {},
    onCancel: () => {},
    onSubmit: () => {},
  });

  const openModal = ({ type, data, onCancel, onSubmit }: ModalData) => {
    setIsOpen(true);
    setModalData({
      type,
      data,
      onCancel,
      onSubmit,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({
      type: "",
      data: {},
      onCancel: () => {},
      onSubmit: () => {},
    });
  };

  return (
    <ModalContext.Provider
      value={{
        type: modalData.type,
        data: modalData.data || {},
        isOpen,
        openModal,
        closeModal,
        modalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
