import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  const genarena = await prisma.challenge.create({
    data: {
      title: "GenArena Sprint Battle",
      description: "",
      theme: "Live Sprint",
      bannerUrl: "",
      deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      prize: "10,000 Free Credits (Top 3)",
      status: "active",
    },
  });

  const promptBattles = await prisma.challenge.create({
    data: {
      title: "GenArena Prompt Battles",
      description: "",
      theme: "Prompt Battle",
      bannerUrl: "",
      deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      prize: "10,000 Free Credits",
      status: "active",
    },
  });

  console.log("Added GenArena:", genarena.id);
  console.log("Added Prompt Battles:", promptBattles.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
