export * from "@prisma/client";

/**
 * @link https://prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type ReturnType<T extends (...args: any) => Promise<any>> =
  Prisma.PromiseReturnType<T>;

export const DBOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type DBOrder = typeof DBOrder[keyof typeof DBOrder];

export function stringToDBOrder(str: string): DBOrder | undefined {
  switch (str) {
    case "asc":
      return DBOrder.ASC;
    case "desc":
      return DBOrder.DESC;
    default:
      return undefined;
  }
}
