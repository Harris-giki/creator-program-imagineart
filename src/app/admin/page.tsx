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
              <div className="flex items-center gap-2 text-label-xs text-brand-text uppercase tracking-widest mb-1">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Dashboard
              </div>
              <h1 className="text-heading-lg sm:text-heading-xl tracking-tight">
                Manage Challenges
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/creators"
                className="btn btn-secondary btn-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Creator Program
              </Link>
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
              <Link
                href="/admin/challenges/new"
                className="btn btn-expressive btn-lg"
              >
                <Plus className="w-4 h-4" />
                New Challenge
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="card p-5">
              <p className="text-label-xs text-muted uppercase tracking-wider mb-1">
                Total Challenges
              </p>
              <p className="text-heading-md font-black">{challenges.length}</p>
            </div>
            <div className="card p-5">
              <p className="text-label-xs text-muted uppercase tracking-wider mb-1">
                Active
              </p>
              <p className="text-heading-md font-black text-success">
                {activeChallenges}
              </p>
            </div>
            <div className="card p-5">
              <p className="text-label-xs text-muted uppercase tracking-wider mb-1">
                Total Submissions
              </p>
              <p className="text-heading-md font-black text-brand-text">
                {totalSubmissions}
              </p>
            </div>
            <div className="card p-5">
              <p className="text-label-xs text-muted uppercase tracking-wider mb-1">
                Ended
              </p>
              <p className="text-heading-md font-black text-muted">
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
                  className="skeleton h-24 border border-border-secondary rounded-2xl"
                />
              ))}
            </div>
          ) : challenges.length === 0 ? (
            <div className="text-center py-20 card border-dashed border-border-color rounded-2xl">
              <AlertCircle className="w-10 h-10 text-muted mx-auto mb-4" />
              <h3 className="text-heading-xs mb-2">No challenges yet</h3>
              <p className="text-body-sm text-muted mb-6">
                Create your first challenge to get started.
              </p>
              <Link
                href="/admin/challenges/new"
                className="btn btn-expressive btn-md inline-flex"
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
                  className="card p-4 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-4">
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
                      <div className="w-20 h-14 flex-shrink-0 rounded-lg bg-surface-brand border border-border-secondary flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-tertiary" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-label-md truncate text-brand-text">
                          {challenge.title}
                        </h3>
                        <span
                          className={cn(
                            "flex-shrink-0 uppercase tracking-wider",
                            getStatusBadgeClasses(challenge.status)
                          )}
                        >
                          {challenge.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-body-xs text-muted">
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
                        className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-brand-text"
                        title="View submissions"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/challenges/${challenge.id}`}
                        className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-brand-text"
                        title="Edit challenge"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(challenge.id)}
                        disabled={deleting === challenge.id}
                        className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-error disabled:opacity-50"
                        title="Delete challenge"
                        type="button"
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
