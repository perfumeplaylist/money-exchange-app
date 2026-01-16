import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "올바른 이메일 형식이 아닙니다.",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
