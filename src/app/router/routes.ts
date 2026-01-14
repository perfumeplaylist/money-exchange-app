import { LoginPage } from "@/pages";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // { index: true, Component: Home },
      { path: "/login", Component: LoginPage },
      //   { path: "/history", Component: History },
    ],
  },
]);
