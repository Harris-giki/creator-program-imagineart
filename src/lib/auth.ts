import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const ADMIN_SESSION = "imagineart-admin-session";

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION);
  if (!session?.value) return false;

  const admin = await prisma.admin.findUnique({ where: { id: session.value } });
  return !!admin;
}

export async function loginAdmin(email: string, password: string): Promise<{ error?: string }> {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return { error: "Invalid admin credentials" };

  const valid = bcrypt.compareSync(password, admin.password);
  if (!valid) return { error: "Invalid admin credentials" };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION, admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return {};
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION);
}
