import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { renderSkill } from "@/lib/skill";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const link = await fetchQuery(api.links.get, { slug: id });
  if (!link) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(
    renderSkill({
      name: link.name,
      tone: link.tone,
      joke: link.joke,
    }),
    {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
