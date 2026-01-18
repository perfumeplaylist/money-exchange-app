import { RouterProvider } from "react-router";
import { router } from "../router/routes";
import QueryClientProvider from "./QueryClientProvider";
import { Toaster } from "@packages/ui";


const Provider = () => {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
