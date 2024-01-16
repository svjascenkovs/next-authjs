//  middleware.js file works on Edge runtime, so we cant use Prisma here.

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // Dont do nothing
    return null;
  }

  if (isAuthRoute) {
    // if it's auth route (login or register) and if user is already logged in, redirrect to default redirrect page.
    if (isLoggedIn) {
      // Make absolute url redirrect "localhost:3000/settings" not only "/settings"
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // Do nothing. Proceed with route
    return null;
  }

  // If not loged in and route is not public, then redirrect to login page
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // If nothing matches, let it through. Basically if its public route, let it through.
  return null;
});

export const config = {
  // These matchers will invoke middleware. Every single route, except specific next static files and imanges will invoke middleware.
  // Application is protected by default.
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
