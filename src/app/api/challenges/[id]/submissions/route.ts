import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const submissions = await prisma.submission.findMany({
    where: { challengeId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(submissions);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const challenge = await prisma.challenge.findUnique({ where: { id } });
  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }
  if (challenge.status === "ended") {
    return NextResponse.json({ error: "Challenge has ended" }, { status: 400 });
  }

  const data = await req.json();

  if (!data.userName || !data.email || !data.fileUrl) {
    return NextResponse.json(
      { error: "Name, email, and file are required" },
      { status: 400 }
    );
  }

  const submission = await prisma.submission.create({
    data: {
      challengeId: id,
      userName: data.userName,
      email: data.email,
      description: data.description || "",
      fileUrl: data.fileUrl,
    },
  });

  return NextResponse.json(submission, { status: 201 });
}
