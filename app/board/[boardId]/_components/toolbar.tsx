import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { ToolBtn } from "./tool-btn";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Triangle,
  Type,
  Undo2,
} from "lucide-react";
import { ToolbarProp } from "@/types";
import { CanvasMode, LayerType } from "@/canvas/types";

export const Toolbar = ({
  canvasState,
  setCanvasState,
  canRedo,
  canUndo,
  redo,
  undo,
}: ToolbarProp) => {
  return (
    <div className="absolute top-[93%] -translate-y-[50%]  justify-center items-center flex flex-col gap-y-4 w-full">
      <div className="flex gap-4">
        <div className="bg-white rounded-md  flex gap-y-1 gap-3 p-2 items-center">
          <ToolBtn
            label="Select"
            icon={MousePointer2}
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
            isActive={
              //active selection states from the detailed canvas types
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.SelectionNet ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing
            }
          />

          <ToolBtn
            label="Text"
            icon={Type}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Text,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.LayerType === LayerType.Text
            }
          />

          <ToolBtn
            label="Sticky Note"
            icon={StickyNote}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Note,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.LayerType === LayerType.Note
            }
          />

          <ToolBtn
            label="Rectangle"
            icon={Square}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Rectangle,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.LayerType === LayerType.Rectangle
            }
          />

          <ToolBtn
            label="Circle"
            icon={Circle}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Circle,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.LayerType === LayerType.Circle
            }
          />

          <ToolBtn
            label="Triangle"
            icon={Triangle}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                LayerType: LayerType.Triangle,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.LayerType === LayerType.Triangle
            }
          />

          <ToolBtn
            label="Pen"
            icon={Pencil}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Pencil,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Pencil 
            }
          />
        </div>

        <div className="bg-white rounded-md p-2 flex gap-4 items-center shadow-md">
          <ToolBtn
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isActive={!canUndo}
          />

          <ToolBtn
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isActive={!canRedo}
          />
        </div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="flex gap-4 absolute top-[93%] -translate-y-[50%] justify-center items-center shadow-md">
      <div className=" bg-white rounded-md  h-12 flex items-center shadow-md w-[320px]">
        <Skeleton className="h-full w-full bg-muted-foreground" />
      </div>

      <div className=" bg-white rounded-md  h-12 flex items-center shadow-md w-[110px]">
        <Skeleton className="h-full w-full bg-muted-foreground" />
      </div>
    </div>
  );
};
