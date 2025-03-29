import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    boards:defineTable({
        title: v.string(),
        description: v.string(),
        OrgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
    .index("by_org",["OrgId"])
    .searchIndex("search_title",{
        searchField:"title",
        filterFields:["OrgId"]
    }),
    userFavourites:defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id("boards"),
    })
    .index("by_board",["boardId"])
    .index("by_user_org",["userId","orgId"])
    .index("by_user_board",["userId","boardId"])
    .index("by_user_board_org",["userId","boardId","orgId"])
    
})