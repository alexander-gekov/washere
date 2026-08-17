import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { GiftExperience } from "@/components/GiftExperience";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export default async function GiftPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const from = query.from;
  const link = await fetchQuery(api.links.get, { slug: id });
  if (!link) notFound();

  return (
    <>
      <main className="px-6 pt-16">
        <GiftExperience
          slug={link.slug}
          input={{
            name: link.name,
            tone: link.tone,
            joke: link.joke,
          }}
          origin={siteOrigin()}
          created={from === "create"}
        />
      </main>
      <SiteFooter />
    </>
  );
}
