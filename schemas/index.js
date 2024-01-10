import * as z from "zod";

export const LoginSchema = z.object({
  // email is string with type of email
  email: z.string().email({
    message: "Email is required",
  }),
  // uz Login shēmas neliekam .min(6) vai kaut kā tā, lai gadījumā nebloķētu vecos lietotājus ar īsām parolēm
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  // email is string with type of email
  email: z.string().email({
    message: "Email is required",
  }),
  // uz Login shēmas neliekam .min(6) vai kaut kā tā, lai gadījumā nebloķētu vecos lietotājus ar īsām parolēm
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
