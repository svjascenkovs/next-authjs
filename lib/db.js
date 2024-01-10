import { PrismaClient } from "@prisma/client";

// globalThis is not afffected by hot reload.
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
