import { createBrowserRouter } from "react-router";
import App from "../App";
import AllBooks from "../components/AllBooks";
import AddBook from "../components/AddBook";
import BookSummary from "../components/BookSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "/all-books",
        Component: AllBooks,
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/book-summary",
        Component: BookSummary,
      },
    ],
  },
]);
