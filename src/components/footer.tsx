import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border-color bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/uploads/Logomarks.png"
              alt="ImagineArt"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <div>
              <span className="text-sm font-semibold block">
                Imagine<span className="text-primary">Art</span>
              </span>
              <span className="text-[10px] text-muted uppercase tracking-wider block">
                Creator Program
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-muted">
            <a href="mailto:m.haris@imagine.art" className="hover:text-primary transition-colors">
              Contact Support
            </a>
            <span className="hidden sm:inline">&middot;</span>
            <span>&copy; {new Date().getFullYear()} ImagineArt. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
