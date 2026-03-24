"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Upload,
  Image as ImageIcon,
  X,
  AlertCircle,
  Save,
  Loader2,
} from "lucide-react";

interface ChallengeFormData {
  title: string;
  description: string;
  theme: string;
  bannerUrl: string;
  deadline: string;
  prize: string;
  status: string;
}

interface Props {
  initialData?: ChallengeFormData;
  challengeId?: string;
}

export function ChallengeForm({ initialData, challengeId }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [bannerPreview, setBannerPreview] = useState(
    initialData?.bannerUrl || ""
  );

  const [form, setForm] = useState<ChallengeFormData>(
    initialData || {
      title: "",
      description: "",
      theme: "",
      bannerUrl: "",
      deadline: "",
      prize: "",
      status: "active",
    }
  );

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setForm({ ...form, bannerUrl: url });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.deadline) {
      setError("Title and deadline are required");
      return;
    }

    setSaving(true);
    setError("");

    const url = challengeId
      ? `/api/challenges/${challengeId}`
      : "/api/challenges";
    const method = challengeId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Banner Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Banner Image
        </label>
        <div
          className={cn(
            "relative border-2 border-dashed border-border-color cursor-pointer overflow-hidden rounded-xl",
            "hover:border-primary/40 transition-colors",
            bannerPreview ? "h-48" : "h-40"
          )}
          onClick={() => fileRef.current?.click()}
        >
          {bannerPreview ? (
            <>
              <Image
                src={bannerPreview}
                alt="Banner"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBannerPreview("");
                  setForm({ ...form, bannerUrl: "" });
                }}
                className="absolute top-2 right-2 p-1 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Upload className="w-8 h-8 text-muted" />
              <p className="text-sm text-muted">Upload banner image</p>
              <p className="text-xs text-muted">
                Recommended: 1200x400px
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Challenge Title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="e.g. Make Your Action Scene"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Description *
        </label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Describe the challenge, rules, and what participants should create..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Theme */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Theme / Category
          </label>
          <input
            type="text"
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. Action, Fantasy, Sci-Fi"
          />
        </div>

        {/* Prize */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Prize
          </label>
          <input
            type="text"
            value={form.prize}
            onChange={(e) => setForm({ ...form, prize: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. $500,000"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Deadline *
          </label>
          <input
            type="datetime-local"
            required
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-background border border-border-color text-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl",
            "bg-gradient-to-r from-violet-600 to-purple-600",
            "text-white text-sm font-semibold",
            "hover:from-violet-500 hover:to-purple-500",
            "disabled:opacity-50 transition-all duration-200"
          )}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving
            ? "Saving..."
            : challengeId
            ? "Update Challenge"
            : "Create Challenge"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-2.5 rounded-lg text-sm text-muted border border-border-color hover:text-foreground hover:border-foreground/20 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
