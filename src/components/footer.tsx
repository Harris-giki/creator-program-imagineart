import Image from "next/image";

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
function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
function IconReddit() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12c-.69 0-1.25.56-1.25 1.25 0 .687.56 1.248 1.25 1.248.687 0 1.248-.56 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.56 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.095.33.33 0 0 0 0 .463c.842.842 2.484.912 2.961.912.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.198-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.729V1.729C24 .774 23.205 0 22.222 0h.003z" />
    </svg>
  );
}

const toolsLinks = [
  { label: "AI Image", href: "https://www.imagine.art/image-studio" },
  { label: "AI Video", href: "https://www.imagine.art/video-studio" },
  { label: "AI Music", href: "https://www.imagine.art/music-studio" },
  { label: "AI Voice", href: "https://www.imagine.art/voice-studio" },
  { label: "See all features", href: "https://www.imagine.art" },
];

const resourcesLinks = [
  { label: "Help Center", href: "https://help.imagine.art/" },
  { label: "Blogs", href: "https://www.imagine.art/blogs" },
  { label: "Careers", href: "https://jobs.ashbyhq.com/imagineart" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "https://www.imagine.art/privacy-policy" },
  { label: "Terms of Service", href: "https://www.imagine.art/terms-and-conditions" },
];

const socialLinks = [
  { icon: IconFacebook, href: "https://www.facebook.com/groups/imagineai", label: "Facebook" },
  { icon: IconInstagram, href: "https://www.instagram.com/imagineartofficial/", label: "Instagram" },
  { icon: IconX, href: "https://x.com/ImagineArt_X", label: "X" },
  { icon: IconLinkedIn, href: "https://www.linkedin.com/company/imagineartai/", label: "LinkedIn" },
  { icon: IconReddit, href: "https://www.reddit.com/r/ImagineAiArt/", label: "Reddit" },
  { icon: IconDiscord, href: "https://discord.gg/p6ZXQnAM", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border-color">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 pt-14 pb-8">
        {/* Top content */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-10 sm:gap-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Image
              src="/vector.png"
              alt="ImagineArt"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
          </div>

          {/* Link columns pushed to the right */}
          <div className="sm:ml-auto grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            <FooterColumn title="Tools" links={toolsLinks} />
            <FooterColumn title="Resources" links={resourcesLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-color">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-body-xs text-tertiary">
            <span>&copy; 2026 Vyro Turkey. All rights reserved.</span>
            <span className="hidden sm:inline text-border-color" aria-hidden>
              •
            </span>
            <button
              type="button"
              className="hover:text-foreground transition-colors"
            >
              Manage Cookie Preferences
            </button>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full text-tertiary hover:text-foreground transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large ImagineArt watermark */}
      <div className="overflow-hidden select-none pointer-events-none pb-4" aria-hidden>
        <p
          className="leading-none text-center font-bold text-white"
          style={{
            fontSize: "clamp(56px, 16vw, 220px)",
            letterSpacing: "-0.04em",
          }}
        >
          ImagineArt
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-label-sm font-semibold text-foreground mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-body-sm text-muted hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
