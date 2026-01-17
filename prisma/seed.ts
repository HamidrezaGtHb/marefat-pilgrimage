/**
 * Database Seeding Script
 *
 * This script creates an initial admin user for the system.
 * Run with: npx ts-node prisma/seed.ts
 * Or: npm run seed (after adding to package.json)
 *
 * Default credentials:
 * Email: admin@marefat-pilgrimage.com
 * Password: Admin@123 (CHANGE THIS IN PRODUCTION!)
 */

import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@marefat-pilgrimage.com" },
  });

  if (existingAdmin) {
    console.log("⚠️  Admin user already exists. Skipping...");
    return;
  }

  // Hash the default password
  const defaultPassword = "Admin@123";
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@marefat-pilgrimage.com",
      name: "Admin User",
      role: "ADMIN",
      passwordHash,
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log("📧 Email:", admin.email);
  console.log("🔑 Password:", defaultPassword);
  console.log("");
  console.log("⚠️  IMPORTANT: Change the default password after first login!");
  console.log("");
  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
