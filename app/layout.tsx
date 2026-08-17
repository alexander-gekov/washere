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
  title: "washere — a note in his coding agent",
  description:
    "Leave a surprise note in Cursor, Claude Code, or Codex. After he finishes something, it may say you were here.",
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
          <a
            href="https://github.com/alexandergekov/washere"
            className="font-mono text-xs tracking-wide underline decoration-line underline-offset-4 hover:text-wax"
          >
            Source
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
