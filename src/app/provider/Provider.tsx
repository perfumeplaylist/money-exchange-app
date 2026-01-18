import { RouterProvider } from "react-router";
import { router } from "../router/routes";
import QueryClientProvider from "./QueryClientProvider";


const Provider = () => {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Provider;
