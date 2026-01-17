import { Flex } from "@packages/ui/layout";
import { Text } from "@packages/ui/components";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Flex
      direction="column"
      gap="none"
      className="gap-[10px] pb-4"
    >
      <Text
        as="h1"
        className="font-bold text-[40px] text-text-primary"
      >
        {title}
      </Text>
      {description && (
        <Text variant="body_lg" color="secondary">
          {description}
        </Text>
      )}
    </Flex>
  );
};
