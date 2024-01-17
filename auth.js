import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  // signIn and signOut functions can be used in server components and actions. Not available in client components.
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  //   With prisma, we cant use database session, because it doesnt work on Edge runtime
  session: { strategy: "jwt" },
  ...authConfig,
});
