"use client"
import {
    LiveblocksProvider, 
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import { CanvasLoader } from "./canvas-loader";
import { LiveList,LiveMap,LiveObject } from "@liveblocks/client";
import { Layer } from "@/canvas/types";

export const Room = ({children,roomId}:{
    children:React.ReactNode,roomId:string
}) => {

   

  return (
    <LiveblocksProvider
    authEndpoint={'/api/liveblocks-auth'}
    throttle={16}
    >
    <RoomProvider id={roomId} 
    initialPresence={{
      cursor:null,
      selection:[]
    }}
    initialStorage={{
      layers:new LiveMap<string, LiveObject<Layer>>(),
      layerIds:new LiveList([])

    }}
    >
        <ClientSideSuspense fallback={<CanvasLoader/>}>
        {()=>children}
        </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  )
}
