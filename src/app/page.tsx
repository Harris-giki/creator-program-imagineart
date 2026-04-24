"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChallengeCard } from "@/components/challenge-card";
import { Trophy, ArrowRight, Play, Sparkles } from "lucide-react";

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
                Two formats. One home for every ImagineArt creator. Pick a sprint or
                battle and ship work from your own workflow—free to join.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[420px] skeleton rounded-[26px]" />
                <div className="h-[420px] skeleton rounded-[26px]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  desc: "When the sprint or battle window opens, join from wherever you create with ImagineArt. The theme drops at the start—no prep, pure creative reflex.",
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
                  desc: "Judges score entries on quality, creativity, realism, and LinkedIn visibility. Winners are announced the Sunday after; top creators earn credits and shoutouts.",
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
                  Past and upcoming events for ImagineArt creators.
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

          <p
            className="text-white/85 max-w-xl mt-2"
            style={{ fontSize: "clamp(16px, 1.4vw, 22px)", lineHeight: 1.45 }}
          >
            Explore a wide range of creative challenges on ImagineArt. Submit your best
            work, discover new styles, and compete with creators worldwide. Win exciting
            prizes and earn recognition for your creativity.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-10">
            <Link href="#events" className="btn btn-tonel btn-lg">
              View challenges
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

  const eventWindow = [
    { label: "Challenge Begin", dateTime: "Sunday, 8:10 PM PT" },
    { label: "Challenge End", dateTime: "Sunday, 9:10 PM PT" },
    { label: "Winners announcement", dateTime: "Following Sunday, 8:00 PM PT" },
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
          title={challenge.title}
          prize={challenge.prize}
          formatChips={eventWindow.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-0.5 px-2.5 py-2 rounded-lg bg-surface-primary border border-border-color text-body-xs min-w-0 sm:min-w-[12rem]"
            >
              <span className="font-semibold text-foreground">{s.label}</span>
              <span className="text-muted">{s.dateTime}</span>
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

  const eventWindow = [
    { label: "Creators opt in", dateTime: "Saturday, 8:00 PM PT" },
    { label: "Selection & theme reveal", dateTime: "Sunday, 8:00 PM PT" },
    { label: "Submission deadline", dateTime: "Monday, 8:00 PM PT" },
    { label: "Winners announcement", dateTime: "Tuesday, 8:00 PM PT" },
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
          title={challenge.title}
          prize={challenge.prize}
          formatChips={eventWindow.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-0.5 px-2.5 py-2 rounded-lg bg-surface-primary border border-border-color text-body-xs min-w-0 sm:min-w-[12rem]"
            >
              <span className="font-semibold text-foreground">{s.label}</span>
              <span className="text-muted">{s.dateTime}</span>
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
  title,
  prize,
  formatChips,
  ctaLabel,
}: {
  videoSrc: string;
  title: string;
  prize: string;
  formatChips: React.ReactNode;
  ctaLabel: string;
}) {
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
          {/* Title + meta pushed to bottom of media area */}
          <div className="mt-auto max-w-2xl">
            <h3
              className="text-white font-semibold tracking-tight mb-3"
              style={{ fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15 }}
            >
              {title}
            </h3>

            {prize && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-body-xs">
                <span className="flex items-center gap-1.5 text-[var(--warning-50)] font-semibold">
                  <Trophy className="w-3.5 h-3.5" /> {prize}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom strip — event timeline chips + CTA */}
      <div className="border-t border-border-color bg-surface-elevated p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-label-xs uppercase tracking-widest text-muted block mb-2">
            Event Timeline
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
