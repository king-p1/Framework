"use client";

import { LayerType, Side, XYWH } from "@/canvas/types";
import { useSelf, useStorage } from "@liveblocks/react";
import { memo } from "react";
import { useSelectionBounds } from "@/hooks/use-selection";
import { RotateCw } from "lucide-react";

const HANDLE_WIDTH = 8;
export const SelectionBox = memo(
  ({
    onResizeHandlerPointerDown,
    onRotateHandlerPointerDown
  }: {
    onResizeHandlerPointerDown: (corner: Side, initialBounds: XYWH) => void;
    onRotateHandlerPointerDown: (initialBounds: XYWH) => void;
  }) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage((root) => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path)
    
    const isShowingHandlesForPath = useStorage((root) => 
      soleLayerId && root.layers.get(soleLayerId) !== undefined
    );

    const rotation = useStorage((root) => 
      soleLayerId ? root.layers.get(soleLayerId)?.rotation || 0 : 0
    );

const bounds = useSelectionBounds()

if(!bounds) return null

const centerX = bounds.x + bounds.width / 2;
const centerY = bounds.y + bounds.height / 2;

 
    return (
<>
<g style={{
       
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: rotation ? `${centerX}px ${centerY}px` : undefined,
      }}>

<rect
className='fill-transparent stroke-blue-500 stroke-1 pointer-events-none'
style={{
  transform:`translate(${bounds.x}px, ${bounds.y}px)`
}}
x={0}
y={0}
width={bounds.width}
height={bounds.height}
/>

{isShowingHandles &&(
  <>
  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2}px,${bounds.y - HANDLE_WIDTH/2}px)`,
    cursor:'nwse-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Top + Side.Left, bounds)
  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x + bounds.width/2 - HANDLE_WIDTH/2}px,${bounds.y - HANDLE_WIDTH/2}px)`,
    cursor:'ns-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Top, bounds)

  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px,${bounds.y - HANDLE_WIDTH/2}px)`,
    cursor:'nesw-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Top + Side.Right, bounds)

  }}
  />
  
  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2 +bounds.width}px,${bounds.y + bounds.height/2 - HANDLE_WIDTH/2}px)`,
    cursor:'ew-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Right, bounds)

  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2 +bounds.width}px,${bounds.y  - HANDLE_WIDTH/2 + bounds.height}px)`,
    cursor:'nwse-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Bottom + Side.Right, bounds)

  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x  +bounds.width/2 - HANDLE_WIDTH/2}px,${bounds.y  - HANDLE_WIDTH/2 + bounds.height}px)`,
    cursor:'ns-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Bottom, bounds)

  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2 }px,${bounds.y  - HANDLE_WIDTH/2 + bounds.height}px)`,
    cursor:'nesw-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Bottom + Side.Left, bounds)

  }}
  />

  <rect 
  className="fill-white stroke-1 stroke-blue-500 "
  x={0}
  y={0}
  style={{
    transform: `translate(${bounds.x - HANDLE_WIDTH/2 }px,${bounds.y  - HANDLE_WIDTH/2 + bounds.height/2}px)`,
    cursor:'ew-resize',
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
  }}
  onPointerDown={(e)=>{
    e.stopPropagation()
    onResizeHandlerPointerDown(Side.Left, bounds)

  }}
  />
  </>
)}


{isShowingHandles && (
         <>
        
        <foreignObject
                x={bounds.x + bounds.width + 10}
                y={bounds.y + bounds.height / 2 - 12}
                width={24}
                height={24}
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onRotateHandlerPointerDown(bounds);
                }}
              >
           <RotateCw 
             size={24} 
             color={'#000000'} 
             className="text-blue-500 bg-white rounded-full p-1 border border-blue-500" 
           />
         </foreignObject>
       </>
        )}

{isShowingHandlesForPath && (
         <>
        
        <foreignObject
                x={bounds.x + bounds.width + 10}
                y={bounds.y + bounds.height / 2 - 12}
                width={24}
                height={24}
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onRotateHandlerPointerDown(bounds);
                }}
              >
           <RotateCw 
             size={24} 
             color={'#000000'} 
             className="text-blue-500 bg-white rounded-full p-1 border border-blue-500" 
           />
         </foreignObject>
       </>
        )}

</g>

</>
    )}
);

SelectionBox.displayName = "SelectionBox";
