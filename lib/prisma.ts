import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return (getPrisma() as any)[prop];
  },
  set(_, prop, value) {
    (getPrisma() as any)[prop] = value;
    return true;
  },
}) as PrismaClient;
