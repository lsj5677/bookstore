import { configureStore } from "@reduxjs/toolkit";
import { bookstoreSlice } from "../slice/bookstoreSlice";

export const store = configureStore({
  reducer: {
    bookstoreReducer: bookstoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
