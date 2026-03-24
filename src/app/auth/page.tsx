"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}

type Step = "email" | "setup" | "login";

function AuthContent() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check-email", email: email.trim() }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setStep(data.hasAccount ? "login" : "setup");
    setLoading(false);
  }

  async function handleSetupPassword(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "setup-password",
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  function goBack() {
    setStep("email");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-purple-600/5" />

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to challenges
        </Link>

        <div className="rounded-2xl border border-border-color bg-surface p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <div>
              <span className="text-lg font-bold">
                Imagine<span className="text-primary">Art</span>
              </span>
              <p className="text-xs text-muted">Creator Program</p>
            </div>
          </div>

          {/* Step 1: Enter email */}
          {step === "email" && (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <p className="text-sm text-muted text-center mb-4">
                Enter the email you used when joining the Creator Program.
              </p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Creator Program Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-2.5 rounded-xl font-semibold text-sm text-white",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "hover:from-violet-500 hover:to-purple-500",
                  "disabled:opacity-50 transition-all duration-200"
                )}
              >
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          )}

          {/* Step 2: Set up password (new creator) */}
          {step === "setup" && (
            <form onSubmit={handleSetupPassword} className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 text-sm mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>Email verified! Set up your password.</span>
              </div>
              <p className="text-xs text-muted mb-2">{email}</p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground rounded-lg"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Confirm password"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-2.5 rounded-xl font-semibold text-sm text-white",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "disabled:opacity-50 transition-all duration-200"
                )}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full text-sm text-muted hover:text-foreground"
              >
                Use different email
              </button>
            </form>
          )}

          {/* Step 3: Log in (existing creator) */}
          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 text-sm mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>Welcome back!</span>
              </div>
              <p className="text-xs text-muted mb-2">{email}</p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground rounded-lg"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-2.5 rounded-xl font-semibold text-sm text-white",
                  "bg-gradient-to-r from-violet-600 to-purple-600",
                  "disabled:opacity-50 transition-all duration-200"
                )}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full text-sm text-muted hover:text-foreground"
              >
                Use different email
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-muted">
            Part of the Creator Program?{" "}
            <a href="mailto:m.haris@imagine.art" className="text-primary hover:underline">
              Contact us
            </a>{" "}
            to get your email verified.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
