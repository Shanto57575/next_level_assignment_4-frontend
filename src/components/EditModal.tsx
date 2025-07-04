import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schema/formSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUpdateBookMutation } from "@/services/librarySlice";
import { toast } from "sonner";
import { type Book } from "@/interfaces/interface";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
}

const EditModal = ({ open, onOpenChange, book }: ModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: book?.genre,
      description: book?.description || "",
      isbn: book?.isbn || "",
      copies: book?.copies || 1,
    },
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      const result = await updateBook({
        bookId: book._id,
        updatedBook: data,
      }).unwrap();
      toast.success(
        <h1 className="text-center font-serif">{result.message}</h1>
      );
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(
        <h1 className="text-center font-serif">Failed to update book</h1>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xs sm:max-w-sm md:max-w-md p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Responsive grid: 1 col always for xs, 2 for md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Book title"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Author name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black text-white">
                        <SelectItem value="FICTION">FICTION</SelectItem>
                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input
                        className="font-sans w-full"
                        placeholder="ISBN number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Short description"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Number of copies"
                        className="font-sans w-full"
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size={"lg"}
              disabled={isLoading}
              className="w-full cursor-pointer mt-2"
              type="submit"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
