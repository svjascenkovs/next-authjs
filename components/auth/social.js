"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components//ui/button";
// Ja lietojam client componentē signIn, tad jāimportē ir no "next-auth/react", nevis no @/auth kā tas bija server komponenšu gadījumā.
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          onClick("google");
        }}
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          onClick("github");
        }}
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
