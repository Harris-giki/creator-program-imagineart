import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createFallbackSubmission,
  getFallbackChallenge,
  listFallbackSubmissions,
} from "@/lib/fallback-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const submissions = await prisma.submission.findMany({
      where: { challengeId: id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions);
  } catch (err) {
    if (getFallbackChallenge(id)) {
      console.warn(
        "[api/.../submissions GET] DB unavailable, serving fallback data:",
        err instanceof Error ? err.message : err
      );
      return NextResponse.json(listFallbackSubmissions(id));
    }
    return NextResponse.json([]);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  if (!data.userName || !data.email || !data.fileUrl) {
    return NextResponse.json(
      { error: "Name, email, and file are required" },
      { status: 400 }
    );
  }

  try {
    const challenge = await prisma.challenge.findUnique({ where: { id } });
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    if (challenge.status === "ended") {
      return NextResponse.json(
        { error: "Challenge has ended" },
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
  } catch (err) {
    const fallback = createFallbackSubmission(id, {
      userName: data.userName,
      email: data.email,
      description: data.description,
      fileUrl: data.fileUrl,
    });

    if (!fallback.ok) {
      return NextResponse.json(
        { error: fallback.error },
        { status: fallback.status }
      );
    }

    console.warn(
      "[api/.../submissions POST] DB unavailable, stored submission in memory:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(fallback.submission, { status: 201 });
  }
}
