// src/pages/shared/ui/MainLayout.tsx
import { Outlet } from "react-router";
import { Flex } from "@packages/ui/layout";

export const MainLayout = () => {
  return (
    <Flex direction="column" className="min-h-screen bg-background-page">
      {/* 공통 헤더, 네비게이션 등 */}
      <header>{/* 공통 레이아웃 요소들 */}</header>

      {/* 자식 라우트가 렌더링되는 위치 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </Flex>
  );
};
