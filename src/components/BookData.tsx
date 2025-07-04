import type { Book } from "@/interfaces/interface";
import { SquarePen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useDeleteBookMutation } from "@/services/librarySlice";
import { toast } from "sonner";
import { useState } from "react";
import EditModal from "./EditModal";
import BorrowModal from "./BorrowModal";

const BookData = (book: Book) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowedBook, setBorrowedBook] = useState<Book | null>(null);

  const openEditModal = (book: Book) => {
    setIsEditOpen(true);
    setSelectedBook(book);
  };

  const openBorrowModal = (book: Book) => {
    setIsBorrowOpen(true);
    setBorrowedBook(book);
  };

  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDeleteBook = async (bookId: string | undefined) => {
    try {
      const result = await deleteBook({ bookId }).unwrap();
      if (result.success) {
        toast.success(
          <h1 className="text-center font-serif">{result.message}</h1>
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        <h1 className="text-center font-serif">Failed to delete book</h1>
      );
    }
  };

  return (
    <tr className="hover:bg-emerald-200 hover:text-emerald-950">
      <td className="p-3 border-2">{book.title}</td>
      <td className="p-3 border-2">{book.author}</td>
      <td className="p-3 border-2">{book.genre}</td>
      <td className="p-3 border-2 font-sans">{book.isbn}</td>
      <td className="p-3 border-2 font-sans">{book.copies}</td>
      <td className="p-3 border-2">
        {book.available ? "Available" : "Unavailable"}
      </td>
      <td className="p-3 border flex flex-col md:flex-row items-center gap-5">
        {/* Edit */}
        <SquarePen
          onClick={() => openEditModal(book)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        />
        {selectedBook && (
          <EditModal
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            book={selectedBook}
          />
        )}
        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="text-red-500 hover:text-red-600 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You want to delete the book?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={() => handleDeleteBook(book._id)}
                className="cursor-pointer"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* Borrow */}
        <Button
          disabled={!book.available}
          onClick={() => openBorrowModal(book)}
          className="cursor-pointer"
        >
          Borrow
        </Button>
        {borrowedBook && (
          <BorrowModal
            open={isBorrowOpen}
            onOpenChange={setIsBorrowOpen}
            book={borrowedBook}
          />
        )}
      </td>
    </tr>
  );
};

export default BookData;
