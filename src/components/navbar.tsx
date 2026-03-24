"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
    user?.email
      ?.slice(0, 2)
      .toUpperCase() ||
    "?";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-color bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] h-16 items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div>
              <span className="text-lg font-bold tracking-tight block">
                Imagine<span className="text-primary">Art</span>
              </span>
              <span className="text-[10px] text-muted uppercase tracking-wider block">
                Creator Program
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center justify-center gap-1">
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

          <div className="flex items-center justify-end gap-3">
            {loggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-2 sm:px-3 h-9 rounded-lg",
                    "border border-border-color bg-surface hover:bg-surface-hover",
                    "transition-all duration-200"
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{initials}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted hidden sm:block" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border-color bg-surface shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border-color">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/admin/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Login
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth"
                  className={cn(
                    "flex items-center gap-1.5 px-4 h-9 rounded-lg",
                    "border border-border-color bg-surface hover:bg-surface-hover",
                    "text-sm font-medium text-muted hover:text-foreground",
                    "transition-all duration-200"
                  )}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log In</span>
                </Link>
                <Link
                  href="/auth?mode=signup"
                  className={cn(
                    "hidden sm:flex items-center gap-1.5 px-4 h-9 rounded-lg",
                    "bg-gradient-to-r from-violet-600 to-purple-600",
                    "text-white text-sm font-medium",
                    "hover:from-violet-500 hover:to-purple-500",
                    "transition-all duration-200"
                  )}
                >
                  <UserCircle className="w-3.5 h-3.5" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden border-t border-border-color px-4 py-2 flex gap-1">
        <NavLink href="/" active={pathname === "/"}>
          Challenges
        </NavLink>
        {isAdmin && (
          <NavLink href="/admin" active={pathname.startsWith("/admin")}>
            Dashboard
          </NavLink>
        )}
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
        "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
        active
          ? "text-primary bg-primary/10"
          : "text-muted hover:text-foreground hover:bg-surface-hover"
      )}
    >
      {children}
    </Link>
  );
}
