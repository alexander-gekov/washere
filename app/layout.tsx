import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { Stamp } from "@/components/Stamp";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "washere — a note in their coding agent",
  description:
    "Leave a surprise note in Cursor, Claude Code, or Codex. After they finish something, it may say you were here.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-8">
          <Link href="/" className="inline-flex items-center gap-4">
            <Stamp />
            <span className="font-mono text-xs tracking-[0.18em] uppercase">
              washere
            </span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              href="/#create"
              className="font-mono text-xs tracking-wide underline decoration-line underline-offset-4 hover:text-wax"
            >
              Write one
            </Link>
            <a
              href="https://github.com/alexander-gekov/washere"
              className="font-mono text-xs tracking-wide underline decoration-line underline-offset-4 hover:text-wax"
            >
              Source
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
