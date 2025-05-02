/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateUserColor, getStableUserColor } from '@/lib/constants'
import { useOther } from '@liveblocks/react'
import { MousePointer2 } from 'lucide-react'
import React, { memo, useEffect, useState } from 'react'

interface CursorProps {
    connectionId: number;
    partyMode?: boolean;
}

export const Cursor = memo(({ connectionId, partyMode = false }: CursorProps) => {
    const info = useOther(connectionId, (user) => user.info)
    const cursor = useOther(connectionId, (user) => user.presence.cursor)
    const [color, setColor] = useState(() => getStableUserColor(connectionId))

    useEffect(() => {
        if (!partyMode) {
            setColor(getStableUserColor(connectionId))
            return
        }
        
        // Only update color in party mode
        const interval = setInterval(() => {
            setColor(generateUserColor())
        }, 500)
        
        return () => clearInterval(interval)
    }, [partyMode, connectionId])

    const name = info?.name || 'Member'

    if (!cursor) return null

    const { x, y } = cursor
    
    // TODO move party mode to the toolbar
    const cursorColor = partyMode ? generateUserColor() : getStableUserColor(connectionId)

    return (
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
            }}
            height={50}
            width={name.length * 10 + 24 }
            className='relative drop-shadow-md'
        >
            <MousePointer2 
                className='size-5' 
                style={{
                    color: cursorColor,
                    fill: cursorColor
                }}
            />
            <div 
                className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs font-semibold text-white"
                style={{ backgroundColor: cursorColor }}
            >
                {name}
            </div>
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'