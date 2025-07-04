import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  author: z.string().min(1, {
    message: "Author is required.",
  }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
    }
  ),
  isbn: z.string().min(1, {
    message: "ISBN is required.",
  }),
  description: z.string().min(1, {
    message: "description is required.",
  }),
  copies: z.coerce.number().min(1, {
    message: "At least 1 copy is required.",
  }),
});
