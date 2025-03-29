import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.insert("boards", {
      title: args.title,
      description: args.description,
      OrgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: "", //TODO for this think on using random svgs or give the user freedom to upload whatever they want
    });
    return board;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    const existingFav = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique()

      if(existingFav){
        await ctx.db.delete(existingFav._id)
      }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const title = args.title.trim();
    if (!title) throw new Error("Title not specified");

    if (title.length > 65) {
      throw new Error("Title cannot be more than 65 characters");
    }

    const description = args.description.trim();
    if (!description) throw new Error("Description not specified");

    if (description.length < 5) {
      throw new Error("Description cannot be less than 5 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
    });

    return board;
  },
});

export const favourite = mutation({
  args: {
    // id: v.optional(v.id("board")),
    id: v.id("boards"),

    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFav = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFav) throw new Error("You have already favourited this board");

    await ctx.db.insert("userFavourites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unFavourite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFav = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (!existingFav) throw new Error("Favourited board not found.");

    await ctx.db.delete(existingFav._id);

    return board;
  },
});


export const get = query({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const board = await ctx.db.get(args.id);
        return board;
    }
})