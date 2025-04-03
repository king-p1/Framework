import {   getSvgPathFromStroke } from '@/lib/utils';
import getStroke from 'perfect-freehand'

export const Path = ({stroke,x,y,points,fill,onPointerDown}:{
    stroke?: string;
    x:number;
    y:number;
    points: number[][];
    onPointerDown?: (
      e: React.PointerEvent,
    ) => void;
    fill: string;
  }) => {


    


  return (
    <path
    className='drop-shadow-md'
    onPointerDown={onPointerDown}
    d={getSvgPathFromStroke(
        getStroke(points,{
size:16,thinning:0.5,smoothing:0.5,streamline:0.5
        }
    ))}

    style={{
        transform: `translate(${x}px, ${y}px)`,
    }}
x={0}
y={0}
fill={fill}
stroke={stroke}
strokeWidth={1}
    />
    
  )
}
