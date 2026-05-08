import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pet Amor — Join the waitlist",
  description:
    "Pet Amor is the all-in-one platform for UK pet owners — vet care, daily tracking, AI advice, and more. Be the first to know when we launch.",
  openGraph: {
    title: "Pet Amor — Join the waitlist",
    description:
      "Everything your pet needs, in one place. Join 2,400+ UK pet owners on the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}