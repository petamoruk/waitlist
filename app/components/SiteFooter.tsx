import Link from "next/link";

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
    <path d="M20 34C20 34 5 22 5 12.5C5 7.25 9.25 3 14.5 3C17.12 3 20 4.8 20 4.8C20 4.8 22.88 3 25.5 3C30.75 3 35 7.25 35 12.5C35 22 20 34 20 34Z" fill="#E85D75"/>
    <circle cx="13" cy="4.5" r="3" fill="#E85D75" opacity="0.5"/>
    <circle cx="27" cy="4.5" r="3" fill="#E85D75" opacity="0.5"/>
    <circle cx="7.5" cy="11" r="2.5" fill="#E85D75" opacity="0.4"/>
    <circle cx="32.5" cy="11" r="2.5" fill="#E85D75" opacity="0.4"/>
  </svg>
);

interface SiteFooterProps {
  activeLink?: "privacy" | "terms" | "cookies" | "contact";
}

const links = [
  { href: "/privacy",  label: "Privacy policy", key: "privacy" },
  { href: "/terms",    label: "Terms",           key: "terms"   },
  { href: "/cookies",  label: "Cookies",         key: "cookies" },
  { href: "/contact",  label: "Contact",         key: "contact" },
] as const;

export default function SiteFooter({ activeLink }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#E5E5E5] px-10 py-8">
      <div className="flex flex-wrap items-center justify-between gap-5 mx-auto" style={{ maxWidth: 1100 }}>

        {/* Brand + tagline */}
        <div className="flex flex-col gap-1.5">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="animate-heartbeat">
              <LogoIcon />
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