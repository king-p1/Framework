"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Info } from "./info";
import { Members } from "./members";
import { Toolbar } from "./toolbar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/canvas/types";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@liveblocks/react";
import { CanvasProps } from "@/types";
import {
  cn,
  colorToCssColor,
  findIntersectingLayersWithRec,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { CursorsPresence } from "./cursors-presence";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { getStableUserColor } from "@/lib/constants";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { Path } from "./tool-shapes/path";
import { useDeleteLayers } from "@/hooks/use-delete-layers";

const MAX_LAYERS = 100;

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const layerIds = useStorage((root) => root.layerIds);

  const pencilDraft = useSelf((me)=>me.presence.pencilDraft)

  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const deleteLayers = useDeleteLayers();


  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Circle
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Triangle
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");

      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        current,
        origin,
      });
    }
  }, []);

  const updateSlectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

      const ids = findIntersectingLayersWithRec(
        layerIds!,
        layers,
        current,
        origin
      );

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");
      // const layers = self.presence.selection.map((layerId) => liveLayers.get(layerId))

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState]
  );

  const unSelectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft === null
      ) {
        return
      }

setMyPresence({
  cursor:point,
  pencilDraft: pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y ? pencilDraft : [...pencilDraft,[point.x, point.y,e.pressure]], 
})

    },
    [canvasState.mode]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({ pencilDraft: [[point.x, point.y, pressure]] });
    },
    [lastUsedColor]
  );

  const insertPath = useMutation(({storage,self,setMyPresence})=>{
    const liveLayers = storage.get("layers")

    const {pencilDraft} = self.presence

    if(pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS){
setMyPresence({pencilDraft:null})
      return
    }

    const id = nanoid()

    liveLayers.set(id,
      new LiveObject(penPointsToPathLayer(
        lastUsedColor,
        pencilDraft,
      ))
     )

     const liveLayerIds = storage.get("layerIds")
     liveLayerIds.push(id)
     setMyPresence({pencilDraft:null})
     setCanvasState({mode:CanvasMode.Pencil})

  },[lastUsedColor])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSlectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      resizeSelectedLayer,
      camera,
      translateSelectedLayers,
      continueDrawing,
      startMultiSelection,
      updateSlectionNet,
    ]
  );

  const onResizeHandlerPointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner });
    },
    [history]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      setCamera((camera) => ({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      }));
    },

    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unSelectLayer();
        setCanvasState({ mode: CanvasMode.None });
      }else if(canvasState.mode === CanvasMode.Pencil){
insertPath()
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.LayerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }
      history.resume();
    },
    [camera, canvasState, history, insertLayer, unSelectLayer,insertPath,setCanvasState]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = getStableUserColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);



useEffect(()=>{
  function onKeyDown(e: KeyboardEvent){
    switch (e.key) {
      case "z":
        if (e.ctrlKey||e.metaKey) {
          if(e.shiftKey){
            e.preventDefault();
            history.redo();
          }else{
            history.undo();
          }
          break;
        }
     case "y":
      if (e.ctrlKey||e.metaKey) {
        history.redo();
        break;
      }
      
      case "Delete":
          deleteLayers();
        break;
      
       
      default:
        break;
    }
  }

  document.addEventListener("keydown",onKeyDown)
  return ()=>document.removeEventListener("keydown",onKeyDown)
},[deleteLayers,history])


  return (
    <main
      className={cn(
        "h-full w-full bg-neutral-100 relative touch-none",
        "absolute inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(#000_1px,transparent_1px)]",
        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
      )}
    >
      <Info boardId={boardId} />
      <Members />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      <svg
        className="h-[100vh] w-[100vw] z-[999]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlerPointerDown={onResizeHandlerPointerDown}
          />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/50 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft!= null && pencilDraft.length > 0 && (
            <Path
            points={pencilDraft}
            fill={colorToCssColor(lastUsedColor)}
            x={0}
            y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};
