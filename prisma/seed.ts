import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MongoDB...");

  // Create admin (if not exists)
  const existingAdmin = await prisma.admin.findFirst();
  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        email: "m.haris@imagine.art",
        password: bcrypt.hashSync("admin123", 10),
      },
    });
    console.log("✓ Admin created (m.haris@imagine.art / admin123)");
  } else {
    console.log("- Admin already exists");
  }

  // Create sample challenges (if none exist)
  const challengeCount = await prisma.challenge.count();
  if (challengeCount === 0) {
    const now = new Date();
    await prisma.challenge.createMany({
      data: [
        {
          title: "GenArena Sprint Battle",
          description: "",
          theme: "Live Sprint",
          bannerUrl: "",
          deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          prize: "10,000 Free Credits (Top 3)",
          status: "active",
        },
        {
          title: "GenArena Prompt Battles",
          description: "",
          theme: "Prompt Battle",
          bannerUrl: "",
          deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
          prize: "10,000 Free Credits",
          status: "active",
        },
      ],
    });
    console.log("✓ Created 2 challenges");
  } else {
    console.log("- Challenges already exist");
  }

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
