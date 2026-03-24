import { NextRequest, NextResponse } from "next/server";
import {
  getUser,
  loginUser,
  logoutUser,
  setupPassword,
  isApprovedCreator,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === "logout") {
    await logoutUser();
    return NextResponse.json({ success: true });
  }

  if (action === "check-email") {
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const approved = await isApprovedCreator(email);
    if (!approved) {
      return NextResponse.json(
        { error: "Email not found in creator program. Contact m.haris@imagine.art to join." },
        { status: 404 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({
      approved: true,
      hasAccount: !!existingUser,
    });
  }

  if (action === "setup-password") {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const result = await setupPassword(email, password);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result, { status: 201 });
  }

  if (action === "login") {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const result = await loginUser(email, password);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
