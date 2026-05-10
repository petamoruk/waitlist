import Link from "next/link";
import LogoIcon from "./LogoIcon";

interface NavProps {
  /** "home" shows the "Coming to the UK" badge; "inner" shows text nav-links */
  variant?: "home" | "inner";
  activeLink?: "home" | "contact";
}

export default function Nav({ variant = "home", activeLink }: Readonly<NavProps>) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-10 py-[18px] border-b border-[#E5E5E5]/60 z-[200]"
      style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
    >
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <span className="animate-heartbeat">
          <LogoIcon size={26} />
        </span>
        <span className="text-xl font-bold text-[#1F1F1F] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Pet <span className="text-[#E85D75] font-light">Amor</span>
        </span>
      </Link>

      {variant === "home" ? (
        <div className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-full bg-[#FDEEF1] text-[#E85D75] text-[13px] font-semibold">
          <span className="animate-pulse-dot" />
          Coming to the UK
        </div>
      ) : (
        <div className="hidden sm:flex items-center gap-7">
          <Link
            href="/"
            className="text-[14px] font-medium no-underline transition-colors duration-150"
            style={{ color: activeLink === "home" ? "var(--pink)" : "var(--text-sec)" }}
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="text-[14px] font-medium no-underline transition-colors duration-150"
            style={{ color: activeLink === "contact" ? "var(--pink)" : "var(--text-sec)" }}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}