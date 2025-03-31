"use client"

import { LayerType } from "@/canvas/types";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Reactangle } from "./rectangle";

 

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
}: {
  id: string;
  onLayerPointerDown: (
    e: React.PointerEvent,
    layerId: string
  ) => void;
  selectionColor?: string;
}) => {

    const layer =useStorage((root)=>root.layers.get(id))

    if(!layer) return null

    switch(layer.type) {
        case LayerType.Rectangle:
            return <Reactangle
             id={id}
             layer={layer}
             onPointerDown={onLayerPointerDown}
             selectionColor={selectionColor}
            />

            default:
                console.warn("Layer type not supported")
                return null
    }

})


LayerPreview.displayName ='LayerPreview'

