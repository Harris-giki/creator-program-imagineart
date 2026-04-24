/**
 * In-memory fallback store used when the primary database (MongoDB)
 * is unreachable. Seeded with the same challenge content as `prisma/seed.ts`
 * so the UI stays functional in any environment.
 *
 * Submissions created through the API while the DB is offline are kept
 * in a module-level Map — they survive across requests but reset with
 * the dev server process (expected for a demo fallback).
 */

import { randomUUID } from "crypto";

export interface FallbackChallenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  bannerUrl: string;
  deadline: Date;
  prize: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FallbackSubmission {
  id: string;
  challengeId: string;
  userName: string;
  email: string;
  description: string;
  fileUrl: string;
  createdAt: Date;
}

const seedTime = new Date();

const FALLBACK_CHALLENGES: FallbackChallenge[] = [
  {
    id: "sprint-genarena",
    title: "GenArena Sprint Battle",
    description: "",
    theme: "Live Sprint",
    bannerUrl: "",
    deadline: new Date(seedTime.getTime() + 7 * 24 * 60 * 60 * 1000),
    prize: "10,000 Free Credits (Top 3)",
    status: "active",
    createdAt: seedTime,
    updatedAt: seedTime,
  },
  {
    id: "battle-genarena",
    title: "GenArena Prompt Battles",
    description: "",
    theme: "Prompt Battle",
    bannerUrl: "",
    deadline: new Date(seedTime.getTime() + 14 * 24 * 60 * 60 * 1000),
    prize: "10,000 Free Credits",
    status: "active",
    createdAt: seedTime,
    updatedAt: seedTime,
  },
];

const submissionsByChallenge = new Map<string, FallbackSubmission[]>();

export function listFallbackChallenges(status?: string | null) {
  const filtered = status
    ? FALLBACK_CHALLENGES.filter((c) => c.status === status)
    : FALLBACK_CHALLENGES;

  return filtered.map((c) => ({
    ...c,
    _count: { submissions: submissionsByChallenge.get(c.id)?.length ?? 0 },
  }));
}

export function getFallbackChallenge(id: string) {
  const challenge = FALLBACK_CHALLENGES.find((c) => c.id === id);
  if (!challenge) return null;
  return {
    ...challenge,
    _count: { submissions: submissionsByChallenge.get(id)?.length ?? 0 },
  };
}

export function listFallbackSubmissions(challengeId: string): FallbackSubmission[] {
  const list = submissionsByChallenge.get(challengeId) ?? [];
  return [...list].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function createFallbackSubmission(
  challengeId: string,
  input: { userName: string; email: string; description?: string; fileUrl: string }
):
  | { ok: true; submission: FallbackSubmission }
  | { ok: false; status: number; error: string } {
  const challenge = FALLBACK_CHALLENGES.find((c) => c.id === challengeId);
  if (!challenge) return { ok: false, status: 404, error: "Challenge not found" };
  if (challenge.status === "ended")
    return { ok: false, status: 400, error: "Challenge has ended" };

  const submission: FallbackSubmission = {
    id: randomUUID(),
    challengeId,
    userName: input.userName,
    email: input.email,
    description: input.description ?? "",
    fileUrl: input.fileUrl,
    createdAt: new Date(),
  };

  const existing = submissionsByChallenge.get(challengeId) ?? [];
  existing.push(submission);
  submissionsByChallenge.set(challengeId, existing);

  return { ok: true, submission };
}
