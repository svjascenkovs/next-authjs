import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      // arī šeit jāveic pārbaude, ja gadījumā kāds pa taisno sūta datus uz /api/auth/login izmantojot api, nevis login formu.
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          // check if email is connected with database.
          const user = await getUserByEmail(email);

          // No password can happen if they login through github or google. No credential login can happen without password, thats why its credential login and we need to check for that.
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        // if validation does not success, return null
        return null;
      },
    }),
  ],
};
