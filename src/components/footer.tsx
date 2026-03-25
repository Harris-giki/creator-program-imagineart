import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-color bg-surface-hover/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/uploads/Logomarks.png"
                alt="ImagineArt"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="text-body-md font-bold">
                Imagine<span className="text-brand-text">Art</span>
              </span>
            </div>
            <p className="text-body-sm text-muted max-w-xs leading-relaxed">
              The creative platform powering AI art challenges and community events.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="text-label-sm text-foreground mb-1">Program</p>
            <Link href="/" className="text-body-sm text-muted hover:text-brand-text transition-colors">
              Challenges
            </Link>
            <Link href="/admin/login" className="text-body-sm text-muted hover:text-brand-text transition-colors">
              Admin
            </Link>
            <a
              href="mailto:m.haris@imagine.art"
              className="text-body-sm text-muted hover:text-brand-text transition-colors"
            >
              Contact Support
            </a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <p className="text-label-sm text-foreground mb-1">Legal</p>
            <a href="https://imagine.art/privacy" className="text-body-sm text-muted hover:text-brand-text transition-colors">
              Privacy
            </a>
            <a href="https://imagine.art/terms" className="text-body-sm text-muted hover:text-brand-text transition-colors">
              Terms
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-secondary flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-body-xs text-tertiary">
            &copy; {new Date().getFullYear()} ImagineArt. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
