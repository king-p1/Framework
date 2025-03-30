"use client"

import { useOthersConnectionIds } from "@liveblocks/react"
import { memo } from "react"
import { Cursor } from "./cursor"
import { useAtomValue } from "jotai"
import { partyModeAtom } from "@/lib/atoms"

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

export const CursorsPresence = memo(() => {
    return <Cursors />
})

CursorsPresence.displayName = 'CursorsPresence'