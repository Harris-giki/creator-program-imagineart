"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { cn, formatDate, getStatusBadgeClasses } from "@/lib/utils";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Users,
  Trophy,
  LayoutDashboard,
  LogOut,
  AlertCircle,
  UserPlus,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  deadline: string;
  prize: string;
  status: string;
  createdAt: string;
  _count: { submissions: number };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setAuthenticated(true);
          fetchChallenges();
        }
      });
  }, [router]);

  function fetchChallenges() {
    fetch("/api/challenges")
      .then((r) => r.json())
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      });
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this challenge?")) return;
    setDeleting(id);
    await fetch(`/api/challenges/${id}`, { method: "DELETE" });
    setChallenges(challenges.filter((c) => c.id !== id));
    setDeleting(null);
  }

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  }

  if (!authenticated) return null;

  const totalSubmissions = challenges.reduce(
    (sum, c) => sum + (c._count?.submissions || 0),
    0
  );
  const activeChallenges = challenges.filter(
    (c) => c.status === "active"
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest mb-1">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Manage Challenges
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/creators"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted hover:text-foreground border border-border-color hover:border-primary/30 transition-all rounded-lg"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Creator Program
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted hover:text-foreground border border-border-color hover:border-red-500/30 transition-all rounded-lg"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
              <Link
                href="/admin/challenges/new"
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "text-white text-sm font-semibold",
                  "hover:from-violet-500 hover:to-purple-500",
                  "transition-all duration-200"
                )}
              >
                <Plus className="w-4 h-4" />
                New Challenge
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="border border-border-color bg-surface p-5 rounded-xl">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">
                Total Challenges
              </p>
              <p className="text-2xl font-black">{challenges.length}</p>
            </div>
            <div className="border border-border-color bg-surface p-5 rounded-xl">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">
                Active
              </p>
              <p className="text-2xl font-black text-emerald-400">
                {activeChallenges}
              </p>
            </div>
            <div className="border border-border-color bg-surface p-5 rounded-xl">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">
                Total Submissions
              </p>
              <p className="text-2xl font-black text-primary">
                {totalSubmissions}
              </p>
            </div>
            <div className="border border-border-color bg-surface p-5 rounded-xl">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">
                Ended
              </p>
              <p className="text-2xl font-black text-muted">
                {challenges.filter((c) => c.status === "ended").length}
              </p>
            </div>
          </div>

          {/* Challenge List */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 border border-border-color bg-surface animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : challenges.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border-color rounded-2xl">
              <AlertCircle className="w-10 h-10 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No challenges yet</h3>
              <p className="text-sm text-muted mb-6">
                Create your first challenge to get started.
              </p>
              <Link
                href="/admin/challenges/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Create Challenge
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-border-color bg-surface hover:bg-surface-hover transition-colors rounded-xl"
                >
                  <div className="flex items-center gap-4 p-4">
                    {challenge.bannerUrl ? (
                      <div className="relative w-20 h-14 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={challenge.bannerUrl}
                          alt={challenge.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-primary/40" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm truncate">
                          {challenge.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border flex-shrink-0 rounded-full",
                            getStatusBadgeClasses(challenge.status)
                          )}
                        >
                          {challenge.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {challenge._count.submissions} submissions
                        </span>
                        <span>Due {formatDate(challenge.deadline)}</span>
                        {challenge.prize && (
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {challenge.prize}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        href={`/admin/challenges/${challenge.id}/submissions`}
                        className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                        title="View submissions"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/challenges/${challenge.id}`}
                        className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                        title="Edit challenge"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(challenge.id)}
                        disabled={deleting === challenge.id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete challenge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
