import { Liveblocks } from "@liveblocks/node";
import { api } from "@/convex/_generated/api";
import { generateUserColor } from "@/lib/constants";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";


const liveblocks = new Liveblocks({
  secret:process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (req: Request) => {
    const authorization  = await auth();
  
    if (!authorization.sessionClaims) return new Response("Unauthorized", { status: 401 });
  
    const user = await currentUser();
 

    if (!user || !authorization) return new Response("Unauthorized", { status: 401 });
  
    const { room } = await req.json();
  
    const board = await convex.query(api.board.get, {
      id: room,
    });
    if (!board) return new Response("Unauthorized", { status: 401 });
    if (board?.OrgId !== authorization.orgId) return new Response("Unauthorized", { status: 403 });
  
    const isOwner = board.authorId === user.id;
    const isOrgMember = !!(board.OrgId && board.OrgId === authorization.sessionClaims.org_id);
    const isOrgAdmin = authorization.sessionClaims.org_role;
  
    if (!isOwner && !isOrgMember)
      return new Response("Unauthorized", { status: 401 });
  
    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name:user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
        role: isOrgAdmin as string,
        color: generateUserColor(),
      },
    });
  
    
    if(room){
        session.allow(room, session.FULL_ACCESS);
    }
    
    const { body, status } = await session.authorize();
  
    return new Response(body, { status });
  };