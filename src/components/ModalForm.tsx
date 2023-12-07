import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { addBook, updateBook } from "../redux/slice";
import { AppDispatch } from "../redux/store";
import { useModalContext } from "../context/ModalContext";
import { ModalDataType } from "../types/modal.types";

type ValueStateType = {
  id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

export const ModalForm = () => {
  const { isOpen, modalData, closeModal } = useModalContext();
  const { onCancel, onSubmit, data } = modalData as ModalDataType;
  const dispatch: AppDispatch = useDispatch();

  const [values, setValues] = useState<ValueStateType>({
    title: data ? data.title : "",
    description: data ? data.description : "",
    category: data ? data.category : "",
    price: data ? data.price : 10,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const bookData = {
      id: nanoid(),
      createdAt: new Date(),
      ...values,
    };

    const { title, description, category } = bookData;

    if (title === "" || description === "" || category === "") {
      alert("Please enter a value");
    } else {
      console.log(`bookData`, bookData);
      await dispatch(addBook(bookData)).then(() => {
        closeModal();
      });
    }
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const EditBookData = {
      id: data?.id,
      createdAt: data?.createdAt,
      ...values,
    };

    if (
      EditBookData.title === "" ||
      EditBookData.description === "" ||
      EditBookData.category === ""
    ) {
      alert("Please enter a value");
    } else {
      console.log(`bookData`, EditBookData);
      await dispatch(updateBook(EditBookData)).then(() => {
        closeModal();
      });
    }
  };

  if (!isOpen) {
    return <></>;
  }

  const INPUT_STYLE = "border border-gray-800 rounded-md ps-3 py-2";
  return (
    <div className=" fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen place-items-center justify-center bg-slate-300/50">
      <div className="flex h-[600px] w-[500px] items-center justify-center rounded-lg bg-white p-10 shadow-lg">
        <div className="w-full">
          <h2 className="my-5 text-center text-xl font-semibold">
            {data ? "Update Book" : "Add new book"}
          </h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="book title"
              value={values.title}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />
            <input
              type="text"
              name="category"
              id="category"
              placeholder="book category"
              value={values.category}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />
            <input
              type="text"
              name="price"
              id="price"
              placeholder="book price"
              value={values.price}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />
            <textarea
              name="description"
              id="description"
              placeholder="book description"
              value={values.description}
              onChange={handleChange}
              className={`h-[120px] resize-none ${INPUT_STYLE}`}
              required
            />
            <div className="flex items-center justify-center gap-5">
              <button className="bg-gray-800 text-white" onClick={handleCancel}>
                Cancle
              </button>
              {data ? (
                <button
                  type="button"
                  className="bg-blue-800 text-white"
                  onClick={handleUpdate}
                >
                  Update Book
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-800 text-white"
                  onClick={handleSubmit}
                >
                  Add Book
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
