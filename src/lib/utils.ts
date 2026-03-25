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
      return "text-success";
    case "ended":
      return "text-muted";
    case "upcoming":
      return "text-brand-text";
    default:
      return "text-muted";
  }
}

export function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "active":
      return "badge badge-success";
    case "ended":
      return "badge badge-neutral";
    case "upcoming":
      return "badge badge-brand";
    default:
      return "badge badge-neutral";
  }
}
