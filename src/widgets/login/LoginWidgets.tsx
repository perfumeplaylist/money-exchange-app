import LoginForm from "@/features/login/ui/LoginForm";
import { Box, Flex, Text } from "@packages/ui";
import { Rss } from "lucide-react";

const LoginWidgets = () => {
  return (
    <>
      <Flex direction="column" align="center" gap="xl" className="w-full">
        <Rss size={80} className="text-button-logout-bg" strokeWidth={2} />

        <Flex direction="column" align="center" gap="sm">
          <Text variant="heading_xxl" align="center" className="text-5xl">
            반갑습니다.
          </Text>
          <Text
            variant="body_md"
            color="secondary"
            align="center"
            className="text-[32px]"
          >
            로그인 정보를 입력해주세요.
          </Text>
        </Flex>
      </Flex>

      {/* Box를 가운데 정렬하기 위해 w-full과 mx-auto 추가 */}
      <Box variant="form" className="w-full max-w-[560px] mx-auto">
        <LoginForm />
      </Box>
    </>
  );
};

export default LoginWidgets;
