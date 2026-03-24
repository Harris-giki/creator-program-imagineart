"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChallengeForm } from "@/components/admin/challenge-form";
import { ArrowLeft, Pencil } from "lucide-react";

export default function EditChallengePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Record<string, string> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
          return;
        }

        fetch(`/api/challenges/${id}`)
          .then((r) => r.json())
          .then((c) => {
            setChallenge(c);
            setLoading(false);
          });
      });
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="h-96 bg-surface animate-pulse border border-border-color rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!challenge) return null;

  const deadlineForInput = challenge.deadline
    ? new Date(challenge.deadline).toISOString().slice(0, 16)
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <Pencil className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-black tracking-tight">
              Edit Challenge
            </h1>
          </div>

          <div className="border border-border-color bg-surface p-6 rounded-2xl">
            <ChallengeForm
              challengeId={id}
              initialData={{
                title: challenge.title,
                description: challenge.description,
                theme: challenge.theme || "",
                bannerUrl: challenge.bannerUrl || "",
                deadline: deadlineForInput,
                prize: challenge.prize || "",
                status: challenge.status,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
