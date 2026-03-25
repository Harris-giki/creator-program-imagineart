"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ChallengeForm } from "@/components/admin/challenge-form";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function NewChallengePage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        else setAuth(true);
      });
  }, [router]);

  if (!auth) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-brand-text mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <PlusCircle className="w-5 h-5 text-brand-text" />
            <h1 className="text-heading-lg tracking-tight">
              Create New Challenge
            </h1>
          </div>

          <div className="card p-6">
            <ChallengeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
