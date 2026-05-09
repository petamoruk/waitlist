import Link from "next/link";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";
import WaitlistForm from "./components/WaitlistForm";
import FeatureCards from "./components/FeatureCards";
import PetChips from "./components/PetChips";
import { WaitlistEmailProvider } from "./components/WaitlistEmailProvider";

export default function Home() {
  return (
    <WaitlistEmailProvider>
    <div className="bg-mesh relative">
      <div className="relative z-[1]">

        <Nav variant="home" />

        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[140px] pb-24">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-[#E85D75] bg-[#FDEEF1] px-4 py-1.5 rounded-full mb-8 animate-fade-up-1">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" fill="#E85D75" opacity="0.25"/>
              <circle cx="6" cy="6" r="3" fill="#E85D75"/>
            </svg>
            Early access · Limited spots
          </div>

          <h1
            className="font-black text-[#1F1F1F] leading-none tracking-[-0.04em] mb-6 animate-fade-up-2"
            style={{ fontSize: "clamp(48px, 8vw, 88px)", maxWidth: 900 }}
          >
            Everything your pet<br />
            needs, in <em className="not-italic text-[#E85D75]">one place</em>
          </h1>

          <p
            className="text-[#6B6B6B] leading-relaxed mb-12 animate-fade-up-3"
            style={{ fontSize: "clamp(17px, 2vw, 20px)", maxWidth: 520 }}
          >
            Track care, get vet advice, and understand your pet like never before. Pet Amor is coming to the UK. Be the first to know.
          </p>

          <div className="animate-fade-up-4 w-full flex flex-col items-center gap-3">
            <WaitlistForm id="hero-email" source="hero" placeholder="Enter your email address" buttonText="Join waitlist" />
            <p className="text-[12px] text-[#9E9E9E]">
              By joining, you agree to our{" "}
              <Link href="/privacy" className="text-[#E85D75] underline underline-offset-2">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/terms" className="text-[#E85D75] underline underline-offset-2">Terms</Link>.
            </p>
          </div>

          <PetChips />

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-7 animate-fade-up-5">
            <div className="flex">
              {["S", "J", "M", "R"].map((l, i) => (
                <div
                  key={l}
                  className="flex items-center justify-center rounded-full border-2 border-white bg-[#F7F3F0] text-[#E85D75] text-[13px] font-bold"
                  style={{ width: 32, height: 32, marginLeft: i === 0 ? 0 : -8 }}
                >{l}</div>
              ))}
              <div
                className="flex items-center justify-center rounded-full border-2 border-white bg-[#FDEEF1] text-[#E85D75] text-[13px] font-bold"
                style={{ width: 32, height: 32, marginLeft: -8 }}
              >+</div>
            </div>
            <p className="text-[13px] text-[#6B6B6B]">
              <strong className="text-[#1F1F1F] font-bold">2,400+ pet owners</strong> already on the waitlist
            </p>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto px-6" style={{ maxWidth: 1100 }}>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9E9E9E] text-center mb-3">
              What&apos;s included
            </p>
            <h2
              className="font-extrabold text-[#1F1F1F] text-center mx-auto mb-12"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.03em", maxWidth: 560 }}
            >
              One platform for every part of pet ownership
            </h2>
            <FeatureCards />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-24 bg-[#F7F3F0] border-t border-b border-[#EDE6DF]">
          <div className="mx-auto px-6" style={{ maxWidth: 1100 }}>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9E9E9E] mb-3">How it works</p>
            <h2
              className="font-extrabold text-[#1F1F1F] mb-14"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.03em" }}
            >
              Up and running in minutes
            </h2>
            <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {[
                {
                  n: "1",
                  title: "Add your pet",
                  desc: "Create a profile for each of your pets. Breed, age, medical history, all in one place.",
                },
                {
                  n: "2",
                  title: "Track daily care",
                  desc: "Log walks, meals, medication and grooming with a tap. Set reminders so nothing gets missed.",
                },
                {
                  n: "3",
                  title: "Get smart insights",
                  desc: "Your AI advisor learns your pet's patterns and gives you personalised, vet-backed guidance.",
                },
              ].map((step) => (
                <div key={step.n} className="flex flex-col gap-3.5">
                  <div
                    className="flex items-center justify-center rounded-full bg-[#FDEEF1] text-[#E85D75] text-[15px] font-extrabold flex-shrink-0"
                    style={{ width: 40, height: 40 }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#1F1F1F] mb-1">{step.title}</div>
                    <div className="text-[15px] text-[#6B6B6B] leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="py-20 bg-white">
          <div className="mx-auto px-6" style={{ maxWidth: 1100 }}>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9E9E9E] mb-3">Why trust us</p>
            <h2
              className="font-extrabold text-[#1F1F1F] mb-12"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.03em" }}
            >
              Built for real pet owners
            </h2>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {[
                {
                  icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
                  title: "Built with veterinary guidance",
                  desc: "Every feature has been reviewed and informed by qualified UK veterinarians to ensure the advice you receive is safe and accurate.",
                },
                {
                  icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
                  title: "Designed for real pet owners",
                  desc: "No jargon, no complexity. We spoke to hundreds of UK pet owners to build something that genuinely fits into your daily life.",
                },
                {
                  icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
                  title: "Your data stays yours",
                  desc: "We never sell your personal data. Your pet's health information is encrypted, private, and always under your control.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex items-start gap-4 p-7 bg-[#F7F3F0] rounded-2xl border border-[#EDE6DF]"
                >
                  <div
                    className="flex items-center justify-center rounded-xl bg-white flex-shrink-0"
                    style={{ width: 44, height: 44, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E85D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-[#1F1F1F] mb-1.5">{card.title}</div>
                    <div className="text-[14px] text-[#6B6B6B] leading-snug">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="px-6 py-28 text-center bg-white">
          <h2
            className="font-black text-[#1F1F1F] mb-3 leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}
          >
            Be first in line.<br />
            Your pet <em className="not-italic text-[#E85D75]">deserves it.</em>
          </h2>
          <p className="text-[17px] text-[#6B6B6B] mb-10">
            Join thousands of UK pet owners waiting for a better way to care.
          </p>
          <div className="flex flex-col items-center gap-3">
            <WaitlistForm
              id="footer-email"
              source="footer-cta"
              placeholder="Your email address"
              buttonText="Get early access"
              compact
            />
            <p className="text-[12px] text-[#9E9E9E]">
              By joining, you agree to our{" "}
              <Link href="/privacy" className="text-[#E85D75] underline underline-offset-2">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/terms" className="text-[#E85D75] underline underline-offset-2">Terms</Link>.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
    </WaitlistEmailProvider>
  );
}