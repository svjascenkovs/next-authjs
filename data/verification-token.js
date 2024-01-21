import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token) => {
  try {
    const verificationToken = db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verificationToken = db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
