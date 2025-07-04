import "./index.css";
import { StrictMode } from "react";
import { router } from "./router/Route.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </Provider>
  </StrictMode>
);
