"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-10)]/80 via-transparent to-surface-brand/20" />

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-brand-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to challenges
        </Link>

        <div className="card p-8">
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
              <span className="text-heading-xs">
                Imagine<span className="text-brand-text">Art</span>
              </span>
              <p className="text-body-xs text-muted">Creator Program</p>
            </div>
          </div>

          {/* Step 1: Enter email */}
          {step === "email" && (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <p className="text-body-sm text-muted text-center mb-4">
                Enter the email you used when joining the Creator Program.
              </p>
              <div>
                <label className="block text-label-xs text-muted mb-2 uppercase tracking-wider">
                  Creator Program Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-error text-body-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-expressive btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          )}

          {/* Step 2: Set up password (new creator) */}
          {step === "setup" && (
            <form onSubmit={handleSetupPassword} className="space-y-4">
              <div className="flex items-center gap-2 text-body-sm text-[var(--success-50)] mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>Email verified! Set up your password.</span>
              </div>
              <p className="text-body-xs text-tertiary mb-2">{email}</p>

              <div>
                <label className="block text-label-xs text-muted mb-2 uppercase tracking-wider">
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
                    className="input w-full pl-10 pr-10 py-2.5"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-brand-text rounded-lg p-1 hover:bg-surface-hover transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-label-xs text-muted mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full px-3 py-2.5"
                  placeholder="Confirm password"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-error text-body-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-expressive btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="btn btn-ghost btn-sm w-full"
              >
                Use different email
              </button>
            </form>
          )}

          {/* Step 3: Log in (existing creator) */}
          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 text-body-sm text-[var(--success-50)] mb-4">
                <CheckCircle className="w-4 h-4" />
                <span>Welcome back!</span>
              </div>
              <p className="text-body-xs text-tertiary mb-2">{email}</p>

              <div>
                <label className="block text-label-xs text-muted mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full pl-10 pr-10 py-2.5"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-brand-text rounded-lg p-1 hover:bg-surface-hover transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-error text-body-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-expressive btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="btn btn-ghost btn-sm w-full"
              >
                Use different email
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-body-xs text-muted">
            Part of the Creator Program?{" "}
            <a href="mailto:m.haris@imagine.art" className="text-brand-text hover:underline">
              Contact us
            </a>{" "}
            to get your email verified.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
