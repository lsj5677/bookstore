import { BookType } from "./../types/book.types";
import axios from "axios";

// npm install -g json-server
// json-server ./bookData.json --port 3001
// const BASE_URL = `http://localhost:3001/books`;
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/books`;

export const _getBookList = async () => {
  try {
    return await axios.get(BASE_URL);
  } catch (err) {
    console.error("err ::", err);
    throw err;
  }
};

export const _addNewBook = async (bookData: BookType) => {
  try {
    return await axios.post(BASE_URL, bookData);
  } catch (err) {
    console.error(`err ::`, err);
  }
};

export const _deleteBook = async (id: string) => {
  try {
    return await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    console.error(`err ::`, err);
  }
};

export const _updateBook = async (id: string, bookData: BookType) => {
  try {
    return await axios.patch(`${BASE_URL}/${id}`, bookData);
  } catch (err) {
    console.error(`err :: `, err);
  }
};
