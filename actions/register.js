"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if email is not taken
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  // TODO: Send verification token email

  return { success: "Confirmation email sent!" };
};
