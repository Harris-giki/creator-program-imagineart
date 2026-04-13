"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CountdownTimer } from "@/components/countdown-timer";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Zap,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Swords,
  Timer,
  Play,
  Mic,
  Vote,
  Gift,
  Download,
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
  _count?: { submissions: number };
}

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/challenges")
      .then((r) => r.json())
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sprint = challenges.find((c) => c.theme === "Live Sprint");
  const battle = challenges.find((c) => c.theme === "Prompt Battle");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#000] min-h-[420px] sm:min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/uploads/background.png')" }}
          />
          {/* Dark gradients so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10" />

          <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              {/* "GenArena" in purple gradient */}
              <h1 className="mb-2">
                <span
                  className="block font-black leading-none tracking-tight bg-gradient-to-r from-[var(--primary-40)] via-[var(--primary-50)] to-[var(--primary-30)] bg-clip-text text-transparent"
                  style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
                >
                  GenArena
                </span>
                <span
                  className="block font-bold text-white leading-tight tracking-tight"
                  style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
                >
                  Create. Battle. Win.
                </span>
              </h1>

              <p className="text-body-md text-white/55 max-w-sm leading-relaxed mt-4 mb-8">
                High-energy AI creation sprints and prompt battles on Discord.
                Compete with the community, showcase your skills, win credits.
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { icon: Timer, label: "Weekly Events", color: "text-[var(--primary-40)]" },
                  { icon: Gift, label: "Free Credits", color: "text-[var(--warning-50)]" },
                  { icon: Users, label: "Community Driven", color: "text-[var(--success-50)]" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm"
                  >
                    <Icon className={cn("w-3.5 h-3.5", color)} />
                    <span className="text-body-sm text-white/65">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Events ── */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-heading-xl sm:text-heading-2xl font-bold tracking-tight mb-2">
              Events
            </h2>
            <p className="text-body-md text-muted max-w-sm mx-auto">
              Join our Discord, pick an event, and start creating with ImagineArt.
            </p>
          </motion.div>

          {loading ? (
            <div className="space-y-5">
              <div className="h-[280px] skeleton rounded-2xl" />
              <div className="h-[280px] skeleton rounded-2xl" />
            </div>
          ) : (
            <div className="space-y-5">
              {sprint && <SprintCard challenge={sprint} />}
              {battle && <BattleCard challenge={battle} />}
            </div>
          )}
        </section>

        {/* ── How it Works ── */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-heading-lg sm:text-heading-xl font-bold tracking-tight mb-2">
                How it Works
              </h2>
              <p className="text-body-md text-muted max-w-sm mx-auto">
                Join our Discord, pick an event, and start creating with ImagineArt.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Join the Event",
                  desc: "Hop into our Discord when the event goes live. Theme is revealed at the start.",
                  icon: Play,
                  media: { type: "image" as const, src: "/uploads/background.png" },
                },
                {
                  title: "Create & Submit",
                  desc: "Use ImagineArt workflows to build your entry. Submit your output, prompt, and steps.",
                  icon: Sparkles,
                  media: { type: "video" as const, src: "/uploads/sprint.mp4" },
                },
                {
                  title: "Win Credits",
                  desc: "Community votes or judges pick winners. Top creators earn free credits.",
                  icon: Download,
                  media: { type: "video" as const, src: "/uploads/prompt-battles.mp4" },
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="overflow-hidden rounded-xl group transition-all duration-200"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Media */}
                  <div className="relative h-44 overflow-hidden bg-[#000]">
                    {item.media.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "grayscale(1) brightness(0.55)" }}
                      >
                        <source src={item.media.src} type="video/mp4" />
                      </video>
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.media.src})`,
                          filter: "grayscale(1) brightness(0.45)",
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                  </div>

                  {/* Text */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-label-lg font-semibold">{item.title}</h3>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.06)" }}>
                        <item.icon className="w-3.5 h-3.5 text-muted" strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="text-body-sm text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Sprint Card ─── */
function SprintCard({ challenge }: { challenge: Challenge }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const formatSteps = [
    { time: "5 Min", label: "Theme Reveal", icon: Sparkles },
    { time: "15 Min", label: "Live Demo by Haris", icon: Mic },
    { time: "30 Min", label: "Creation Sprint", icon: Zap },
    { time: "18 Min", label: "Showcase + Winners", icon: Trophy },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* ── Top: horizontal split ── */}
          <div
            className="relative flex overflow-hidden"
            style={{ minHeight: "220px", background: "#0a0a0a" }}
          >
            {/* LEFT content */}
            <div className="relative z-20 flex-1 p-6 sm:p-8 flex flex-col justify-between min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="badge"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "11px",
                  }}
                >
                  Live Sprint
                </span>
                <span className="badge badge-success" style={{ fontSize: "11px" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#42be65" }} />
                  Active
                </span>
              </div>

              {/* Logo + Title + Description + Stats */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/uploads/Logomarks.png"
                    alt=""
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] object-contain opacity-75 flex-shrink-0"
                  />
                  <h2
                    className="text-white font-bold tracking-tight truncate"
                    style={{ fontSize: "clamp(18px, 2.5vw, 26px)", lineHeight: 1.25 }}
                  >
                    {challenge.title}
                  </h2>
                  <Zap className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary-40)" }} />
                </div>

                <p
                  className="text-body-xs leading-relaxed mb-3"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {challenge.description ||
                    "High-energy, theme-based, 1-hour live creation session on Discord. Build with ImagineArt workflows, compete, and win credits."}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  {challenge.prize && (
                    <span className="flex items-center gap-1.5 text-body-xs font-medium" style={{ color: "var(--warning-50)" }}>
                      <Trophy className="w-3.5 h-3.5" />
                      {challenge.prize}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-body-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <Clock className="w-3.5 h-3.5" />
                    <CountdownTimer deadline={challenge.deadline} compact />
                  </span>
                  <span className="flex items-center gap-1.5 text-body-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <Users className="w-3.5 h-3.5" />
                    {challenge._count?.submissions ?? 0} joined
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT video */}
            <div className="hidden md:block flex-shrink-0 relative overflow-hidden" style={{ width: "38%" }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/uploads/sprint.mp4" type="video/mp4" />
              </video>
              {/* Fade from left */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.6) 40%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* ── Bottom: steps + button ── */}
          <div
            className="px-5 py-4"
            style={{
              background: "#111111",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 flex flex-wrap gap-2">
                {formatSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-body-xs"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <step.icon
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                    <span className="font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                      {step.time}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.38)" }}>{step.label}</span>
                  </div>
                ))}
              </div>

              <div
                className="btn btn-md flex-shrink-0 gap-1.5 font-semibold group-hover:brightness-110 transition-all"
                style={{ background: "#42be65", color: "#fff" }}
              >
                Join Sprint
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Battle Card ─── */
function BattleCard({ challenge }: { challenge: Challenge }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const battleSteps = [
    { icon: Users, label: "Volunteers opt in" },
    { icon: Swords, label: "2 randomly selected" },
    { icon: Vote, label: "Reference scene revealed" },
    { icon: Timer, label: "20 min to recreate" },
    { icon: Vote, label: "Community votes" },
    { icon: Trophy, label: "Winner announced" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* ── Top: horizontal split ── */}
          <div
            className="relative flex overflow-hidden"
            style={{ minHeight: "220px", background: "#0a0a0a" }}
          >
            {/* LEFT content */}
            <div className="relative z-20 flex-1 p-6 sm:p-8 flex flex-col justify-between min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="badge"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "11px",
                  }}
                >
                  Prompt Battle
                </span>
                <span className="badge badge-success" style={{ fontSize: "11px" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#42be65" }} />
                  Active
                </span>
              </div>

              {/* Logo + Title + Description + Stats */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/uploads/Logomarks.png"
                    alt=""
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] object-contain opacity-75 flex-shrink-0"
                  />
                  <h2
                    className="text-white font-bold tracking-tight truncate"
                    style={{ fontSize: "clamp(18px, 2.5vw, 26px)", lineHeight: 1.25 }}
                  >
                    {challenge.title}
                  </h2>
                  <Swords className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary-40)" }} />
                </div>

                <p
                  className="text-body-xs leading-relaxed mb-3"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {challenge.description ||
                    "1v1 prompt battles live on Discord. Two creators compete to recreate a reference scene using ImagineArt — community votes for the winner."}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  {challenge.prize && (
                    <span className="flex items-center gap-1.5 text-body-xs font-medium" style={{ color: "var(--warning-50)" }}>
                      <Trophy className="w-3.5 h-3.5" />
                      {challenge.prize}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-body-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <Clock className="w-3.5 h-3.5" />
                    <CountdownTimer deadline={challenge.deadline} compact />
                  </span>
                  <span className="flex items-center gap-1.5 text-body-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <Users className="w-3.5 h-3.5" />
                    {challenge._count?.submissions ?? 0} joined
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT video */}
            <div className="hidden md:block flex-shrink-0 relative overflow-hidden" style={{ width: "38%" }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/uploads/prompt-battles.mp4" type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.6) 40%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* ── Bottom: steps + button ── */}
          <div
            className="px-5 py-4"
            style={{
              background: "#111111",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {battleSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-body-xs"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="font-mono font-bold text-body-xs flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.5)", minWidth: "18px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <step.icon
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    />
                    <span className="truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="btn btn-md flex-shrink-0 gap-1.5 font-semibold group-hover:brightness-110 transition-all"
                style={{ background: "#42be65", color: "#fff" }}
              >
                Join Sprint
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
