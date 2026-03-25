"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CountdownTimer } from "@/components/countdown-timer";
import { cn, formatDate } from "@/lib/utils";
import {
  Trophy,
  Clock,
  Users,
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Mic,
  Swords,
  Eye,
  Timer,
  Vote,
  Gift,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  bannerUrl: string;
  deadline: string;
  prize: string;
  status: string;
  createdAt: string;
  _count: { submissions: number };
}

interface Submission {
  id: string;
  userName: string;
  fileUrl: string;
  description: string;
  createdAt: string;
}

const sprintSteps = [
  { time: "0:00", label: "Theme Reveal + Rules", icon: Sparkles, duration: "5 min" },
  { time: "0:05", label: "Live Demo Walkthrough (Haris)", icon: Mic, duration: "15 min" },
  { time: "0:20", label: "Community Creation Sprint", icon: Zap, duration: "30 min" },
  { time: "0:50", label: "Showcase + Winner Announcement", icon: Trophy, duration: "10 min" },
];

const battleSteps = [
  { num: "01", label: "Volunteers opt in for battle", icon: Users },
  { num: "02", label: "Two participants randomly selected", icon: Swords },
  { num: "03", label: "Reference scene revealed live", icon: Eye },
  { num: "04", label: "20 minutes to recreate using prompts & workflows", icon: Timer },
  { num: "05", label: "Final outputs posted anonymously", icon: ImageIcon },
  { num: "06", label: "Community votes via Discord poll", icon: Vote },
  { num: "07", label: "Winner announced live", icon: Trophy },
];

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    userName: "",
    email: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setForm((f) => ({
            ...f,
            userName: data.user.name || data.user.email.split("@")[0],
            email: data.user.email,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [cRes, sRes] = await Promise.all([
        fetch(`/api/challenges/${id}`),
        fetch(`/api/challenges/${id}/submissions`),
      ]);
      if (cRes.ok) setChallenge(await cRes.json());
      if (sRes.ok) setSubmissions(await sRes.json());
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      const subRes = await fetch(`/api/challenges/${id}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fileUrl: url }),
      });

      if (!subRes.ok) {
        const data = await subRes.json();
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
      setForm({ userName: "", email: "", description: "" });
      setFile(null);
      setPreview("");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <div className="h-2 bg-surface-brand" />
          <div className="mx-auto max-w-5xl px-4 py-12 space-y-4">
            <div className="h-8 w-64 skeleton" />
            <div className="h-12 w-full max-w-lg skeleton" />
            <div className="h-4 w-full skeleton" />
            <div className="h-4 w-3/4 skeleton" />
          </div>
        </main>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-heading-md mb-2">Challenge Not Found</h2>
            <Link href="/" className="btn btn-ghost btn-sm text-brand-text">
              Back to challenges
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const isActive = challenge.status === "active";
  const isSprint = challenge.theme === "Live Sprint";
  const isBattle = challenge.theme === "Prompt Battle";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Cinematic Hero Banner */}
        <section className="relative h-[300px] sm:h-[350px] bg-black overflow-hidden banner-shimmer noise-overlay">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={isBattle ? "/uploads/prompt-battles.mp4" : "/uploads/sprint.mp4"} type="video/mp4" />
          </video>

          {/* Dark overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/30 z-10" />

          {/* Particle dots */}
          <div className="absolute inset-0 z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[var(--primary-40)]/60"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  animation: `particle-float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Giant ghost typography */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 text-right select-none hidden md:block">
            <div className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] leading-none">
              {isBattle ? (
                <>Prompt<br />Battles</>
              ) : isSprint ? (
                <>Sprint<br />Battle</>
              ) : (
                <>Contest</>
              )}
            </div>
          </div>

          {/* Decorative icon */}
          <div className="absolute right-8 sm:right-16 bottom-6 z-10 hidden sm:block">
            {isBattle ? (
              <Swords className="w-20 h-20 lg:w-28 lg:h-28 text-[var(--primary-50)]/15" strokeWidth={1} />
            ) : (
              <Zap className="w-20 h-20 lg:w-28 lg:h-28 text-[var(--primary-50)]/15" strokeWidth={1} />
            )}
          </div>

          {/* Content */}
          <div className="relative z-20 h-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-body-sm text-white/50 hover:text-white mb-6 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to challenges
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {isActive ? (
                <span className="badge badge-success uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[var(--success-50)] rounded-full animate-pulse" />
                  {challenge.status}
                </span>
              ) : (
                <span className="badge badge-neutral uppercase tracking-wider">{challenge.status}</span>
              )}
              <span className="badge badge-brand uppercase tracking-wider">
                {isSprint ? "60 Min Sprint" : isBattle ? "Biweekly Battle" : challenge.theme}
              </span>
            </div>

            <h1 className="text-heading-lg sm:text-heading-xl lg:text-heading-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
              {isBattle && <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary-40)] flex-shrink-0" />}
              {isSprint && <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary-40)] flex-shrink-0" />}
              {challenge.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-body-sm">
              <div className="flex items-center gap-1.5 text-[var(--warning-50)] font-semibold">
                <Trophy className="w-4 h-4" />
                {challenge.prize}
              </div>
              <div className="flex items-center gap-1.5 text-white/50">
                <Users className="w-4 h-4" />
                {challenge._count.submissions} entries
              </div>
              <div className="flex items-center gap-1.5 text-white/50">
                <Clock className="w-4 h-4" />
                Deadline: {formatDate(challenge.deadline)}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 bg-background">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main column */}
            <div className="flex-1 min-w-0">
              {/* Countdown */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 mb-8 border-border-color"
                >
                  <p className="text-label-sm uppercase tracking-widest text-muted mb-4">
                    Time Remaining
                  </p>
                  <CountdownTimer deadline={challenge.deadline} />
                </motion.div>
              )}

              {/* Event Format Section */}
              {isSprint && (
                <div className="mb-8">
                  <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                    Event Format - 60 Minutes
                  </h3>
                  <div className="space-y-2">
                    {sprintSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card flex items-center gap-4 p-4 border-border-color hover:bg-surface-hover transition-colors rounded-lg"
                      >
                        <span className="text-label-xs font-mono font-bold text-muted w-10 flex-shrink-0">
                          {step.time}
                        </span>
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-[var(--primary-40)]">
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="text-body-sm font-semibold text-foreground">{step.label}</span>
                        </div>
                        <span className="text-label-xs font-mono text-muted flex-shrink-0">{step.duration}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {isBattle && (
                <div className="mb-8">
                  <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                    Battle Flow - 20-30 Minutes
                  </h3>

                  {/* VS graphic */}
                  <div className="card flex items-center justify-center gap-6 py-6 mb-4 border-border-color">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-border-brand bg-surface-brand flex items-center justify-center mb-2 mx-auto rounded-xl">
                        <span className="text-heading-xs font-black text-[var(--primary-40)]">P1</span>
                      </div>
                      <p className="text-body-xs text-muted">Challenger</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Swords className="w-8 h-8 text-[var(--primary-40)] mb-1" />
                      <span className="text-label-sm font-black uppercase tracking-widest text-[var(--primary-40)]">VS</span>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-border-brand bg-surface-brand flex items-center justify-center mb-2 mx-auto rounded-xl">
                        <span className="text-heading-xs font-black text-[var(--primary-40)]">P2</span>
                      </div>
                      <p className="text-body-xs text-muted">Challenger</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {battleSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="card flex items-center gap-4 p-3.5 border-border-color hover:bg-surface-hover transition-colors rounded-lg"
                      >
                        <span className="text-label-xs font-mono font-bold text-[var(--primary-40)] w-6 flex-shrink-0">
                          {step.num}
                        </span>
                        <step.icon className="w-4 h-4 text-muted flex-shrink-0" />
                        <span className="text-body-sm text-foreground">{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                  About This Challenge
                </h3>
                <div className="card prose-sm text-body-sm text-muted leading-relaxed whitespace-pre-wrap p-6 border-border-color">
                  {challenge.description}
                </div>
              </div>

              {/* What to submit */}
              <div className="mb-8">
                <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                  What to Submit
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: ImageIcon, label: "Final Output", desc: "Your finished creation" },
                    { icon: Sparkles, label: "Prompt Used", desc: "Share your prompt" },
                    { icon: Zap, label: "Workflow Steps", desc: "Optional but encouraged" },
                  ].map((item, i) => (
                    <div key={i} className="card p-4 text-center border-border-color">
                      <item.icon className="w-5 h-5 mx-auto mb-2 text-[var(--primary-40)]" />
                      <p className="text-label-sm font-bold mb-1 text-foreground">{item.label}</p>
                      <p className="text-body-xs text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {submissions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-text" />
                    Submissions ({submissions.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {submissions.map((sub, i) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative card overflow-hidden p-0 border-border-color"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={sub.fileUrl}
                            alt={sub.userName}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-body-sm font-semibold truncate">
                              {sub.userName}
                            </p>
                            {sub.description && (
                              <p className="text-white/70 text-body-xs truncate mt-0.5">
                                {sub.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0 space-y-4">
              {/* Prize card */}
              <div className="card border-border-brand overflow-hidden">
                <div
                  className="h-1 w-full rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, var(--primary-60), var(--primary-50))`,
                  }}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-5 h-5 text-brand-text" />
                    <span className="text-label-sm uppercase tracking-widest text-muted">Prize</span>
                  </div>
                  <p className="text-heading-lg font-black text-foreground">{challenge.prize}</p>
                </div>
              </div>

              {/* Submit CTA / Form toggle */}
              {isActive && !showForm && !submitted && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setShowForm(true)}
                  type="button"
                  className="btn btn-expressive btn-lg w-full"
                >
                  <Upload className="w-4 h-4" />
                  Submit Your Entry
                </motion.button>
              )}

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="card p-5 border-border-color bg-success-surface"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--success-50)] flex-shrink-0" />
                      <div>
                        <h3 className="text-label-md font-bold text-foreground">Submitted!</h3>
                        <p className="text-body-xs text-muted mt-0.5">
                          Your entry has been recorded. Good luck!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick info */}
              <div className="card divide-y divide-border-color overflow-hidden border-border-color p-0">
                {[
                  { label: "Format", value: isSprint ? "60 min sprint" : "20 min battle" },
                  { label: "Frequency", value: isSprint ? "Weekly" : "Biweekly" },
                  { label: "Platform", value: "Discord" },
                  { label: "Deadline", value: formatDate(challenge.deadline) },
                  { label: "Entries", value: String(challenge._count.submissions) },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-body-xs text-muted">{row.label}</span>
                    <span className="text-label-sm font-semibold text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Goals */}
              <div className="card p-5 border-border-color">
                <p className="text-label-sm uppercase tracking-widest text-muted mb-3">Objectives</p>
                <ul className="space-y-2">
                  {(isSprint
                    ? [
                        "Increase product adoption",
                        "Encourage experimentation",
                        "Drive Discord engagement",
                        "Generate community content",
                      ]
                    : [
                        "Boost Discord engagement",
                        "Improve prompting skills",
                        "Drive active product usage",
                        "Build competitive culture",
                      ]
                  ).map((goal, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-xs text-muted">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[var(--primary-40)]" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Submission Form (full width below) */}
          <AnimatePresence>
            {showForm && !submitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="card p-6 sm:p-8 border-border-color">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-heading-xs font-black flex items-center gap-2 text-foreground">
                      <Upload className="w-5 h-5 text-[var(--primary-40)]" />
                      Submit Your Entry
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-ghost btn-sm p-0 w-9 h-9"
                      aria-label="Close form"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-label-sm uppercase tracking-wider text-muted mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.userName}
                          onChange={(e) => setForm({ ...form, userName: e.target.value })}
                          className="input"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-label-sm uppercase tracking-wider text-muted mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-label-sm uppercase tracking-wider text-muted mb-2">
                        Prompt / Description
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        className="input resize-none min-h-[5rem]"
                        placeholder="Share the prompt you used and any workflow details..."
                      />
                    </div>

                    <div>
                      <label className="block text-label-sm uppercase tracking-wider text-muted mb-2">
                        Upload Creation *
                      </label>
                      <div
                        className={cn(
                          "relative border-2 border-dashed border-border-color p-8 rounded-xl bg-surface",
                          "hover:border-border-brand transition-colors cursor-pointer",
                          "flex flex-col items-center justify-center gap-3",
                          preview && "border-border-brand"
                        )}
                        onClick={() => document.getElementById("file-input")?.click()}
                      >
                        {preview ? (
                          <div className="relative w-full max-w-sm aspect-video">
                            <Image src={preview} alt="Preview" fill className="object-contain" />
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-muted" />
                            <p className="text-body-sm text-muted">Click to upload your creation</p>
                            <p className="text-body-xs text-tertiary">PNG, JPG, GIF, WEBP, MP4</p>
                          </>
                        )}
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-error text-body-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className={cn(
                        "btn btn-expressive btn-md w-full sm:w-auto",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {submitting ? "Submitting..." : "Submit Entry"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
