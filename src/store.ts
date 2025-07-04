import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./services/librarySlice";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(libraryApi.middleware),
});
