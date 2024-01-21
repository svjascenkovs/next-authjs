"use server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const login = async (values) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    return { success: "Confirmation email sent!" };
  }

  try {
    // signIn iet cauri auth.config.js failam, tā kā šeit ir credentials, tad tieši caur credentials authorize loģiku.
    await signIn("credentials", {
      email,
      password,
      // Šo apakšā var arī nerakstīt, jo par to parūpējās arī middleware.js, bet mēs vienkārši aprakstam to explicitly.
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
