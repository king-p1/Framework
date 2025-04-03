import { RectangleLayer } from '@/canvas/types';
import { colorToCssColor } from '@/lib/utils';
import React from 'react'

export const Reactangle = ({id,layer,onPointerDown,selectionColor}:{
    id: string;
    onPointerDown: (
      e: React.PointerEvent,
      id: string
    ) => void;
    layer: RectangleLayer;
    selectionColor?: string;
  }) => {

const {x,y,height,width,fill} = layer

  return (
    <rect
    className='drop-shadow-md'
    onPointerDown={(e)=>onPointerDown(e,id)}
    style={{
        transform:`translate(${x}px, ${y}px)`
    }}
    width={width}
    height={height}
    x={0}
    y={0}
    strokeWidth={1}
    fill={fill? colorToCssColor(fill) : "#ccc"}
    //enable party mode selector
    stroke={selectionColor||'transparent'}
    />
    
  )
}
