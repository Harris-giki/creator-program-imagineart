"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LogIn, LayoutDashboard, LogOut, UserCircle, ChevronDown } from "lucide-react";

interface UserInfo {
  id: string;
  name: string | null;
  email: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth").then((r) => r.json()),
      fetch("/api/user").then((r) => r.json()),
    ]).then(([adminData, userData]) => {
      setIsAdmin(adminData.authenticated);
      setUser(userData.user || null);
    }).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const loggedIn = !!user;
  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    user?.email?.slice(0, 2).toUpperCase() ||
    "?";

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

            {loggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-2 sm:px-3 h-9 rounded-full",
                    "border border-border-color bg-surface hover:bg-surface-hover",
                    "transition-all duration-200"
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-70)] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{initials}</span>
                  </div>
                  <span className="hidden sm:block text-body-sm font-medium truncate max-w-[100px]">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted hidden sm:block" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border-color bg-surface shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border-secondary">
                      <p className="text-body-sm font-semibold truncate">{user.name}</p>
                      <p className="text-body-xs text-muted truncate">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/admin/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Login
                    </Link>

                    <div className="border-t border-border-secondary">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-body-sm text-error hover:bg-error-surface transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth" className="btn btn-secondary btn-sm">
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log In</span>
                </Link>
                <Link href="/auth?mode=signup" className="btn btn-primary btn-sm hidden sm:inline-flex">
                  <UserCircle className="w-3.5 h-3.5" />
                  Sign Up
                </Link>
              </div>
            )}

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
