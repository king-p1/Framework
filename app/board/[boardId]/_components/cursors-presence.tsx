"use client"

import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react"
import { memo } from "react"
import { Cursor } from "./cursor"
import { useAtomValue } from "jotai"
import { partyModeAtom } from "@/lib/atoms"
import { Path } from "./tool-shapes/path"
import { colorToCssColor } from "@/lib/utils"

const Cursors = () => {
    const ids = useOthersConnectionIds()
    const partyMode = useAtomValue(partyModeAtom)
    
    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    connectionId={connectionId}
                    partyMode={partyMode}
                    key={connectionId}
                />
            ))}
        </>    
    )
}

const Drafts = () => {
    const others = useOthersMapped((other)=>({
pencilDraft:other.presence.pencilDraft,
penColor:other.presence.penColor 
    }),shallow)
    
    return(<>
    {
        others.map(([key,other]) => {
            if(other.pencilDraft){
                return(
                    <Path
                    key={key}
                    x={0}
                    y={0}
                    points={other.pencilDraft}
                    fill={other.penColor?colorToCssColor(other.penColor):'#000'}

                    />
                )
            }
            return null
        })
    }</>)
}

export const CursorsPresence = memo(() => {
    return <>
    <Drafts/>
    <Cursors />
    </>
})

CursorsPresence.displayName = 'CursorsPresence'