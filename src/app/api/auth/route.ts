import { NextRequest, NextResponse } from "next/server";
import { loginAdmin, logoutAdmin, verifyAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === "logout") {
    await logoutAdmin();
    return NextResponse.json({ success: true });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const result = await loginAdmin(email, password);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const authenticated = await verifyAdmin();
  return NextResponse.json({ authenticated });
}
