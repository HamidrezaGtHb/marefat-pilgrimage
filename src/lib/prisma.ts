/**
 * Prisma Client Instance
 *
 * This file creates and exports a singleton instance of the Prisma Client.
 * In development, it prevents multiple instances from being created due to hot reloading.
 * In production, it creates a single instance.
 *
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Helper function to generate unique booking reference
 * Format: MAR-XXXXX (MAR prefix + 5 random alphanumeric characters)
 */
export function generateBookingRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "MAR-";
  for (let i = 0; i < 5; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

/**
 * Helper function to check if booking reference is unique
 */
export async function generateUniqueBookingRef(): Promise<string> {
  let ref = generateBookingRef();
  let exists = await prisma.booking.findUnique({ where: { bookingRef: ref } });

  // Keep generating until we find a unique one
  while (exists) {
    ref = generateBookingRef();
    exists = await prisma.booking.findUnique({ where: { bookingRef: ref } });
  }

  return ref;
}
