import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Book,
  BooksResponse,
  Borrow,
  borrowResponse,
  BorrowSummaryResponse,
  createBookResponse,
} from "../interfaces/interface";

export const libraryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://next-level-assignment-4-server.vercel.app/api",
  }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<BooksResponse, void>({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getBookSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => "borrow",
      providesTags: ["Books", "Borrow"],
    }),
    createBook: builder.mutation<createBookResponse, Book>({
      query: (bookData) => ({
        url: "books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `books/${bookId}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation<borrowResponse, Borrow>({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books", "Borrow"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBookSummaryQuery,
} = libraryApi;
