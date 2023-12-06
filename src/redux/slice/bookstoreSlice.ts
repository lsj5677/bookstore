import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  name: "",
  price: 0,
  category: "",
  description: "",
};

export const bookstoreSlice = createSlice({
  name: "bookstore",
  initialState,
  reducers: {
    getBooks(state) {},
    getBook(state) {},
    addBook(state) {},
    deleteBook(state) {},
    updateBook(state) {},
  },
});
