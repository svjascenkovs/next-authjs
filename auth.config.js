import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  // Check providers on http://localhost:3000/api/auth/providers
  providers: [
    // console.cloud.google.com -> make new project -> go api & services -> oauth consent screen -> external -> credentials -> create credentials ->oauth client id
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // github.com -> settings -> developer settings -> Oauth Apps
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      // arī šeit jāveic pārbaude, ja gadījumā kāds pa taisno sūta datus uz /api/auth/login izmantojot api, nevis login formu.
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          // check if email is connected with database.
          const user = await getUserByEmail(email);

          // No password can happen if they login through github or google. No credential login can happen without password, thats why its credential login and we need to check for that.
          // If we login with oauth, new user will be created in DB, without passsword. So afterwards, if with that email someone tries to log in using credential login, we reject that.
          // Basically we reject credential logins if user in db doesnt have password (that means he have oauth registered account)
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
