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
import { useForm } from "react-hook-form";
import { useBorrowBookMutation } from "@/services/librarySlice";
import { toast } from "sonner";
import type { Borrow } from "@/interfaces/interface";
import type { ModalProps } from "./EditModal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useState } from "react";

const BorrowModal = ({ open, onOpenChange, book }: ModalProps) => {
  const form = useForm<Borrow>({
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  const onSubmit = async (data: Borrow) => {
    if (!data.dueDate) {
      form.setError("dueDate", {
        type: "manual",
        message: "Please select a due date",
      });
      return;
    }
    if (data.quantity > book.copies) {
      form.setError("quantity", {
        type: "manual",
        message: `Only ${book.copies} books left`,
      });
      return;
    }
    try {
      if (!book?._id) {
        toast.error("Invalid book selected.");
        return;
      }
      const result = await borrowBook({
        ...data,
        book: book?._id,
      }).unwrap();
      toast.success(
        <h1 className="text-center font-serif">{result.message}</h1>
      );
      onOpenChange(false);
      navigate("/book-summary");
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
          <DialogTitle>Borrow book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Responsive grid: 1 col always for xs, 2 for md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="quantity"
                        {...field}
                        className="w-full"
                        type="number"
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Please select a due date" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover
                      open={datePopoverOpen}
                      onOpenChange={setDatePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setDatePopoverOpen(false);
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size={"lg"}
              disabled={isLoading || !form.watch("dueDate")}
              className="w-full cursor-pointer mt-2"
              type="submit"
            >
              {isLoading ? "Borrowing..." : "Borrow"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
