import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import login_query_option from "../model/queryOption";
import { useNavigate } from "react-router";

const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    ...login_query_option.login,
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      { email: data.email },
      {
        onSuccess: () => {
          navigate("/home");
        },
      }
    );
  };

  return { form, onSubmit };
};

export default useLoginForm;
