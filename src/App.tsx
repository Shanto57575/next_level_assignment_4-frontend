import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="font-serif bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
