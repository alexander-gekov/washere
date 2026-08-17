"use server";

import { fetchMutation } from "convex/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { hashRateKey } from "@/lib/hash";
import { isTone } from "@/lib/types";

export async function createLink(
  formData: FormData,
): Promise<{ error: string } | void> {
  const name = String(formData.get("name") ?? "");
  const toneValue = String(formData.get("tone") ?? "");
  const jokeRaw = String(formData.get("joke") ?? "").trim();

  if (!isTone(toneValue)) {
    return { error: "Pick a tone." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  let slug: string;
  try {
    slug = await fetchMutation(api.links.create, {
      name,
      tone: toneValue,
      joke: jokeRaw || undefined,
      rateKey: await hashRateKey(ip),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create the note.";
    return { error: message };
  }

  redirect(`/s/${slug}?from=create`);
}
