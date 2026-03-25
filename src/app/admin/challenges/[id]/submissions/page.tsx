"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Users,
  Mail,
  Calendar,
  Download,
  Eye,
  X,
  FileText,
} from "lucide-react";

interface Submission {
  id: string;
  userName: string;
  email: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

interface Challenge {
  id: string;
  title: string;
  status: string;
}

export default function SubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
          return;
        }

        Promise.all([
          fetch(`/api/challenges/${id}`).then((r) => r.json()),
          fetch(`/api/challenges/${id}/submissions`).then((r) => r.json()),
        ]).then(([c, s]) => {
          setChallenge(c);
          setSubmissions(s);
          setLoading(false);
        });
      });
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton h-20 border border-border-secondary rounded-xl"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-brand-text mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-brand-text" />
                <h1 className="text-heading-lg tracking-tight">
                  Submissions
                </h1>
              </div>
              {challenge && (
                <p className="text-body-sm text-muted">
                  for &ldquo;{challenge.title}&rdquo; &middot;{" "}
                  {submissions.length} entries
                </p>
              )}
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-20 card border-dashed border-border-color rounded-2xl">
              <FileText className="w-10 h-10 text-muted mx-auto mb-4" />
              <h3 className="text-heading-xs mb-2">
                No submissions yet
              </h3>
              <p className="text-body-sm text-muted">
                Submissions will appear here once participants start entering.
              </p>
            </div>
          ) : (
            <>
              {/* Table view */}
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border-color">
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Preview
                        </th>
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Name
                        </th>
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Email
                        </th>
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Description
                        </th>
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Date
                        </th>
                        <th className="text-left text-label-xs uppercase tracking-wider text-muted px-4 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub, i) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-border-color last:border-0 hover:bg-surface-hover transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="relative w-14 h-14 overflow-hidden rounded-lg">
                              <Image
                                src={sub.fileUrl}
                                alt={sub.userName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-label-sm text-brand-text">
                              {sub.userName}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`mailto:${sub.email}`}
                              className="text-body-sm text-brand-text hover:underline flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              {sub.email}
                            </a>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-body-sm text-muted truncate max-w-[200px]">
                              {sub.description || "-"}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-body-sm text-muted flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(sub.createdAt)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setSelected(sub)}
                                className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-brand-text"
                                title="View"
                                type="button"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a
                                href={sub.fileUrl}
                                download
                                className="btn btn-ghost btn-sm p-0 w-9 h-9 text-muted hover:text-brand-text"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lightbox */}
              {selected && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                  onClick={() => setSelected(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative max-w-3xl w-full card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-3 right-3 z-10 btn btn-ghost btn-sm p-0 w-9 h-9 bg-black/50 hover:bg-black/70 text-white border-0 hover:text-white"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative aspect-video">
                      <Image
                        src={selected.fileUrl}
                        alt={selected.userName}
                        fill
                        className="object-contain bg-black"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-heading-xs">{selected.userName}</h3>
                      <p className="text-body-sm text-brand-text">{selected.email}</p>
                      {selected.description && (
                        <p className="text-body-sm text-muted mt-2">
                          {selected.description}
                        </p>
                      )}
                      <p className="text-body-xs text-muted mt-2">
                        Submitted {formatDate(selected.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
