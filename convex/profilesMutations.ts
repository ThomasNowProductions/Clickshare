import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    full_name: v.string(),
    job_title: v.string(),
    company: v.string(),
    profile_image: v.optional(v.string()),
    bio: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    slug: v.string(),
    social_links: v.object({
      linkedin: v.optional(v.string()),
      twitter: v.optional(v.string()),
      github: v.optional(v.string()),
      instagram: v.optional(v.string()),
      mastodon: v.optional(v.string()),
      bluesky: v.optional(v.string()),
      whatsapp: v.optional(v.string()),
      signal: v.optional(v.string()),
      telegram: v.optional(v.string()),
    }),
    edit_token: v.string(),
  },
  handler: async (ctx, args) => {
    const profileId = await ctx.db.insert("profiles", {
      ...args,
      custom_theme: {},
      visits: 0,
      qr_code_scans: 0,
    });
    return profileId;
  },
});

export const update = mutation({
  args: {
    id: v.id("profiles"),
    full_name: v.string(),
    job_title: v.string(),
    company: v.string(),
    profile_image: v.optional(v.string()),
    bio: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    social_links: v.object({
      linkedin: v.optional(v.string()),
      twitter: v.optional(v.string()),
      github: v.optional(v.string()),
      instagram: v.optional(v.string()),
      mastodon: v.optional(v.string()),
      bluesky: v.optional(v.string()),
      whatsapp: v.optional(v.string()),
      signal: v.optional(v.string()),
      telegram: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const incrementVisits = mutation({
  args: { id: v.id("profiles") },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.id);
    if (profile) {
      await ctx.db.patch(args.id, {
        visits: profile.visits + 1,
      });
    }
  },
});
