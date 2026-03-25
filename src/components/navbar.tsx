"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LayoutDashboard } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => setIsAdmin(data.authenticated))
      .catch(() => {});
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-color bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-body-md font-bold tracking-tight block leading-tight">
                Imagine<span className="text-brand-text">Art</span>
              </span>
              <span className="text-label-xs text-muted block">
                Creator Program
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"}>
              Challenges
            </NavLink>
            {isAdmin && (
              <NavLink href="/admin" active={pathname.startsWith("/admin")}>
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 px-3.5 py-2 text-body-sm font-medium rounded-full transition-all duration-200",
        active
          ? "text-brand-text bg-surface-brand"
          : "text-muted hover:text-foreground hover:bg-surface-hover"
      )}
    >
      {children}
    </Link>
  );
}
