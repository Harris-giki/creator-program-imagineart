"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { cn, formatDeadline, getStatusBadgeClasses } from "@/lib/utils";
import { CountdownTimer } from "./countdown-timer";

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

export function ChallengeCard({
  challenge,
  index = 0,
}: {
  challenge: Challenge;
  index?: number;
}) {
  const isActive = challenge.status === "active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <div
          className={cn(
            "card relative overflow-hidden",
            "hover:bg-surface-hover",
            "transition-all duration-300",
            "hover:border-border-brand hover:shadow-lg hover:shadow-primary/5"
          )}
        >
          {challenge.bannerUrl && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={challenge.bannerUrl}
                alt={challenge.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span
                  className={cn(
                    "uppercase tracking-wider",
                    getStatusBadgeClasses(challenge.status)
                  )}
                >
                  {challenge.status}
                </span>
              </div>
              {challenge.prize && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[var(--warning-50)]" />
                  <span className="text-body-sm font-bold text-white">
                    {challenge.prize}
                  </span>
                </div>
              )}
            </div>
          )}

          {!challenge.bannerUrl && (
            <div className="relative h-48 bg-surface-brand border-b border-border-secondary flex items-center justify-center">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,color-mix(in_srgb,var(--primary-60)_12%,transparent)_50%,transparent_75%)] bg-[length:20px_20px]" />
              </div>
              <Trophy className="w-12 h-12 text-tertiary relative z-[1]" />
              <div className="absolute top-3 left-3 z-[1]">
                <span
                  className={cn(
                    "uppercase tracking-wider",
                    getStatusBadgeClasses(challenge.status)
                  )}
                >
                  {challenge.status}
                </span>
              </div>
            </div>
          )}

          <div className="p-5">
            <h3 className="text-heading-xs mb-2 group-hover:text-brand-text transition-colors line-clamp-1">
              {challenge.title}
            </h3>
            <p className="text-body-sm text-muted line-clamp-2 mb-4 leading-relaxed">
              {challenge.description}
            </p>

            <div className="flex items-center justify-between text-body-xs text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0} entries
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {isActive ? (
                    <CountdownTimer deadline={challenge.deadline} compact />
                  ) : (
                    formatDeadline(challenge.deadline)
                  )}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-text opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
