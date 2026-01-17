// src/app/router/routes.ts
import { MainLayout } from "@/shared/ui/MainLayout";
import { HistoryPage, HomePage, LoginPage } from "@/pages";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  {
    path: "/",
    Component: MainLayout, // 공통 레이아웃
    children: [
      { path: "/home", Component: HomePage },
      { path: "/history", Component: HistoryPage },
    ],
  },
]);
