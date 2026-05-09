import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy | Pet Amor",
  description: "How Pet Amor uses cookies and how you can manage them.",
};

export default function CookiesPage() {
  return (
    <>
      <Nav variant="inner" />
      <div className="pt-[73px]">
        <div className="py-16 pb-24 mx-auto px-10 max-w-[720px]">

          {/* Header */}
          <div className="pt-12 pb-10 border-b border-[#E5E5E5] mb-14">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-3">Legal</p>
            <h1
              className="font-extrabold text-[#1F1F1F] mb-2.5 leading-tight"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.03em" }}
            >
              Cookie policy
            </h1>
            <p className="text-[13px] text-[#9E9E9E]">Last updated: 1 May 2026</p>
          </div>

          <div className="legal-body">
            <p>This Cookie Policy explains what cookies are, how Pet Amor uses them, and how you can control them. It should be read alongside our <Link href="/privacy">Privacy Policy</Link>.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 1</span>
            <h2>What are cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work properly, improve performance, and provide information to website owners.</p>
            <p>Similar technologies (such as local storage, session storage, and pixels) work in a comparable way and are also covered by this policy.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 2</span>
            <h2>How we use cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3>Strictly necessary cookies</h3>
            <p>These cookies are essential for the website to function. They enable core features such as account authentication, security, and maintaining your session. You cannot opt out of these cookies.</p>
            <ul>
              <li><strong>Session token:</strong> keeps you logged in during a visit</li>
              <li><strong>CSRF token:</strong> protects against cross-site request forgery</li>
              <li><strong>Cookie consent:</strong> stores your cookie preferences</li>
            </ul>

            <h3>Analytics cookies</h3>
            <p>These help us understand how visitors use our site so we can improve it. The information collected is aggregated and anonymous.</p>
            <ul>
              <li><strong>Usage analytics:</strong> pages visited, time on site, navigation paths</li>
              <li><strong>Performance monitoring:</strong> load times, error rates</li>
            </ul>

            <h3>Functional cookies</h3>
            <p>These cookies remember your preferences to improve your experience.</p>
            <ul>
              <li><strong>Language preference:</strong> stores your preferred language</li>
              <li><strong>Theme preference:</strong> light or dark mode, if applicable</li>
            </ul>

            <h3>Marketing cookies</h3>
            <p>We currently use minimal marketing cookies. If this changes, we will update this policy and seek your consent where required.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 3</span>
            <h2>Third-party cookies</h2>
            <p>Some cookies are set by third-party services that appear on our pages. These include:</p>
            <ul>
              <li><strong>Analytics providers:</strong> to help us measure usage</li>
              <li><strong>Payment processors:</strong> during checkout flows</li>
            </ul>
            <p>We do not have direct control over third-party cookies. Please refer to the relevant third party&apos;s privacy and cookie policies for more information.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 4</span>
            <h2>How long do cookies last?</h2>
            <p>Cookies can be either session cookies (deleted when you close your browser) or persistent cookies (remain on your device for a set period). The specific duration depends on the cookie&apos;s purpose. Session cookies expire when you close your browser, while persistent cookies may last anywhere from a few days to two years.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 5</span>
            <h2>Managing your cookie preferences</h2>
            <p>You have several options for managing cookies:</p>
            <h3>Through our cookie banner</h3>
            <p>When you first visit our site, you will see a cookie banner that allows you to accept or decline non-essential cookies. You can update your preferences at any time.</p>
            <h3>Through your browser</h3>
            <p>Most browsers allow you to view, manage, block, and delete cookies through their settings. Please note that disabling cookies may affect the functionality of our service. Below are links to guidance for common browsers:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 6</span>
            <h2>Changes to this policy</h2>
            <p>We may update this Cookie Policy from time to time. We will update the &ldquo;last updated&rdquo; date at the top of this page when we do. We encourage you to review this policy periodically.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 7</span>
            <h2>Contact us</h2>
            <p>If you have questions about our use of cookies, please <Link href="/contact">contact us</Link> or email <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a>.</p>
          </div>

        </div>
      </div>
      <SiteFooter activeLink="cookies" />
    </>
  );
}