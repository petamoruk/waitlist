import Link from "next/link";
import LogoIcon from "./LogoIcon";

interface SiteFooterProps {
  activeLink?: "privacy" | "terms" | "cookies" | "contact";
}

const links = [
  { href: "/privacy",  label: "Privacy policy", key: "privacy" },
  { href: "/terms",    label: "Terms",           key: "terms"   },
  { href: "/cookies",  label: "Cookies",         key: "cookies" },
  { href: "/contact",  label: "Contact",         key: "contact" },
] as const;

export default function SiteFooter({ activeLink }: Readonly<SiteFooterProps>) {
  return (
    <footer className="border-t border-[#E5E5E5] px-10 py-8">
      <div className="flex flex-wrap items-center justify-between gap-5 mx-auto" style={{ maxWidth: 1100 }}>

        {/* Brand + tagline */}
        <div className="flex flex-col gap-1.5">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="animate-heartbeat">
              <LogoIcon size={20} />
            </span>
            <span className="text-[17px] font-bold text-[#1F1F1F]" style={{ letterSpacing: "-0.02em" }}>
              Pet <span className="text-[#E85D75] font-light">Amor</span>
            </span>
          </Link>
          <span className="text-[13px] text-[#9E9E9E] pl-[30px]">Smarter care for the pets you love</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6">
          {links.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              className="text-[13px] no-underline transition-colors duration-150"
              style={{ color: activeLink === key ? "var(--text)" : "var(--text-tert)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="text-[12px] text-[#9E9E9E]">© 2026 Pet Amor Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}