import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormErrorMessage,
  Flex,
  Button,
  Text,
  FormInput,
} from "@packages/ui";
import useLoginForm from "../hooks/useLoginForm";

const LoginForm = () => {
  const { form, onSubmit, isLoginPending } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Flex direction="column" gap="lg" className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="block mb-2">
                  <Text variant="label" color="form_label">
                    이메일 주소를 입력해주세요.
                  </Text>
                </FormLabel>
                <FormInput
                  {...field}
                  type="email"
                  placeholder="test@test.com"
                  error={!!form.formState.errors.email}
                />
                <FormErrorMessage className="mt-1 text-sm text-error" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            size="xl"
            className="w-full"
            disabled={!form.formState.isValid || isLoginPending}
          >
            {isLoginPending ? "로그인 중..." : "로그인 하기"}
          </Button>
        </Flex>
      </form>
    </Form>
  );
};

export default LoginForm;
