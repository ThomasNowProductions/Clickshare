import { query } from "./_generated/server";
import { v } from "convex/values";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return profile;
  },
});

export const getByEditToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_edit_token", (q) => q.eq("edit_token", args.token))
      .unique();
    return profile;
  },
});
