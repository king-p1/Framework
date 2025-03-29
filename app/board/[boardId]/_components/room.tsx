"use client"
import {
    LiveblocksProvider, 
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import { CanvasLoader } from "./canvas-loader";

export const Room = ({children,roomId}:{
    children:React.ReactNode,roomId:string
}) => {

   

  return (
    <LiveblocksProvider
    authEndpoint={'/api/liveblocks-auth'}
    >
    <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={<CanvasLoader/>}>
        {()=>children}
        </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  )
}
