import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Pet Amor",
  description: "How Pet Amor collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
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
              Privacy policy
            </h1>
            <p className="text-[13px] text-[#9E9E9E]">Last updated: 1 May 2026</p>
          </div>

          <div className="legal-body">
            <p>At Pet Amor, we take your privacy seriously. This policy explains what personal data we collect, why we collect it, how we use it, and your rights as a user. We are committed to being transparent and handling your information with care.</p>
            <p>Pet Amor Ltd is the data controller for the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 1</span>
            <h2>Who we are</h2>
            <p>Pet Amor Ltd is a company registered in England and Wales. Our registered address is available on request. You can contact us at <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a>.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 2</span>
            <h2>What data we collect</h2>
            <p>We collect data in the following ways:</p>
            <h3>Data you provide to us</h3>
            <ul>
              <li>Your name and email address when you join our waitlist or create an account</li>
              <li>Information about your pets (name, species, breed, age, health records)</li>
              <li>Messages you send via our contact form</li>
              <li>Payment information (handled securely by our payment processor — we do not store full card details)</li>
            </ul>
            <h3>Data collected automatically</h3>
            <ul>
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>Usage data (pages visited, features used, time spent in the app)</li>
              <li>IP address and approximate location</li>
              <li>Cookie data (see our <Link href="/cookies">Cookie Policy</Link> for details)</li>
            </ul>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 3</span>
            <h2>Why we use your data</h2>
            <p>We use your data for the following purposes and legal bases:</p>
            <ul>
              <li><strong>Providing our service</strong> — to create and manage your account, and deliver the features you use. Legal basis: contract performance.</li>
              <li><strong>Waitlist communications</strong> — to keep you informed about our launch and early access. Legal basis: legitimate interests / consent.</li>
              <li><strong>Improving our product</strong> — to understand how people use Pet Amor and make it better. Legal basis: legitimate interests.</li>
              <li><strong>Customer support</strong> — to respond to your questions and resolve issues. Legal basis: contract performance and legitimate interests.</li>
              <li><strong>Legal compliance</strong> — to meet our obligations under UK law. Legal basis: legal obligation.</li>
            </ul>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 4</span>
            <h2>How long we keep your data</h2>
            <p>We keep your data only for as long as necessary. Waitlist data is held until you unsubscribe or for a maximum of 24 months from collection. Account data is retained while your account is active and for 6 months after deletion, unless a longer period is legally required.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 5</span>
            <h2>Who we share your data with</h2>
            <p>We do not sell your personal data. We may share data with:</p>
            <ul>
              <li><strong>Service providers</strong> — trusted third parties who help us deliver our service (e.g. hosting, analytics, email delivery). They are bound by data processing agreements.</li>
              <li><strong>Veterinary professionals</strong> — only when you initiate a consultation, and with your consent.</li>
              <li><strong>Legal authorities</strong> — where required by law or to protect our rights.</li>
            </ul>
            <p>All data transfers outside the UK comply with UK GDPR transfer requirements.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 6</span>
            <h2>Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
              <li><strong>Erasure</strong> — request that we delete your data in certain circumstances</li>
              <li><strong>Restriction</strong> — ask us to limit how we process your data</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent</strong> — where we rely on consent, you may withdraw it at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a>. We will respond within 30 days.</p>
            <p>You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 7</span>
            <h2>Cookies</h2>
            <p>We use cookies and similar tracking technologies. For full details, see our <Link href="/cookies">Cookie Policy</Link>.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 8</span>
            <h2>Children&apos;s privacy</h2>
            <p>Pet Amor is not intended for use by anyone under the age of 16. We do not knowingly collect data from children. If you believe we have collected data from a child, please contact us immediately.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 9</span>
            <h2>Changes to this policy</h2>
            <p>We may update this policy from time to time. When we do, we will update the &ldquo;last updated&rdquo; date at the top of this page and, where appropriate, notify you by email. Continued use of our service after changes constitutes acceptance of the updated policy.</p>

            <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">Section 10</span>
            <h2>Contact us</h2>
            <p>If you have any questions about this policy or how we handle your data, please <Link href="/contact">contact us</Link> or email <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a>.</p>
          </div>

        </div>
      </div>
      <SiteFooter activeLink="privacy" />
    </>
  );
}