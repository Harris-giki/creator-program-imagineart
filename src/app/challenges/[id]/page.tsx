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
  { time: "0:05", label: "Live Demo Walkthrough", icon: Mic, duration: "15 min" },
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-16">
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Banner ── */}
        <section className="relative overflow-hidden bg-black min-h-[420px] sm:min-h-[500px]">
          {/* Video background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source
              src={isBattle ? "/uploads/prompt-battles.mp4" : "/uploads/sprint.mp4"}
              type="video/mp4"
            />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 z-10 hero-vignette-left" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

          <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 flex flex-col justify-end min-h-[420px] sm:min-h-[500px]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-body-sm text-white/55 hover:text-white mb-6 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to challenges
            </Link>

            {/* Brand badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {isActive ? (
                <span className="badge badge-success uppercase tracking-wider text-label-xs">
                  <span className="w-1.5 h-1.5 bg-[var(--success-50)] rounded-full animate-pulse" />
                  {challenge.status}
                </span>
              ) : (
                <span className="badge badge-neutral uppercase tracking-wider text-label-xs">
                  {challenge.status}
                </span>
              )}
              <span className="pill-brand">
                {isSprint ? (
                  <>
                    <Zap className="w-3.5 h-3.5" /> 60 Min Sprint
                  </>
                ) : isBattle ? (
                  <>
                    <Swords className="w-3.5 h-3.5" /> Biweekly Battle
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> {challenge.theme}
                  </>
                )}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-white font-medium tracking-tight mb-5 max-w-4xl"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.05 }}
            >
              {challenge.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-body-sm">
              {challenge.prize && (
                <div className="flex items-center gap-1.5 text-[var(--warning-50)] font-semibold">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-white/60">
                <Users className="w-4 h-4" />
                {challenge._count.submissions} entries
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <Clock className="w-4 h-4" />
                Deadline: {formatDate(challenge.deadline)}
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="pattern-bg border-t border-border-color">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main column */}
              <div className="flex-1 min-w-0">
                {/* Countdown */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="project-card p-6 mb-8"
                  >
                    <p className="text-label-sm uppercase tracking-widest text-muted mb-4">
                      Time Remaining
                    </p>
                    <CountdownTimer deadline={challenge.deadline} />
                  </motion.div>
                )}

                {/* Sprint format */}
                {isSprint && (
                  <div className="mb-8">
                    <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                      Event Format — 60 Minutes
                    </h3>
                    <div className="space-y-2">
                      {sprintSteps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="project-card flex items-center gap-4 p-4"
                        >
                          <span className="text-label-xs font-mono font-bold text-muted w-10 flex-shrink-0">
                            {step.time}
                          </span>
                          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg bg-surface-brand text-brand-text">
                            <step.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="text-body-sm font-semibold text-foreground">
                              {step.label}
                            </span>
                          </div>
                          <span className="text-label-xs font-mono text-muted flex-shrink-0">
                            {step.duration}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Battle format */}
                {isBattle && (
                  <div className="mb-8">
                    <h3 className="text-label-sm uppercase tracking-widest text-muted mb-4">
                      Battle Flow — 20-30 Minutes
                    </h3>

                    {/* VS graphic */}
                    <div className="project-card flex items-center justify-center gap-8 py-8 mb-4">
                      <div className="text-center">
                        <div className="w-16 h-16 border-2 border-border-brand bg-surface-brand flex items-center justify-center mb-2 mx-auto rounded-2xl">
                          <span className="text-heading-xs font-bold text-brand-text">
                            P1
                          </span>
                        </div>
                        <p className="text-body-xs text-muted">Challenger</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Swords className="w-9 h-9 text-brand-text mb-1" />
                        <span className="text-label-sm font-bold uppercase tracking-widest text-brand-text">
                          VS
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 border-2 border-border-brand bg-surface-brand flex items-center justify-center mb-2 mx-auto rounded-2xl">
                          <span className="text-heading-xs font-bold text-brand-text">
                            P2
                          </span>
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
                          className="project-card flex items-center gap-4 p-3.5"
                        >
                          <span className="text-label-xs font-mono font-bold text-brand-text w-6 flex-shrink-0">
                            {step.num}
                          </span>
                          <step.icon className="w-4 h-4 text-muted flex-shrink-0" />
                          <span className="text-body-sm text-foreground">
                            {step.label}
                          </span>
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
                  <div className="project-card p-6 text-body-sm text-muted leading-relaxed whitespace-pre-wrap">
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
                      <div key={i} className="project-card p-5 text-center">
                        <item.icon className="w-5 h-5 mx-auto mb-2 text-brand-text" />
                        <p className="text-label-sm font-semibold mb-1 text-foreground">
                          {item.label}
                        </p>
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
                          className="group relative project-card overflow-hidden"
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={sub.fileUrl}
                              alt={sub.userName}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <div className="project-card overflow-hidden">
                  <div
                    className="h-1 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #AE80F1 0%, #FFFFFF 100%)",
                    }}
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-5 h-5 text-brand-text" />
                      <span className="text-label-sm uppercase tracking-widest text-muted">
                        Prize
                      </span>
                    </div>
                    <p className="text-heading-lg font-bold text-foreground">
                      {challenge.prize}
                    </p>
                  </div>
                </div>

                {/* Submit CTA */}
                {isActive && !showForm && !submitted && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setShowForm(true)}
                    type="button"
                    className="btn btn-tonel btn-lg w-full"
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
                      className="project-card p-5 bg-success-surface"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[var(--success-50)] flex-shrink-0" />
                        <div>
                          <h3 className="text-label-md font-semibold text-foreground">
                            Submitted!
                          </h3>
                          <p className="text-body-xs text-muted mt-0.5">
                            Your entry has been recorded. Good luck!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick info */}
                <div className="project-card overflow-hidden">
                  {[
                    { label: "Format", value: isSprint ? "60 min sprint" : "20 min battle" },
                    { label: "Frequency", value: isSprint ? "Weekly" : "Biweekly" },
                    { label: "Platform", value: "Discord" },
                    { label: "Deadline", value: formatDate(challenge.deadline) },
                    { label: "Entries", value: String(challenge._count.submissions) },
                  ].map((row, i, arr) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between px-5 py-3",
                        i < arr.length - 1 && "border-b border-border-color"
                      )}
                    >
                      <span className="text-body-xs text-muted">{row.label}</span>
                      <span className="text-label-sm font-semibold text-foreground">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Objectives */}
                <div className="project-card p-5">
                  <p className="text-label-sm uppercase tracking-widest text-muted mb-3">
                    Objectives
                  </p>
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
                      <li
                        key={i}
                        className="flex items-start gap-2 text-body-xs text-muted"
                      >
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-brand-text" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Submission form ── */}
            <AnimatePresence>
              {showForm && !submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="project-card p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-heading-xs font-semibold flex items-center gap-2 text-foreground">
                        <Upload className="w-5 h-5 text-brand-text" />
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
                            onChange={(e) =>
                              setForm({ ...form, userName: e.target.value })
                            }
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
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
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
                          onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                          }
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
                            "relative border-2 border-dashed border-border-color p-8 rounded-2xl bg-surface",
                            "hover:border-border-brand transition-colors cursor-pointer",
                            "flex flex-col items-center justify-center gap-3",
                            preview && "border-border-brand"
                          )}
                          onClick={() =>
                            document.getElementById("file-input")?.click()
                          }
                        >
                          {preview ? (
                            <div className="relative w-full max-w-sm aspect-video">
                              <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 text-muted" />
                              <p className="text-body-sm text-muted">
                                Click to upload your creation
                              </p>
                              <p className="text-body-xs text-tertiary">
                                PNG, JPG, GIF, WEBP, MP4
                              </p>
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
                          "btn btn-tonel btn-md w-full sm:w-auto",
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
