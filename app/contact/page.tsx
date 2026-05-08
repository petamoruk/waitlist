import type { Metadata } from "next";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Pet Amor",
  description: "Get in touch with the Pet Amor team for questions, feedback, or partnership enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Nav variant="inner" activeLink="contact" />
      <div className="pt-[73px]">
        <div className="pb-24 mx-auto px-5 md:px-8" style={{ maxWidth: 1100 }}>

          {/* Header */}
          <div className="pt-12 pb-14">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#E85D75] mb-3">Get in touch</p>
            <h1
              className="font-extrabold text-[#1F1F1F] mb-3 leading-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em" }}
            >
              Contact us
            </h1>
            <p className="text-[18px] text-[#6B6B6B] leading-relaxed" style={{ maxWidth: 480 }}>
              We&apos;d love to hear from you. Questions, feedback, or partnership enquiries — we&apos;re here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.7fr] gap-12 items-start">

            {/* Left: contact info */}
            <div className="flex flex-col gap-7">

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#9E9E9E]">Email us</span>
                <span className="text-[16px] font-medium">
                  <a href="mailto:contact@petamor.co.uk" className="text-[#E85D75] underline underline-offset-[3px] hover:opacity-75 transition-opacity">
                    contact@petamor.co.uk
                  </a>
                </span>
                <span className="text-[14px] text-[#6B6B6B] leading-relaxed">We aim to respond within one business day.</span>
              </div>

              <div className="h-px bg-[#E5E5E5]" />

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#9E9E9E]">Response time</span>
                <span className="text-[16px] font-medium text-[#1F1F1F]">Within 1 business day</span>
                <span className="text-[14px] text-[#6B6B6B] leading-relaxed">Our team is available Monday to Friday, 9am – 5pm GMT.</span>
              </div>

              <div className="h-px bg-[#E5E5E5]" />

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#9E9E9E]">What we can help with</span>
                <p className="text-[15px] text-[#6B6B6B] leading-relaxed">
                  Whether you have a <strong className="text-[#1F1F1F]">question about the waitlist</strong>, want to share <strong className="text-[#1F1F1F]">feedback on the product</strong>, or are interested in a <strong className="text-[#1F1F1F]">partnership or press enquiry</strong> — we&apos;d love to hear from you.
                </p>
                <p className="text-[15px] text-[#6B6B6B] leading-relaxed">For urgent pet health concerns, please contact a vet directly.</p>
              </div>

            </div>

            {/* Right: form card */}
            <div
              className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-9"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
            >
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
      <SiteFooter activeLink="contact" />
    </>
  );
}