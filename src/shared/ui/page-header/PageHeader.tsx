import { Flex, Text } from "@packages/ui";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Flex direction="column" gap="xxs" className="pb-4">
      <Text
        as="h1"
        variant="heading_xxl"
        className="text-[#28323C] text-[40px]"
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
