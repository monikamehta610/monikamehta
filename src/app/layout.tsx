import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Monika Mehta | Science Educator, IBDP Biology & ESS Specialist, Biotech Professional",
  description:
    "Monika Mehta is an experienced Science Educator & Biotechnology Professional with 9+ years in university lecturing, IBDP Biology & ESS instruction, and quality control. Book a tutoring consultation or explore interactive IB course slides.",
  keywords: [
    "Monika Mehta",
    "IBDP Biology",
    "IBDP ESS",
    "Science Educator",
    "Biotechnology",
    "IB Tutor",
    "San Jose Educator",
    "University Lecturer",
  ],
  authors: [{ name: "Monika Mehta" }],
  openGraph: {
    title: "Monika Mehta | Science Educator & Biotech Specialist",
    description:
      "Expert IBDP instruction, university lecturing, and interactive study resources for IB Environmental Systems & Societies and Biology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
