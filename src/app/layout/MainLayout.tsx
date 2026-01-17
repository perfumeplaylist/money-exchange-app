// src/app/layout/MainLayout.tsx
import { Outlet } from "react-router";
import { Flex } from "@packages/ui/layout";
import { NavHeader } from "@/shared";

export const MainLayout = () => {
  return (
    <Flex direction="column" className="min-h-screen bg-background-page">
      <NavHeader />

      {/* 자식 라우트가 렌더링되는 위치 */}
      <main className="flex-1 pt-[40px] px-[80px]">
        <Outlet />
      </main>
    </Flex>
  );
};
