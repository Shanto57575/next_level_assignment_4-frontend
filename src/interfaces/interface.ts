export interface Book {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface Borrow {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface createBookResponse {
  success: boolean;
  message: string;
  data: Book;
}
export interface BooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}

export interface borrowResponse {
  success: boolean;
  message: string;
  data: Borrow;
}

export interface IBookSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: IBookSummary[];
}
