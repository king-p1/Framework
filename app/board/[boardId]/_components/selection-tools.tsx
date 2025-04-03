import { Camera, Color } from "@/canvas/types";
import { useSelectionBounds } from "@/hooks/use-selection";
import { useSelf } from "@liveblocks/react";
import React, { memo } from "react";
import { ColorPicker } from "./color-picker";

export const SelectionTools = memo(
  ({
    camera,
    setLastUsedColor,
  }: {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
  }) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border-2 flex select-none"
        style={{
          transform: `translate(
        calc(${x}px - 50%),
        calc(${y - 16}px - 100%)
        )`
        }}
      >
   <ColorPicker
   onCHange={()=>{}}
   />
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
