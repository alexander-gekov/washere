import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    slug: v.string(),
    name: v.string(),
    tone: v.union(
      v.literal("warm"),
      v.literal("teasing"),
      v.literal("short"),
    ),
    joke: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    windowStart: v.number(),
  }).index("by_key", ["key"]),
});
