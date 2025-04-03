"use client";
import { Camera, Color } from "@/canvas/types";
import { useSelectionBounds } from "@/hooks/use-selection";
import { useSelf, useMutation } from "@liveblocks/react";
import React, { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import { OrgHint } from "@/app/dashboard/_components/sidebar/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

export const SelectionTools = memo(
  ({
    camera,
    setLastUsedColor,
  }: {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
  }) => {
    const selection = useSelf((me) => me.presence.selection);

    const deleteLayers = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");

        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - i));
        }
      },
      [selection]
    );

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border-2 flex gap-2 select-none"
        style={{
          transform: `translate(
        calc(${x}px - 50%),
        calc(${y - 16}px - 100%)
        )`,
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className=" border-l-[3px] border-neutral-200 p-2 ">
          <div className="ml-3 flex flex-col gap-y-3 ">
            <OrgHint label="Bring to Front">
              <Button variant={"secondary"} onClick={moveToFront}>
                <BringToFront className="size-5" color="black" />
              </Button>
            </OrgHint>

            <OrgHint label="Send to back" side="bottom">
              <Button variant={"secondary"} onClick={moveToBack}>
                <SendToBack className="size-5" color="black" />
              </Button>
            </OrgHint>
          </div>
        </div>

        <div className="flex items-center pl-2 ml-1 border-l-[3px] border-neutral-200">
          <OrgHint label="Delete">
            <Button size={"icon"} className="bg-red-600" onClick={deleteLayers}>
              <Trash2 className="text-white" size={16} />
            </Button>
          </OrgHint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
