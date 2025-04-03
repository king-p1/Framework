import { cn,colorToCssColor } from '@/lib/utils'
import {Kanit,} from 'next/font/google'
import ContentEditable,{ContentEditableEvent} from 'react-contenteditable'
import {TextLayer} from '@/canvas/types'
import { useMutation } from '@liveblocks/react'

const kanit = Kanit({
    subsets: ['latin'],
  weight: ['400','700'],
})
export const Text = ({id,layer,onPointerDown,selectionColor}:{
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
  
}) => {

    const {fill,width,height,value,x,y} = layer

    const calcFontSize=(width: number, height: number)=>{
        const maxFontSize = 96
        const scaleFactor = 0.5

        const fontSizeBasedOnHeight = height * scaleFactor
        const fontSizeBasedOnWidth = width * scaleFactor

        return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
    }

    const updateVal = useMutation(({storage},newVal:string)=>{
        const liveLayers = storage.get("layers")

        liveLayers.get(id)?.set("value",newVal)

    },[])

    const handleContentUpdate=(e:ContentEditableEvent) =>{
updateVal(e.target.value)
    }

  return (
    <foreignObject
    x={x}
    y={y}
    width={width}
    height={height}
    onPointerDown={(e)=>onPointerDown(e,id)}
    style={{
        outline:selectionColor?`1px solid ${selectionColor}`:"none"
    }}
    >
        <ContentEditable
        html={value || 'Text'}
        onChange={handleContentUpdate}
        className={cn('h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',kanit.className)}
        style={{
            color: fill? colorToCssColor(fill) :"#000",
            fontSize:calcFontSize(width,height),
        }}

        />
    </foreignObject>
  )
}
