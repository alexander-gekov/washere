import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const tone = v.union(
  v.literal("warm"),
  v.literal("teasing"),
  v.literal("short"),
);

const linkPublic = v.object({
  slug: v.string(),
  name: v.string(),
  tone,
  joke: v.optional(v.string()),
});

const SLUG_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const HOUR_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 8;

function randomSlug(): string {
  const bytes = new Uint8Array(7);
  crypto.getRandomValues(bytes);
  let slug = "";
  for (const byte of bytes) {
    slug += SLUG_ALPHABET[byte % SLUG_ALPHABET.length];
  }
  return slug;
}

export const create = mutation({
  args: {
    name: v.string(),
    tone,
    joke: v.optional(v.string()),
    rateKey: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const name = args.name.trim().replace(/\s+/g, " ");
    if (name.length < 1 || name.length > 40) {
      throw new Error("Name must be 1–40 characters");
    }

    const joke = args.joke?.trim();
    if (joke && joke.length > 280) {
      throw new Error("Keep the personal note under 280 characters");
    }

    const now = Date.now();
    const bucket = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.rateKey))
      .unique();

    if (!bucket) {
      await ctx.db.insert("rateLimits", {
        key: args.rateKey,
        count: 1,
        windowStart: now,
      });
    } else if (now - bucket.windowStart > HOUR_MS) {
      await ctx.db.patch("rateLimits", bucket._id, {
        count: 1,
        windowStart: now,
      });
    } else if (bucket.count >= MAX_PER_HOUR) {
      throw new Error("Too many notes created. Try again in a bit.");
    } else {
      await ctx.db.patch("rateLimits", bucket._id, {
        count: bucket.count + 1,
      });
    }

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const slug = randomSlug();
      const existing = await ctx.db
        .query("links")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();
      if (existing) continue;

      await ctx.db.insert("links", {
        slug,
        name,
        tone: args.tone,
        joke: joke || undefined,
        createdAt: now,
      });
      return slug;
    }

    throw new Error("Could not create a link. Try again.");
  },
});

export const get = query({
  args: { slug: v.string() },
  returns: v.union(linkPublic, v.null()),
  handler: async (ctx, args) => {
    const link = await ctx.db
      .query("links")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!link) return null;
    return {
      slug: link.slug,
      name: link.name,
      tone: link.tone,
      joke: link.joke,
    };
  },
});
