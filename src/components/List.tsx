import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteBook, getBookList, selectAllBooks } from "../redux/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { BookType } from "../types/book.types";
import { ModalForm } from "./ModalForm";
import { useModalContext } from "../context/ModalContext";
import { Modal } from "./Modal";

export const List = () => {
  const { openModal, type } = useModalContext();
  const dispatch: AppDispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const isLoading = useSelector((state: any) => state.books.isLoading);

  const openModalDetail = (data: BookType) => {
    openModal({
      type: "DETAIL",
      data: data,
      onCancel: () => {},
    });
  };

  const openModalAddForm = () => {
    openModal({
      type: "FORM",
      onCancel: () => {},
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  };

  useEffect(() => {
    if (isLoading === false) {
      dispatch(getBookList());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="text-center text-4xl font-bold">Book List</h2>
          <button
            className="ml-auto block bg-blue-800 text-white"
            onClick={() => openModalAddForm()}
          >
            Add book
          </button>
          <div className="py-10">
            {books.map((book: BookType) => {
              const { id, title, category, price } = book;
              return (
                <div
                  key={id}
                  className="group flex items-center gap-5 px-3 shadow-md hover:bg-amber-100"
                >
                  <span className="w-[100px] shrink text-sm text-gray-500">
                    [{category}]
                  </span>
                  <h2
                    className="flex-auto cursor-pointer py-5 text-lg font-semibold group-hover:text-blue-800"
                    onClick={() => openModalDetail(book)}
                  >
                    {title}
                  </h2>
                  <span className="px-3">$ {price}</span>
                  <button
                    className="bg-red-800 text-sm text-white"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          {type === "DETAIL" && <Modal />}
          {type === "FORM" && <ModalForm />}
        </div>
      )}
    </>
  );
};
