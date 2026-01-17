import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import login_query_option from "../model/query.option";
import { setLocalStorage } from "@/shared/utils/storage";
import { storage_key } from "@/shared";

const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { mutate: login, isPending: isLoginPending } = useMutation({
    ...login_query_option.login,
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      { email: data.email },
      {
        onSuccess: (data) => {
          try {
            setLocalStorage<string>(storage_key.auth_token, data.token);
            navigate("/home");
          } catch (error: unknown) {
            if (error instanceof Error) {
              form.setError("email", { message: error.message });
            }
          }
        },
        onError: (error) => {
          form.setError("email", { message: error.message });
        },
      }
    );
  };

  return { form, onSubmit, isLoginPending };
};

export default useLoginForm;
