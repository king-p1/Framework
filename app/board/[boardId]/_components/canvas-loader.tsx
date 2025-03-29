// "use client" 
import React from 'react'
import { TbLoader3 } from 'react-icons/tb'
import { Info } from './info'
import { Members } from './members'
import { Toolbar } from './toolbar'
export const CanvasLoader = () => {
  return (
    <main className='h-full w-full bg-neutral-100 relative touch-none flex items-center justify-center'>
        <Info.Skeleton/>
        <TbLoader3 color='black' className='size-16 animate-spin'/>
        <Members.Skeleton/>
        <Toolbar.Skeleton/>
        </main>
  )
}
