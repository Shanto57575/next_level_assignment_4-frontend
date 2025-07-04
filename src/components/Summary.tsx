import type { IBookSummary } from "@/interfaces/interface";

const Summary = (summary: IBookSummary) => {
  return (
    <tr className="hover:bg-emerald-200 hover:text-emerald-950">
      <td className="p-3 border-2">{summary?.book?.title}</td>
      <td className="p-3 border-2 font-sans">{summary?.book?.isbn}</td>
      <td className="p-3 border-2 font-sans">{summary?.totalQuantity}</td>
    </tr>
  );
};

export default Summary;
