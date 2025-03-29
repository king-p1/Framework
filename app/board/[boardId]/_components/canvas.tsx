"use client"
import React from 'react'
import { Info } from './info'
import { Members } from './members'
import { Toolbar } from './toolbar'
import { CanvasProps } from '@/types'
// import { useSelf } from '@liveblocks/react'
export const Canvas = ({boardId}:CanvasProps) => {
  // const info = useSelf((me)=>me.info)

  //todo add special background from acerternity
    return (
    <main className='h-full w-full bg-neutral-100 relative touch-none'>
        <Info boardId={boardId}/>
        <Members/>
        <Toolbar/>
    </main>
  )
}
