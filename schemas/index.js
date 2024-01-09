import * as z from "zod";

export const LoginSchema = z.object({
  // email is string with type of email
  email: z.string().email({
    message: "Email is required",
  }),
  // uz Login shēmas neliekam .min(), lai gadījumā nebloķētu vecos lietotājus ar īsām parolēm
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
