import { extractErrorCode, ERROR_MESSAGES } from "@/shared";
import { Button, Text, Box, Flex } from "@packages/ui";
import { AlertCircleIcon } from "lucide-react";

type FallbackUIProps = {
  error: Error;
  resetErrorBoundary?: () => void;
  reset?: () => void;
}

export function FallbackUI({ error, resetErrorBoundary, reset }: FallbackUIProps) {
  const errorCode = extractErrorCode(error);
  const message =
    errorCode && ERROR_MESSAGES[errorCode]
      ? ERROR_MESSAGES[errorCode]
      : error.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="py-12 px-4 mx-auto">
      <Box
        variant="container"
        className="w-full max-w-md border border-error rounded-radius-lg bg-background p-8 shadow-shadow-form"
      >
        <Flex direction="column" gap="lg" align="center" justify="center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2]">
            <AlertCircleIcon className="h-8 w-8 text-error" />
          </div>
          <Flex direction="column" gap="xs" align="center" className="w-full">
            <Text variant="heading_lg" color="error" align="center">
              오류가 발생했습니다
            </Text>
            <Text variant="body_sm" color="secondary" align="center" className="w-full max-w-sm">
              {message}
            </Text>
          </Flex>
          {resetErrorBoundary && (
            <Button
              variant="primary"
              size="md"
              onClick={reset}
              className="w-full max-w-[200px]"
            >
              다시 시도
            </Button>
          )}
        </Flex>
      </Box>
    </div>
  );
}

