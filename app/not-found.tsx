import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6">
      <h1 className="font-serif text-4xl italic">This note is gone.</h1>
      <p className="mt-4 text-ink-soft">
        The link may be wrong, or it was never sealed.
      </p>
      <Link href="/" className="mt-8 font-mono text-xs tracking-wide underline">
        Write a new one
      </Link>
    </main>
  );
}
