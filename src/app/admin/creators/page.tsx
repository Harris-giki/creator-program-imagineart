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
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-brand-text mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <Users className="w-6 h-6 text-brand-text" />
            <h1 className="text-heading-lg tracking-tight">
              Creator Program
            </h1>
          </div>

          <p className="text-body-sm text-muted mb-6">
            Add emails of creators who joined via the Google Form. These users can then log in and set up their password.
          </p>

          {/* Add form */}
          <form onSubmit={handleAdd} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="input pl-10"
                />
              </div>
              <button
                type="submit"
                disabled={adding || !newEmail.trim()}
                className="btn btn-expressive btn-md shrink-0 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Creator
              </button>
            </div>
            {error && (
              <p className="mt-2 text-body-sm text-error">{error}</p>
            )}
          </form>

          {/* List */}
          <div className="card overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-body-sm text-muted">Loading...</div>
            ) : creators.length === 0 ? (
              <div className="p-8 text-center text-body-sm text-muted">
                No approved creators yet. Add emails from your Google Form responses.
              </div>
            ) : (
              <div className="divide-y divide-border-color">
                {creators.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors"
                  >
                    <span className="text-body-sm truncate">{c.email}</span>
                    <span className="text-body-xs text-muted flex-shrink-0 ml-2">
                      {new Date(c.addedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleRemove(c.id)}
                      className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-error ml-2"
                      title="Remove"
                      type="button"
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
