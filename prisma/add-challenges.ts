import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();

  const genarena = await prisma.challenge.create({
    data: {
      title: "GenArena Sprint Battle",
      description: `GenArena is a high-energy, theme-based, 1-hour live creation session hosted on Discord where community members build using ImagineArt's video and image generation workflows.

Format (60 Minutes):
• 5 min: Theme reveal + rules
• 15 min: Live demo (mentor-led workflow walkthrough by Haris)
• 30 min: Community creation sprint
• 10 min: Showcase + winner announcement

Participants submit:
• Final output
• Prompt used
• Workflow steps (optional)

Incentive:
Top 3 creators receive 10,000 free credits each.

Goals:
• Increase product adoption and workflow usage
• Encourage experimentation and skill-building
• Drive real-time engagement in Discord
• Generate shareable community content

Low time commitment. High engagement format. Educational + competitive. Scalable as a recurring weekly/biweekly series.`,
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
      description: `A fast-paced, competitive live session where two randomly selected community volunteers compete to recreate the same pre-made scene using ImagineArt workflows.

Format (20-30 Minutes):
• Volunteers opt in for battle
• Two participants are randomly selected
• A reference scene (image/frame) is revealed live
• Both creators get 20 minutes to replicate it using prompting and workflows
• Final outputs are posted anonymously
• Community votes via Discord poll
• Winner announced live

Reward:
🥇 Winner receives 10,000 PKR worth of credit refill.

Objectives:
• Increase Discord engagement
• Improve prompting & workflow skills
• Drive active product usage
• Create competitive, high-energy community culture

This runs biweekly and can scale into leaderboard rankings or seasonal tournaments.`,
      theme: "Prompt Battle",
      bannerUrl: "",
      deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      prize: "10,000 PKR Credit Refill",
      status: "active",
    },
  });

  console.log("Added GenArena:", genarena.id);
  console.log("Added Prompt Battles:", promptBattles.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
