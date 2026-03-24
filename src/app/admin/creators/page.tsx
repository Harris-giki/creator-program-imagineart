"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, Mail, Plus, Trash2, Users } from "lucide-react";

interface Creator {
  id: string;
  email: string;
  addedAt: string;
}

export default function ApprovedCreatorsPage() {
  const router = useRouter();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setAuthenticated(true);
          fetchCreators();
        }
      });
  }, [router]);

  function fetchCreators() {
    fetch("/api/approved-creators")
      .then((r) => r.json())
      .then((data) => {
        setCreators(data);
        setLoading(false);
      });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setAdding(true);
    setError("");

    const res = await fetch("/api/approved-creators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail.trim() }),
    });

    const data = await res.json();

    if (res.ok) {
      setCreators([data, ...creators]);
      setNewEmail("");
    } else {
      setError(data.error || "Failed to add");
    }
    setAdding(false);
  }

  async function handleRemove(id: string) {
    if (!confirm("Remove this creator from the program?")) return;

    await fetch(`/api/approved-creators?id=${id}`, { method: "DELETE" });
    setCreators(creators.filter((c) => c.id !== id));
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-black tracking-tight">
              Creator Program
            </h1>
          </div>

          <p className="text-sm text-muted mb-6">
            Add emails of creators who joined via the Google Form. These users can then log in and set up their password.
          </p>

          {/* Add form */}
          <form onSubmit={handleAdd} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface border border-border-color text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={adding || !newEmail.trim()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Creator
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </form>

          {/* List */}
          <div className="rounded-2xl border border-border-color overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-muted">Loading...</div>
            ) : creators.length === 0 ? (
              <div className="p-8 text-center text-muted">
                No approved creators yet. Add emails from your Google Form responses.
              </div>
            ) : (
              <div className="divide-y divide-border-color">
                {creators.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover"
                  >
                    <span className="text-sm truncate">{c.email}</span>
                    <span className="text-xs text-muted flex-shrink-0 ml-2">
                      {new Date(c.addedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleRemove(c.id)}
                      className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/5 ml-2"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
