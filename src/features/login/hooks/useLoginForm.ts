import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import login_query_option from "../model/query.option";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [, setToken] = useLocalStorage<string>("token", "");

  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    ...login_query_option.login,
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      { email: data.email },
      {
        onSuccess: (data) => {
          setToken(data.data.token);
          navigate("/home");
        },
      }
    );
  };

  return { form, onSubmit };
};

export default useLoginForm;
