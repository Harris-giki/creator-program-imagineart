"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
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
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--neutral-black)] min-h-[420px] sm:min-h-[480px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/uploads/background.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />

          <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-14 flex">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-left max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="badge badge-success mb-8"
              >
                <span className="w-1.5 h-1.5 bg-[var(--success-50)] rounded-full animate-pulse" />
                Live Discord Events
              </motion.div>

              <h1 className="text-display-xs sm:text-display-sm lg:text-display-md mb-6">
                <span className="bg-gradient-to-r from-[var(--primary-40)] via-[var(--primary-50)] to-[var(--primary-30)] bg-clip-text text-transparent">
                  GenArena
                </span>
                <br />
                <span className="text-white text-heading-lg sm:text-heading-xl lg:text-heading-2xl">
                  Create. Battle. Win.
                </span>
              </h1>

              <p className="text-body-md sm:text-body-lg text-white/60 max-w-md leading-relaxed mb-10">
                High-energy AI creation sprints and prompt battles on Discord.
                Compete with the community, showcase your skills, win credits.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: Timer, label: "Weekly Events", color: "text-[var(--primary-40)]" },
                  { icon: Gift, label: "Free Credits", color: "text-[var(--warning-50)]" },
                  { icon: Users, label: "Community Driven", color: "text-[var(--success-50)]" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm"
                  >
                    <Icon className={cn("w-4 h-4", color)} />
                    <span className="text-body-sm text-white/70">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenges */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {loading ? (
            <div className="space-y-8">
              <div className="h-[420px] skeleton rounded-2xl" />
              <div className="h-[420px] skeleton rounded-2xl" />
            </div>
          ) : (
            <div className="space-y-8">
              {sprint && <SprintCard challenge={sprint} />}
              {battle && <BattleCard challenge={battle} />}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="border-t border-border-color">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-heading-lg sm:text-heading-xl tracking-tight mb-3">
                How It Works
              </h2>
              <p className="text-body-md text-muted max-w-md mx-auto">
                Join our Discord, pick an event, and start creating with
                ImagineArt.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Join the Event",
                  desc: "Hop into our Discord when the event goes live. Theme is revealed at the start.",
                  icon: Play,
                  color: "text-[var(--primary-50)]",
                },
                {
                  step: "02",
                  title: "Create & Submit",
                  desc: "Use ImagineArt workflows to build your entry. Submit your output, prompt, and steps.",
                  icon: Sparkles,
                  color: "text-[var(--primary-40)]",
                },
                {
                  step: "03",
                  title: "Win Credits",
                  desc: "Community votes or judges pick winners. Top creators earn free credits.",
                  icon: Trophy,
                  color: "text-[var(--warning-50)]",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="card relative p-6 group hover:border-border-brand transition-colors"
                >
                  <span className="text-display-xs font-bold text-border-color absolute top-4 right-5 select-none opacity-60">
                    {item.step}
                  </span>
                  <div className={cn("mb-4", item.color)}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-label-lg mb-2">{item.title}</h3>
                  <p className="text-body-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
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

/* ─── GenArena Sprint Featured Card ─── */
function SprintCard({ challenge }: { challenge: Challenge }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const formatSteps = [
    { time: "5 min", label: "Theme Reveal", icon: Sparkles },
    { time: "15 min", label: "Live Demo by Haris", icon: Mic },
    { time: "30 min", label: "Creation Sprint", icon: Zap },
    { time: "10 min", label: "Showcase + Winners", icon: Trophy },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Cinematic Banner */}
          <div className="relative h-[280px] sm:h-[320px] bg-[var(--neutral-black)] overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/uploads/sprint.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />

            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 text-right select-none hidden md:block">
              <div className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] leading-none">
                Sprint<br />Battle
              </div>
            </div>

            <div className="absolute right-8 sm:right-16 bottom-6 z-10 hidden sm:block">
              <Zap className="w-20 h-20 lg:w-28 lg:h-28 text-[var(--primary-50)]/20" strokeWidth={1} />
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge badge-success">
                  <span className="w-1.5 h-1.5 bg-[var(--success-50)] rounded-full animate-pulse" />
                  Active
                </span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  60 Min Sprint
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-body-xs">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0} joined
                </span>
              </div>

              <h2 className="text-heading-lg sm:text-heading-xl lg:text-heading-2xl text-white tracking-tight mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary-40)] flex-shrink-0" />
                {challenge.title}
              </h2>

              <p className="text-body-sm text-white/60 leading-relaxed max-w-xl mb-4">
                High-energy, theme-based, 1-hour live creation session on Discord.
                Build with ImagineArt workflows, compete, and win credits.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-[var(--warning-50)] text-body-sm font-semibold">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-body-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <CountdownTimer deadline={challenge.deadline} compact />
                </div>
              </div>
            </div>
          </div>

          {/* Content below banner */}
          <div className="border border-t-0 border-border-color bg-surface rounded-b-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <p className="text-label-xs uppercase tracking-widest text-muted mb-3">
                  Event Format
                </p>
                <div className="flex flex-wrap gap-2">
                  {formatSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-hover border border-border-secondary text-body-xs"
                    >
                      <step.icon className="w-3.5 h-3.5 text-brand-text flex-shrink-0" />
                      <span className="font-mono font-bold text-brand-text">
                        {step.time}
                      </span>
                      <span className="text-muted">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="btn btn-expressive btn-lg flex-shrink-0 group-hover:shadow-xl">
                Join Sprint
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Prompt Battle Featured Card ─── */
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
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[280px] sm:h-[320px] bg-[var(--neutral-black)] overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/uploads/prompt-battles.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />

            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 text-right select-none hidden md:block">
              <div className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] leading-none">
                Prompt<br />Battles
              </div>
            </div>

            <div className="absolute right-8 sm:right-16 bottom-8 z-10 hidden sm:flex items-center gap-5">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-black text-white/30">P1</span>
              </div>
              <div className="flex flex-col items-center">
                <Swords className="w-6 h-6 text-[var(--primary-40)]/40" />
                <span className="text-body-xs font-black text-[var(--primary-40)]/40 mt-0.5">VS</span>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-black text-white/30">P2</span>
              </div>
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge badge-success">
                  <span className="w-1.5 h-1.5 bg-[var(--success-50)] rounded-full animate-pulse" />
                  Active
                </span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Biweekly Battle
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-body-xs">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0} joined
                </span>
              </div>

              <h2 className="text-heading-lg sm:text-heading-xl lg:text-heading-2xl text-white tracking-tight mb-2 flex items-center gap-3">
                <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary-40)] flex-shrink-0" />
                {challenge.title}
              </h2>

              <p className="text-body-sm text-white/60 leading-relaxed max-w-xl mb-4">
                Fast-paced competitive live session where two randomly selected volunteers
                compete to recreate the same scene. Community votes to crown the winner.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-[var(--warning-50)] text-body-sm font-semibold">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-body-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <CountdownTimer deadline={challenge.deadline} compact />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-t-0 border-border-color bg-surface rounded-b-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <p className="text-label-xs uppercase tracking-widest text-muted mb-3">
                  Battle Flow
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {battleSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-hover border border-border-secondary text-body-xs"
                    >
                      <span className="text-label-xs font-bold text-brand-text font-mono w-4 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <step.icon className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                      <span className="text-muted truncate">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="btn btn-expressive btn-lg flex-shrink-0 group-hover:shadow-xl">
                Enter Battle
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
