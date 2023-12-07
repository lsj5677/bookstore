import { BookType } from "./book.types";

export type ModalDataType = {
  type: string;
  data: BookType;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
};
