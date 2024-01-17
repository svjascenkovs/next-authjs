import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  // signIn and signOut functions can be used in server components and actions. Not available in client components.
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting or handling any other side-effects.
  // https://authjs.dev/guides/basics/events
  events: {
    // Sent when an account in a given provider is linked to a user in our user database. For example, when a user signs up with Twitter or when an existing user links their Google account.
    // Ja kāds reģistrējas pirmo reizi caur oAuth provideri, mūsu db tiek izveidots useris. Tā kā oauth google un github paši veic verifikāciju, mēs droši varam verificēt arī mūsu datu bāzē useri. Brīdī kad viņš ienāk pirmo reizi caur oAuth
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // izsauc brīdī kad lietojam kodā signIn() metodi.
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);
    //   // If email is not verified, we can block login. Dont allow to enter if email is not verified.
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    // },

    // session ir tas ko atgriežam kad prasam const session = await auth(); Sesijas objekts
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    // Viss sākas ar jwt callbacku
    async jwt({ token }) {
      // No šejienes varam padot datus uz session callbacku
      if (!token.sub) return token; // If not loged in, do nothing
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token; // If no user, do nothing
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  //   With prisma, we cant use database session, because it doesnt work on Edge runtime
  session: { strategy: "jwt" },
  ...authConfig,
});
