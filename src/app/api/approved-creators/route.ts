import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const creators = await prisma.approvedCreator.findMany({
    orderBy: { addedAt: "desc" },
  });

  return NextResponse.json(creators);
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();

  const existing = await prisma.approvedCreator.findUnique({
    where: { email: normalized },
  });
  if (existing) {
    return NextResponse.json({ error: "Email already approved" }, { status: 400 });
  }

  const creator = await prisma.approvedCreator.create({
    data: { email: normalized },
  });

  return NextResponse.json(creator, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.approvedCreator.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
