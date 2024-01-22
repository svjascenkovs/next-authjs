import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email) => {
  const token = uuidv4();

  // expire token in 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  // Delete existing token if exists
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  // Create new token
  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};
