import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { getFallbackChallenge } from "@/lib/fallback-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        _count: { select: { submissions: true } },
      },
    });

    if (!challenge) {
      const fallback = getFallbackChallenge(id);
      if (fallback) return NextResponse.json(fallback);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(challenge);
  } catch (err) {
    const fallback = getFallbackChallenge(id);
    if (fallback) {
      console.warn(
        "[api/challenges/:id GET] DB unavailable, serving fallback data:",
        err instanceof Error ? err.message : err
      );
      return NextResponse.json(fallback);
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();

  const challenge = await prisma.challenge.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      theme: data.theme,
      bannerUrl: data.bannerUrl,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      prize: data.prize,
      status: data.status,
    },
  });

  return NextResponse.json(challenge);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.challenge.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
