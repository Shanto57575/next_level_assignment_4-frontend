import type { Book } from "@/interfaces/interface";
import { useGetAllBooksQuery } from "../services/librarySlice";
import { LoaderPinwheel } from "lucide-react";
import BookData from "./BookData";

const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetAllBooksQuery();

  return (
    <>
      {isLoading ? (
        <p className="min-h-screen flex flex-col items-center justify-center text-center animate-spin">
          <LoaderPinwheel size={60} />
        </p>
      ) : (
        <div>
          <h1 className="text-center text-3xl mt-5 underline">
            Total{" "}
            <span className="font-mono">
              {allBooks ? allBooks?.data?.length : "0"}
            </span>{" "}
            Books
          </h1>
          <div className="w-full overflow-x-auto">
            <table className="w-full max-w-6xl mx-3 md:mx-auto border border-gray-300 text-left my-10">
              <thead className="bg-emerald-100 text-emerald-900 text-center">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Author</th>
                  <th className="p-2 border">Genre</th>
                  <th className="p-2 border">ISBN</th>
                  <th className="p-2 border">Copies</th>
                  <th className="p-2 border">Availability</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allBooks?.data.map((book: Book, index: number) => (
                  <BookData key={index} {...book} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
