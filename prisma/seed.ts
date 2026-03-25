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
          description:
            "GenArena is a high-energy, theme-based, 1-hour live creation session hosted on Discord where community members build using ImagineArt's video and image generation workflows.\n\nFormat (60 Minutes):\n• 5 min: Theme reveal + rules\n• 15 min: Live demo (mentor-led workflow walkthrough by Haris)\n• 30 min: Community creation sprint\n• 10 min: Showcase + winner announcement\n\nParticipants submit: Final output, Prompt used, Workflow steps (optional)\n\nIncentive: Top 3 creators receive 10,000 free credits each.",
          theme: "Live Sprint",
          bannerUrl: "",
          deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          prize: "10,000 Free Credits (Top 3)",
          status: "active",
        },
        {
          title: "GenArena Prompt Battles",
          description:
            "A fast-paced, competitive live session where two randomly selected community volunteers compete to recreate the same pre-made scene using ImagineArt workflows.\n\nFormat (20-30 Minutes): Volunteers opt in, two selected, reference scene revealed, 20 min to recreate, community votes, winner announced.\n\nReward: Winner receives 10,000 free credits.",
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
