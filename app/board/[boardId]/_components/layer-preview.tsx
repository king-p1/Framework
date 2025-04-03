"use client"

import { LayerType } from "@/canvas/types";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./tool-shapes/rectangle";
import { Circle } from "./tool-shapes/circle";
import { Text } from "./tool-shapes/text";
import { Note } from "./tool-shapes/note";
import { Triangle } from "./tool-shapes/triangle";
import { Path } from "./tool-shapes/path";
import { colorToCssColor } from "@/lib/utils";

 

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
        case LayerType.Circle:
            return <Circle
             id={id}
             layer={layer}
             onPointerDown={onLayerPointerDown}
             selectionColor={selectionColor}
            />
       
            case LayerType.Rectangle:
            return <Rectangle
             id={id}
             layer={layer}
             onPointerDown={onLayerPointerDown}
             selectionColor={selectionColor}
            />
        
            case LayerType.Triangle:
            return <Triangle
             id={id}
             layer={layer}
             onPointerDown={onLayerPointerDown}
             selectionColor={selectionColor}
            />
        
            case LayerType.Text:
            return <Text
             id={id}
             layer={layer}
             onPointerDown={onLayerPointerDown}
             selectionColor={selectionColor}
            />
         
            case LayerType.Path:
            return <Path
             points={layer.points}
             onPointerDown={(e)=>onLayerPointerDown(e,id)}
             stroke={selectionColor}
             x={layer.x}
             y={layer.y}
             fill={layer.fill?colorToCssColor(layer.fill):"#000"}

            />
          
            case LayerType.Note:
            return <Note
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

