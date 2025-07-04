import type { IBookSummary } from "@/interfaces/interface";
import { useGetBookSummaryQuery } from "@/services/librarySlice";
import { LoaderPinwheel } from "lucide-react";
import Summary from "./Summary";

const BookSummary = () => {
  const { data: bookSummary, isLoading } = useGetBookSummaryQuery();
  console.log("bookSummary", bookSummary);

  return (
    <div>
      <>
        {isLoading ? (
          <p className="min-h-screen flex flex-col items-center justify-center text-center animate-spin">
            <LoaderPinwheel size={60} />
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full max-w-6xl mx-3 md:mx-auto border border-gray-300 text-left my-10">
              <thead className="bg-emerald-100 text-emerald-900 text-center">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">ISBN</th>
                  <th className="p-2 border">Total Quantity</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {bookSummary?.data.map(
                  (summary: IBookSummary, index: number) => (
                    <Summary key={index} {...summary} />
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </>
    </div>
  );
};

export default BookSummary;
