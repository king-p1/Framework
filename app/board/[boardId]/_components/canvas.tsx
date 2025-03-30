"use client";
import React, { useCallback, useState } from "react";
import { Info } from "./info";
import { Members } from "./members";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState } from "@/canvas/types";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@liveblocks/react";
import { CanvasProps } from "@/types";
import { cn, pointerEventToCanvasPoint } from "@/lib/utils";
import { CursorsPresence } from "./cursors-presence";

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e,camera)



      setMyPresence({ cursor: current });
    },
    []
  );
  
  const onWheel = useCallback((e: React.WheelEvent) => { 
   
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }
 
,[]);

  return (
    <main className={cn("h-full w-full bg-neutral-100 relative touch-none","absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#000_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]")}>
     

      <Info boardId={boardId} />
      <Members />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
      />

      <svg className="h-[100vh] w-[100vw] z-[999]"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
