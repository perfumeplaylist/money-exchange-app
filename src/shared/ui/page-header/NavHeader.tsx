import { Rss } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { Flex } from "@packages/ui/layout";
import { Text } from "@packages/ui/components";
import { Button } from "@packages/ui/components";
import { removeLocalStorage } from "@/shared/utils/storage";
import { storage_key } from "@/shared/constants/storage";

const NAV_ITEMS = [
  { path: "/home", label: "환전 하기" },
  { path: "/history", label: "환전 내역" },
];

type NavLinkProps = {
  path: string;
  label: string;
  currentPath: string;
};

const NavLink = ({ path, label, currentPath }: NavLinkProps) => {
  const isActive = currentPath.includes(path);

  return (
    <Link to={path}>
      <Text
        variant={isActive ? "link_strong" : "link_lg"}
        color={isActive ? "link_hover" : "link"}
        className="transition-colors cursor-pointer "
      >
        {label}
      </Text>
    </Link>
  );
};

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage(storage_key.auth_token);
    navigate("/login");
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="between"
      className="border-b border-[#D0D6DB] pt-4 pr-10 pb-4 pl-10 w-full"
    >
      {/* 왼쪽: 로고 */}
      <Link to="/home">
        <Flex align="center" className="gap-2">
          <Rss size={24} className="text-primary" strokeWidth={2} />
          <Text variant="heading_lg" className="text-text-primary" as="h1">
            Exchange app
          </Text>
        </Flex>
      </Link>

      {/* 오른쪽: 네비게이션 + 로그아웃 */}
      <Flex align="center" className="gap-10">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            label={item.label}
            currentPath={location.pathname}
          />
        ))}
        <Button variant="logout" onClick={handleLogout}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavHeader;
