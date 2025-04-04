export type Color = {
    r: number;
    g: number;
    b: number;
}

export type Camera = {
    x: number;
    y: number;
}

export enum LayerType {
  Rectangle,
  Circle,
  Note,
  Path,
  Text,
  Triangle
}


export type RectangleLayer = {
    type: LayerType.Rectangle;
    x:number;
    y:number;
    width: number;
    height: number;
    fill: Color;
    value?:string;
    rotation?: number;
}

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  points: number[][];
  value?: string;
  rotation?: number;
}

    export type CircleLayer = {
    type: LayerType.Circle;
    x:number;
    y:number;
    width: number;
    height: number;
    fill: Color;
    value?:string;
    rotation?: number;
}

export type TriangleLayer = {
    type: LayerType.Triangle;
    x:number;
    y:number;
    width: number;
    height: number;
    fill: Color;
    value?:string;
    rotation?: number;
}

export type TextLayer = {
    type: LayerType.Text;
    x:number;
    y:number;
    width: number;
    height: number;
    fill: Color;
    value?:string;
    rotation?: number;
}

export type NoteLayer = {
    type: LayerType.Note;
    x:number;
    y:number;
    width: number;
    height: number;
    fill: Color;
    value?:string;
    rotation?: number;
}

export type Point = {
    x: number;
    y: number;
}

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum Side {
     Top =1,
     Bottom = 2,
     Left = 4,
     Right = 8,
}


export type Layer = RectangleLayer  | PathLayer | CircleLayer | TextLayer | TriangleLayer | NoteLayer


















export type CanvasState = 
| {
    mode: CanvasMode.None;
  } | {
    mode: CanvasMode.SelectionNet,
    origin: Point,
    current?: Point;
  } | {
    mode: CanvasMode.Translating,
    current: Point;
  } | {
    mode: CanvasMode.Inserting,
    LayerType: LayerType.Circle|LayerType.Text|LayerType.Rectangle|LayerType.Note | LayerType.Triangle
  } | {
    mode: CanvasMode.Pencil;
  } | {
    mode: CanvasMode.Pressing,
    origin: Point
  } | {
    mode: CanvasMode.Resizing,
    initialBounds: XYWH,
    corner: Side,
    originalPoints?: number[][],  // For path resizing
    originalBounds?: XYWH        // For path resizing
  } | {
    mode: CanvasMode.Rotating,
    initialBounds: XYWH,
    initialAngle?: number,
    initialRotation?: number
  }
  
  export enum CanvasMode{
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
    Rotating
  }

