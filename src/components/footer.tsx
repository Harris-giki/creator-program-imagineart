import Image from "next/image";
import Link from "next/link";

/* ─── Social icon SVGs ─── */
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconReddit() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <circle cx="12" cy="12" r="10" />
      <path fill="white" d="M17.49 10.5a1.5 1.5 0 0 0-1.5 1.23 7.27 7.27 0 0 0-3.99-1.23l.68-3.16 2.2.46a1.1 1.1 0 1 0 .13-.62l-2.45-.52-.77 3.57a7.27 7.27 0 0 0-3.92 1.23 1.5 1.5 0 1 0-1.73 2.38 2.87 2.87 0 0 0 0 .38c0 1.94 2.24 3.5 5.01 3.5s5.01-1.57 5.01-3.5c0-.13 0-.26-.02-.38A1.5 1.5 0 0 0 17.49 10.5zm-8.74 2a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.5 2.64a3.29 3.29 0 0 1-2.25.69 3.29 3.29 0 0 1-2.25-.69.24.24 0 0 1 .34-.34 2.85 2.85 0 0 0 1.91.55 2.85 2.85 0 0 0 1.91-.55.24.24 0 0 1 .34.34zm-.25-1.64a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.06a8.22 8.22 0 0 0 4.81 1.54V7.15a4.85 4.85 0 0 1-1.04-.46z" />
    </svg>
  );
}
function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const exploreLinks = [
  { label: "Image AI", href: "https://imagine.art/image" },
  { label: "Video AI", href: "https://imagine.art/video" },
  { label: "Music AI", href: "https://imagine.art/music" },
  { label: "Voice AI", href: "https://imagine.art/voice" },
  { label: "Teams", href: "https://imagine.art/teams" },
  { label: "See all features", href: "https://imagine.art" },
];

const companyLinks = [
  { label: "About Us", href: "https://imagine.art/about" },
  { label: "Trust Center", href: "https://imagine.art/trust" },
  { label: "Blogs", href: "https://imagine.art/blog" },
  { label: "Media Kit", href: "https://imagine.art/media-kit" },
  { label: "Careers", href: "https://imagine.art/careers" },
  { label: "Contact Sales", href: "mailto:sales@imagine.art" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "https://imagine.art/privacy" },
  { label: "Terms of Service", href: "https://imagine.art/terms" },
  { label: "Security", href: "https://imagine.art/security" },
  { label: "Licensing", href: "https://imagine.art/licensing" },
  { label: "Ethics Guidelines", href: "https://imagine.art/ethics" },
  { label: "Content Policy", href: "https://imagine.art/content-policy" },
];

const socialLinks = [
  { icon: IconFacebook, href: "https://facebook.com/imagineart", label: "Facebook" },
  { icon: IconInstagram, href: "https://instagram.com/imagineart", label: "Instagram" },
  { icon: IconX, href: "https://x.com/imagineart", label: "X" },
  { icon: IconReddit, href: "https://reddit.com/r/imagineart", label: "Reddit" },
  { icon: IconTikTok, href: "https://tiktok.com/@imagineart", label: "TikTok" },
  { icon: IconDiscord, href: "https://discord.gg/imagineart", label: "Discord" },
];

export function Footer() {
  return (
    <footer style={{ background: "#000000" }}>
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-8">
          {/* Logomark */}
          <div className="flex-shrink-0 flex items-start">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Explore */}
            <div>
              <p className="text-label-sm font-semibold text-white mb-4">Explore</p>
              <ul className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-label-sm font-semibold text-white mb-4">Company</p>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-label-sm font-semibold text-white mb-4">Legal</p>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-body-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; {new Date().getFullYear()} Vyva Ai. All rights reserved.
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large ImagineArt watermark */}
      <div className="overflow-hidden select-none pointer-events-none pb-2" aria-hidden>
        <p
          className="leading-none tracking-tighter text-center"
          style={{
            fontSize: "clamp(56px, 13.5vw, 168px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        >
          ImagineArt
        </p>
      </div>
    </footer>
  );
}
