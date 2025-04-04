import { TriangleLayer } from '@/canvas/types';
import { colorToCssColor } from '@/lib/utils';
import React from 'react'

export const Triangle = ({id, layer, onPointerDown, selectionColor}:{
    id: string;
    onPointerDown: (
      e: React.PointerEvent,
      id: string
    ) => void;
    layer: TriangleLayer;
    selectionColor?: string;
  }) => {

const {x, y, height, width, fill,rotation=0} = layer

  // Calculate the points for the triangle
  // Creates an equilateral triangle within the bounding box
  const points = `
    ${width/2},0
    ${width},${height}
    0,${height}
  `;

  return (
    <polygon
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation || 0}deg)`,
        transformOrigin: `${width / 2}px ${height / 2}px`
          }}
      points={points}
      strokeWidth={1}
      fill={fill ? colorToCssColor(fill) : "#ccc"}
      stroke={selectionColor || 'transparent'}
    />
  )
}