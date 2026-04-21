"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => setIsAdmin(data.authenticated))
      .catch(() => {});
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isHome
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-xl border-b border-border-color"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand — ImagineArt Creator Program */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <div className="hidden sm:block leading-tight">
              <span
                className={cn(
                  "block text-label-lg font-semibold tracking-tight",
                  isHome ? "text-white" : "text-foreground"
                )}
              >
                Imagine
                <span className="text-[var(--primary-40)]">Art</span>
              </span>
              <span
                className={cn(
                  "block text-label-xs",
                  isHome ? "text-white/60" : "text-muted"
                )}
              >
                Creator Program
              </span>
            </div>
          </Link>

          {/* Right actions — primary CTA + icon */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-body-sm font-medium transition-all",
                  pathname.startsWith("/admin")
                    ? "bg-surface-brand text-brand-text border border-border-brand"
                    : isHome
                      ? "text-white/70 hover:text-white border border-white/10 hover:bg-white/5"
                      : "text-muted hover:text-foreground border border-border-color hover:bg-surface-hover"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            )}

            <a
              href="https://discord.gg/p6ZXQnAM"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-tonel btn-md"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
