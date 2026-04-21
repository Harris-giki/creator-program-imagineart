"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CountdownTimer } from "@/components/countdown-timer";
import { ChallengeCard } from "@/components/challenge-card";
import {
  Timer,
  Gift,
  Users,
  Trophy,
  Clock,
  Zap,
  Swords,
  ArrowRight,
  Play,
  Sparkles,
  Mic,
  Vote,
  Eye,
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
  const others = challenges.filter(
    (c) => c.id !== sprint?.id && c.id !== battle?.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ── HERO ── */}
        <Hero />

        {/* ── FEATURED EVENTS ── */}
        <section
          id="events"
          className="pattern-bg border-t border-border-color scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-12"
            >
              <span className="pill-brand mb-5">
                <Trophy className="w-3.5 h-3.5" /> Live Events
              </span>
              <h2 className="text-heading-xl sm:text-heading-2xl font-bold tracking-tight mb-3">
                This week&apos;s arena
              </h2>
              <p className="text-body-md text-muted max-w-md">
                Two formats. One community. Jump into Discord, pick an event,
                and start creating with ImagineArt.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex flex-col gap-6">
                <div className="h-[420px] skeleton rounded-[26px]" />
                <div className="h-[420px] skeleton rounded-[26px]" />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {sprint && <SprintCard challenge={sprint} />}
                {battle && <BattleCard challenge={battle} />}
              </div>
            )}
          </div>
        </section>

        {/* ── HOW IT WORKS (project cards row) ── */}
        <section className="pattern-bg border-t border-border-color">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="pill-brand mb-5 inline-flex">
                <Sparkles className="w-3.5 h-3.5" /> How it works
              </span>
              <h2 className="text-heading-xl sm:text-heading-2xl font-bold tracking-tight mb-2">
                Create. Battle. Win.
              </h2>
              <p className="text-body-md text-muted max-w-md mx-auto">
                Three steps from idea to credits on your account.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Join the arena",
                  desc: "Hop into our Discord when an event goes live. Themes are revealed at the start — no prep, pure creative reflex.",
                  icon: Play,
                },
                {
                  step: "02",
                  title: "Create & submit",
                  desc: "Use ImagineArt workflows to build your entry. Submit your output, prompt, and process within the window.",
                  icon: Sparkles,
                },
                {
                  step: "03",
                  title: "Win credits",
                  desc: "Community votes or judges pick winners. Top creators walk away with free credits, loud shoutouts, and leaderboard glory.",
                  icon: Trophy,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="project-card p-7"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-label-sm font-mono text-muted">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-brand flex items-center justify-center">
                      <item.icon
                        className="w-4 h-4 text-brand-text"
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                  <h3 className="text-heading-xs font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MORE CHALLENGES ── */}
        {others.length > 0 && (
          <section className="pattern-bg border-t border-border-color">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-heading-xl font-bold tracking-tight mb-1">
                  More challenges
                </h2>
                <p className="text-body-md text-muted">
                  Past and upcoming events from the GenArena community.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((c, i) => (
                  <ChallengeCard key={c.id} challenge={c} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ───────────────── HERO ───────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/uploads/genarena-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* Left-side dark vignette (per Figma gradient stops) */}
      <div className="absolute inset-0 z-10 hero-vignette-left" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-24 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {/* GenArena — massive gradient wordmark */}
          <h1
            className="text-genarena font-medium mb-2"
            style={{ fontSize: "clamp(64px, 10vw, 128px)" }}
          >
            GenArena
          </h1>

          {/* Create. Battle. Win. */}
          <p
            className="font-medium text-white tracking-tight mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.05,
            }}
          >
            Create. Battle. Win.
          </p>

          {/* Description */}
          <p
            className="text-white/85 max-w-xl"
            style={{ fontSize: "clamp(16px, 1.4vw, 22px)", lineHeight: 1.45 }}
          >
            High-energy AI creation sprints and prompt battles on Discord.
            Compete with the community, showcase your skills, win credits.
          </p>

          {/* Purple brand pills */}
          <div className="flex flex-wrap items-center gap-2 mt-7">
            <span className="pill-brand">
              <Timer className="w-3.5 h-3.5" /> Weekly Events
            </span>
            <span className="pill-brand">
              <Gift className="w-3.5 h-3.5" /> Free Credits
            </span>
            <span className="pill-brand">
              <Users className="w-3.5 h-3.5" /> Community Driven
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link href="#events" className="btn btn-tonel btn-lg">
              Join the next event
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── SPRINT CARD ───────────────── */
function SprintCard({ challenge }: { challenge: Challenge }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [
    { time: "5 Min", label: "Theme Reveal", icon: Sparkles },
    { time: "15 Min", label: "Live Demo by Haris", icon: Mic },
    { time: "30 Min", label: "Creation Sprint", icon: Zap },
    { time: "10 Min", label: "Winners", icon: Trophy },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <WideChallengeCard
          videoSrc="/uploads/sprint.mp4"
          typePill={
            <>
              <Zap className="w-3 h-3" /> 60 Min Sprint
            </>
          }
          status={challenge.status}
          joinedCount={challenge._count?.submissions ?? 0}
          title={challenge.title}
          description={
            challenge.description ||
            "High-energy, theme-based 60-minute live creation session on Discord. Build with ImagineArt workflows, compete, and win credits."
          }
          prize={challenge.prize}
          deadline={challenge.deadline}
          formatChips={steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-primary border border-border-color text-body-xs"
            >
              <s.icon className="w-3 h-3 text-muted" />
              <span className="font-semibold text-foreground">{s.time}</span>
              <span className="text-muted">{s.label}</span>
            </div>
          ))}
          ctaLabel="Join Sprint"
        />
      </Link>
    </motion.div>
  );
}

/* ───────────────── BATTLE CARD ───────────────── */
function BattleCard({ challenge }: { challenge: Challenge }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [
    { icon: Users, label: "Volunteers opt in" },
    { icon: Swords, label: "2 selected randomly" },
    { icon: Eye, label: "Reference revealed" },
    { icon: Timer, label: "20 min to recreate" },
    { icon: Vote, label: "Community votes" },
    { icon: Trophy, label: "Winner crowned" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <WideChallengeCard
          videoSrc="/uploads/prompt-battles.mp4"
          typePill={
            <>
              <Swords className="w-3 h-3" /> Prompt Battle
            </>
          }
          status={challenge.status}
          joinedCount={challenge._count?.submissions ?? 0}
          title={challenge.title}
          description={
            challenge.description ||
            "1v1 prompt battles on Discord. Two creators race to recreate a reference scene — the community picks the winner."
          }
          prize={challenge.prize}
          deadline={challenge.deadline}
          formatChips={steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-primary border border-border-color text-body-xs"
            >
              <span className="font-mono font-bold text-tertiary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon className="w-3 h-3 text-muted flex-shrink-0" />
              <span className="text-muted truncate">{s.label}</span>
            </div>
          ))}
          ctaLabel="Join Battle"
        />
      </Link>
    </motion.div>
  );
}

/* ───────────────── WIDE CHALLENGE CARD (shared) ───────────────── */
function WideChallengeCard({
  videoSrc,
  typePill,
  status,
  joinedCount,
  title,
  description,
  prize,
  deadline,
  formatChips,
  ctaLabel,
}: {
  videoSrc: string;
  typePill: React.ReactNode;
  status: string;
  joinedCount: number;
  title: string;
  description: string;
  prize: string;
  deadline: string;
  formatChips: React.ReactNode;
  ctaLabel: string;
}) {
  const isActive = status === "active";
  const isEnded = status === "ended";

  return (
    <div className="project-card overflow-hidden">
      {/* Media + overlaid content */}
      <div className="relative min-h-[260px] sm:min-h-[320px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Left-to-right darkening so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[260px] sm:min-h-[320px]">
          {/* Top pills row */}
          <div className="flex flex-wrap items-center gap-2">
            {isActive && (
              <span className="badge badge-success text-label-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-50)] animate-pulse" />
                Active
              </span>
            )}
            <span className="pill-brand" style={{ padding: "4px 10px" }}>
              {typePill}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-body-xs text-white/70 border border-white/15 bg-white/5">
              <Users className="w-3 h-3" />
              {joinedCount} joined
            </span>
          </div>

          {/* Title + description + meta pushed to bottom of media area */}
          <div className="mt-auto max-w-2xl">
            <h3
              className="text-white font-semibold tracking-tight mb-2"
              style={{ fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15 }}
            >
              {title}
            </h3>
            <p className="text-body-sm text-white/75 leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-body-xs">
              {prize && (
                <span className="flex items-center gap-1.5 text-[var(--warning-50)] font-semibold">
                  <Trophy className="w-3.5 h-3.5" /> {prize}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5" />
                {isEnded ? (
                  "Ended"
                ) : (
                  <CountdownTimer deadline={deadline} compact />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — event format chips + CTA */}
      <div className="border-t border-border-color bg-surface-elevated p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-label-xs uppercase tracking-widest text-muted block mb-2">
            Event Format
          </span>
          <div className="flex flex-wrap gap-2">{formatChips}</div>
        </div>

        <div className="btn btn-tonel btn-md w-full lg:w-auto lg:self-center group-hover:brightness-110 transition-all flex-shrink-0">
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
