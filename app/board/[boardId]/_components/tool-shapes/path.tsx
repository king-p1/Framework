import {   getSvgPathFromStroke } from '@/lib/utils';
import getStroke from 'perfect-freehand'

 


export const Path = ({
  stroke,
  x,
  y,
  points,
  fill,
  onPointerDown,
  rotation = 0,
  width,
  height
}: {
  stroke?: string;
  x: number;
  y: number;
  points: number[][];
  onPointerDown: (e: React.PointerEvent) => void;
  fill: string;
  rotation?: number;
  width: number;
  height: number;
}) => {
  // Get path bounds to calculate scale factors
  const pathD = getSvgPathFromStroke(
    getStroke(points, {
      size: 16, thinning: 0.5, smoothing: 0.5, streamline: 0.5
    })
  );
  
  // Calculate the center for rotation
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation || 0}, ${centerX}, ${centerY})`}
      onPointerDown={onPointerDown}
    >
      <path
        className='drop-shadow-md'
    
        d={pathD}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </g>
  );
};