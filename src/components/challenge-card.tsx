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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/challenges/${challenge.id}`} className="group block">
        <div className="project-card">
          {/* Media */}
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-primary">
            {challenge.bannerUrl ? (
              <Image
                src={challenge.bannerUrl}
                alt={challenge.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-90)] via-surface-primary to-surface-elevated flex items-center justify-center">
                <Trophy className="w-10 h-10 text-tertiary" strokeWidth={1.25} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

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
                <span className="text-body-sm font-semibold text-white">
                  {challenge.prize}
                </span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-5">
            <h3 className="text-heading-xs font-semibold mb-2 text-foreground group-hover:text-brand-text transition-colors line-clamp-1">
              {challenge.title}
            </h3>
            <p className="text-body-sm text-muted line-clamp-2 mb-4 leading-relaxed">
              {challenge.description}
            </p>

            <div className="flex items-center justify-between text-body-xs text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {challenge._count?.submissions ?? 0}
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
              <ArrowRight className="w-4 h-4 text-brand-text opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
