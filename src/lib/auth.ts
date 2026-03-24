import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const ADMIN_SESSION = "imagineart-admin-session";
const USER_SESSION = "imagineart-user-session";

// ─── Admin Auth ───

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

// ─── Creator Program: Check if email is approved ───

export async function isApprovedCreator(email: string): Promise<boolean> {
  const approved = await prisma.approvedCreator.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  return !!approved;
}

// ─── User Auth (Creator Program members) ───

export async function getUser(): Promise<{ id: string; name: string | null; email: string } | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(USER_SESSION);
  if (!session?.value) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.value },
    select: { id: true, name: true, email: true },
  });
  return user;
}

export async function setupPassword(email: string, password: string) {
  const approved = await prisma.approvedCreator.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (!approved) return { error: "Email not found in creator program" };

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (existing) return { error: "Account already exists. Please log in instead." };

  const hashed = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      password: hashed,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(USER_SESSION, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { user: { id: user.id, name: user.name, email: user.email } };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (!user) return { error: "Invalid email or password" };

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return { error: "Invalid email or password" };

  const cookieStore = await cookies();
  cookieStore.set(USER_SESSION, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { user: { id: user.id, name: user.name, email: user.email } };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION);
}
