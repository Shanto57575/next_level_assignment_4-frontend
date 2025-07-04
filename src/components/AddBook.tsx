import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schema/formSchema";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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
import type { Book } from "@/interfaces/interface";
import { useCreateBookMutation } from "@/services/librarySlice";

const AddBook = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      description: "",
      isbn: "",
      copies: 1,
    },
  });

  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const book: Book = {
      ...data,
      available: true,
    };
    try {
      const result = await createBook(book).unwrap();
      toast.success(
        <h1 className="text-center font-serif">{result.message}</h1>
      );
      form.reset({
        title: "",
        author: "",
        genre: undefined,
        description: "",
        isbn: "",
        copies: 1,
      });
      navigate("/all-books");
    } catch (error) {
      console.error("Error creating book:", error);

      toast.error(
        <h1 className="text-center font-serif">Failed to create book</h1>
      );
    }
  };

  return (
    <div className="max-w-xl mx-3 md:mx-auto border mt-16 md:mt-28 mb-20 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add a New Book
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
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
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      className="font-sans"
                      placeholder="ISBN number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
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
                      className="font-sans"
                      type="number"
                      min={1}
                      {...field}
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
            {isLoading ? "submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddBook;
