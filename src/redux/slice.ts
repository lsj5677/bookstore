import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  _addNewBook,
  _deleteBook,
  _getBookList,
  _updateBook,
} from "../api/BookApi";
import { BookType } from "../types/book.types";

const initialState = {
  books: [
    {
      id: "",
      title: "",
      price: 0,
      description: "",
      category: "",
    },
  ] as BookType[],
  isLoading: false,
  error: null as any,
};

const sortByCreatedAt = (a: BookType, b: BookType) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const getBookList = createAsyncThunk(
  "books/getBookList",
  async (payload, thunkAPI) => {
    try {
      const res = await _getBookList();
      const sortItems = res.data.sort(sortByCreatedAt);
      return thunkAPI.fulfillWithValue(sortItems);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData: BookType, thunkAPI) => {
    try {
      const res = await _addNewBook(bookData);
      return thunkAPI.fulfillWithValue(res?.data);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string, { dispatch }) => {
    try {
      if (window.confirm("Do you really want to delete?")) {
        const res = await _deleteBook(id);
        dispatch(getBookList());
      }
    } catch (error) {
      console.log(`error ::`, error);
    }
  },
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookData: BookType, { dispatch }) => {
    try {
      const res = await _updateBook(bookData.id, bookData);
      dispatch(getBookList());
    } catch (error) {
      console.log(`error ::`, error);
    }
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(getBookList.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      .addCase(getBookList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBookList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books = [...state.books, action.payload].sort(sortByCreatedAt);
      });
  },
});

export default booksSlice.reducer;

export const selectAllBooks = (state: any) => state.books.books;
