import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center h-16 bg-gray-900 gap-6">
      <Link
        className="px-4 py-2 border-b border-white rounded hover:bg-gray-200 hover:text-gray-800 duration-300"
        to="/all-books"
      >
        Book Lists
      </Link>
      <Link
        className="px-4 py-2 border-b border-white rounded hover:bg-gray-200 hover:text-gray-800 duration-300"
        to="/add-book"
      >
        Add Books
      </Link>
      <Link
        className="px-4 py-2 border-b border-white rounded hover:bg-gray-200 hover:text-gray-800 duration-300"
        to="/book-summary"
      >
        Borrow Summary
      </Link>
    </div>
  );
};

export default Navbar;
