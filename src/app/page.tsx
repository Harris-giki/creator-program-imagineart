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
  Eye,
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
        <section className="relative overflow-hidden bg-black min-h-[420px] sm:min-h-[480px]">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/uploads/background.png')" }}
          />

          {/* Left-heavy gradient so text on the left stays readable */}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live Discord Events
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  GenArena
                </span>
                <br />
                <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Create. Battle. Win.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/65 max-w-md leading-relaxed mb-10">
                High-energy AI creation sprints and prompt battles on Discord.
                Compete with the community, showcase your skills, win credits.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm">
                  <Timer className="w-4 h-4 text-violet-400" />
                  <span className="text-white/70">Weekly Events</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span className="text-white/70">Free Credits</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/70">Community Driven</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenges */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {loading ? (
            <div className="space-y-8">
              <div className="h-[420px] bg-surface rounded-2xl border border-border-color animate-pulse" />
              <div className="h-[420px] bg-surface rounded-2xl border border-border-color animate-pulse" />
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
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                How It Works
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto">
                Join our Discord, pick an event, and start creating with
                ImagineArt.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Join the Event",
                  desc: "Hop into our Discord when the event goes live. Theme is revealed at the start.",
                  icon: Play,
                  color: "text-violet-400",
                },
                {
                  step: "02",
                  title: "Create & Submit",
                  desc: "Use ImagineArt workflows to build your entry. Submit your output, prompt, and steps.",
                  icon: Sparkles,
                  color: "text-fuchsia-400",
                },
                {
                  step: "03",
                  title: "Win Credits",
                  desc: "Community votes or judges pick winners. Top creators earn free credits.",
                  icon: Trophy,
                  color: "text-amber-400",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative rounded-2xl border border-border-color bg-surface p-6 group hover:border-primary/20 transition-colors"
                >
                  <span className="text-5xl font-black text-border-color absolute top-4 right-5 select-none">
                    {item.step}
                  </span>
                  <div className={cn("mb-4", item.color)}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
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
          <div className="relative h-[280px] sm:h-[320px] bg-black overflow-hidden">
            {/* Background video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/uploads/sprint.mp4" type="video/mp4" />
            </video>

            {/* Dark overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Giant typography on right */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 text-right select-none hidden md:block">
              <div className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] leading-none">
                Sprint
                <br />
                Battle
              </div>
            </div>

            {/* Zap icon large decorative */}
            <div className="absolute right-8 sm:right-16 bottom-6 z-10 hidden sm:block">
              <Zap className="w-20 h-20 lg:w-28 lg:h-28 text-violet-500/20" strokeWidth={1} />
            </div>

            {/* Content overlay */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Active
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 text-xs font-semibold backdrop-blur-sm">
                  60 Min Sprint
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0} joined
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400 flex-shrink-0" />
                {challenge.title}
              </h2>

              <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-4">
                High-energy, theme-based, 1-hour live creation session on Discord.
                Build with ImagineArt workflows, compete, and win credits.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
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
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
                  Event Format
                </p>
                <div className="flex flex-wrap gap-2">
                  {formatSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border-color text-xs"
                    >
                      <step.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="font-mono font-bold text-primary">
                        {step.time}
                      </span>
                      <span className="text-muted">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl flex-shrink-0",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "text-white text-sm font-bold",
                  "group-hover:from-violet-500 group-hover:to-purple-500",
                  "transition-all duration-300"
                )}
              >
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
    { icon: Eye, label: "Reference scene revealed" },
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
          {/* Cinematic Banner */}
          <div className="relative h-[280px] sm:h-[320px] bg-black overflow-hidden">
            {/* Background video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/uploads/prompt-battles.mp4" type="video/mp4" />
            </video>

            {/* Dark overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Giant typography on right */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 text-right select-none hidden md:block">
              <div className="text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/[0.04] leading-none">
                Prompt
                <br />
                Battles
              </div>
            </div>

            {/* VS emblem decorative */}
            <div className="absolute right-8 sm:right-16 bottom-8 z-10 hidden sm:flex items-center gap-5">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-black text-white/30">P1</span>
              </div>
              <div className="flex flex-col items-center">
                <Swords className="w-6 h-6 text-fuchsia-400/40" />
                <span className="text-xs font-black text-fuchsia-400/40 mt-0.5">VS</span>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-black text-white/30">P2</span>
              </div>
            </div>

            {/* Content overlay */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Active
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 text-xs font-semibold backdrop-blur-sm">
                  Biweekly Battle
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0} joined
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-fuchsia-400 flex-shrink-0" />
                {challenge.title}
              </h2>

              <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-4">
                Fast-paced competitive live session where two randomly selected volunteers
                compete to recreate the same scene. Community votes to crown the winner.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
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
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
                  Battle Flow
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {battleSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-background border border-border-color text-xs"
                    >
                      <span className="text-[10px] font-bold text-fuchsia-400 font-mono w-4 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <step.icon className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                      <span className="text-muted truncate">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl flex-shrink-0",
                  "bg-gradient-to-r from-fuchsia-600 to-rose-600",
                  "text-white text-sm font-bold",
                  "group-hover:from-fuchsia-500 group-hover:to-rose-500",
                  "transition-all duration-300"
                )}
              >
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
