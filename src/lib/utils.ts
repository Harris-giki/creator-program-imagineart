import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDeadline(date: Date | string) {
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days}d ${hours}h remaining`;
  return `${hours}h remaining`;
}

export function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "text-emerald-400";
    case "ended":
      return "text-zinc-400";
    case "upcoming":
      return "text-violet-400";
    default:
      return "text-zinc-400";
  }
}

export function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "ended":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    case "upcoming":
      return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}
