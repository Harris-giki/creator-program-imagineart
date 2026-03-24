import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where = status ? { status } : {};

  const challenges = await prisma.challenge.findMany({
    where,
    include: { _count: { select: { submissions: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(challenges);
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const challenge = await prisma.challenge.create({
    data: {
      title: data.title,
      description: data.description,
      theme: data.theme || "",
      bannerUrl: data.bannerUrl || "",
      deadline: new Date(data.deadline),
      prize: data.prize || "",
      status: data.status || "active",
    },
  });

  return NextResponse.json(challenge, { status: 201 });
}
