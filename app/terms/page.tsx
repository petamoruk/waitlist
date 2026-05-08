import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions — Pet Amor",
  description: "The terms and conditions governing your use of Pet Amor.",
};

const sections = [
  {
    num: "1",
    title: "About Pet Amor",
    content: (
      <p>Pet Amor is a subscription platform operated by Pet Amor Ltd, a company registered in England and Wales. Our service provides pet care tools including a care tracker, AI advisor, vet telemedicine, and related features as described on our website.</p>
    ),
  },
  {
    num: "2",
    title: "Eligibility",
    content: (
      <>
        <p>To use Pet Amor, you must:</p>
        <ul>
          <li>Be at least 16 years of age</li>
          <li>Be a resident of the United Kingdom (during our launch phase)</li>
          <li>Provide accurate and truthful information when creating your account</li>
        </ul>
        <p>By using our service, you confirm that you meet these requirements.</p>
      </>
    ),
  },
  {
    num: "3",
    title: "Your account",
    content: (
      <>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately at <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a> if you believe your account has been accessed without authorisation.</p>
        <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform.</p>
      </>
    ),
  },
  {
    num: "4",
    title: "Subscription and payments",
    content: (
      <>
        <p>Pet Amor is offered on a subscription basis. Details of subscription tiers and pricing will be communicated prior to launch and at the point of purchase. By subscribing, you authorise us to charge your chosen payment method on a recurring basis.</p>
        <p>You may cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing period. We do not offer refunds for unused portions of a billing period unless required by law.</p>
      </>
    ),
  },
  {
    num: "5",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to our systems or other users&apos; accounts</li>
          <li>Upload content that is harmful, offensive, or infringes on third-party rights</li>
          <li>Use automated tools to scrape or extract data from our platform</li>
          <li>Resell or redistribute access to our service without authorisation</li>
        </ul>
      </>
    ),
  },
  {
    num: "6",
    title: "Vet telemedicine and health advice",
    content: (
      <>
        <p>The vet consultation feature connects you with qualified professionals, but the advice given is general and for informational purposes. It does not replace an in-person consultation for emergencies or serious conditions. Always seek in-person veterinary care when your pet requires it.</p>
        <p>AI-generated health guidance is based on general knowledge and the information you provide. It is not a substitute for professional veterinary advice.</p>
      </>
    ),
  },
  {
    num: "7",
    title: "Intellectual property",
    content: (
      <p>All content, features, and functionality of Pet Amor — including text, graphics, logos, and software — are owned by Pet Amor Ltd and protected by UK and international intellectual property laws. You may not copy, distribute, or create derivative works without our written consent.</p>
    ),
  },
  {
    num: "8",
    title: "Limitation of liability",
    content: (
      <>
        <p>To the maximum extent permitted by law, Pet Amor Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
        <p>Our total liability to you in respect of any losses arising from these terms shall not exceed the amount you have paid us in the 12 months preceding the claim.</p>
      </>
    ),
  },
  {
    num: "9",
    title: "Third-party services",
    content: (
      <p>Our platform may include links to or integrations with third-party services (e.g. insurance providers, payment processors). These are governed by their own terms and privacy policies. We are not responsible for the content or practices of third-party services.</p>
    ),
  },
  {
    num: "10",
    title: "Changes to these terms",
    content: (
      <p>We may update these terms from time to time. We will notify you of significant changes by email or through the app. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
    ),
  },
  {
    num: "11",
    title: "Governing law",
    content: (
      <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
    ),
  },
  {
    num: "12",
    title: "Contact",
    content: (
      <p>If you have any questions about these terms, please <Link href="/contact">contact us</Link> or email <a href="mailto:contact@petamor.co.uk">contact@petamor.co.uk</a>.</p>
    ),
  },
];

export default function TermsPage() {
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
              Terms &amp; conditions
            </h1>
            <p className="text-[13px] text-[#9E9E9E]">Last updated: 1 May 2026</p>
          </div>

          <div className="legal-body">
            <p>Please read these Terms and Conditions carefully before using Pet Amor. By accessing or using our service, you agree to be bound by these terms. If you do not agree, please do not use our service.</p>
            <p>These terms are governed by the laws of England and Wales.</p>

            {sections.map((s) => (
              <div key={s.num}>
                <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-1.5 mt-12">{s.num}</span>
                <h2>{s.title}</h2>
                {s.content}
              </div>
            ))}
          </div>

        </div>
      </div>
      <SiteFooter activeLink="terms" />
    </>
  );
}