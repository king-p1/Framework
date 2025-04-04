import { CircleLayer } from '@/canvas/types';
import { colorToCssColor } from '@/lib/utils';
import React from 'react'

export const Circle = ({id,layer,onPointerDown,selectionColor}:{
    id: string;
    onPointerDown: (
      e: React.PointerEvent,
      id: string
    ) => void;
    layer: CircleLayer;
    selectionColor?: string;
  }) => {

const {x,y,height,width,fill,rotation=0} = layer

  return (
    <ellipse
    className='drop-shadow-md'
    onPointerDown={(e)=>onPointerDown(e,id)}
    style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation || 0}deg)`,
      transformOrigin: `${width / 2}px ${height / 2}px`
    }}
    cx={width/2}
    cy={height/2}
    rx={width/2}
    ry={height/2}
    strokeWidth={1}
    fill={fill? colorToCssColor(fill) : "#ccc"}
    //enable party mode selector
    stroke={selectionColor||'transparent'}
    />
    
  )
}
