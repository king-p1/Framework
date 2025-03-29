import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Toolbar = () => {
  return (
    <div className='absolute top-[90%] -translate-y-[50%] left-[40%] flex flex-col gap-y-4'>
        <div className="flex gap-4">

        <div className="bg-white rounded-md  flex gap-y-1 gap-8 p-2 items-center">
            <div>Pencil</div>
            <div>Square</div>
            <div>Circle</div>
            <div>Text</div>
        </div>

        <div className="bg-white rounded-md p-2 flex gap-4 items-center shadow-md">
            <div>Undo</div>
            <div>Redo</div>
        </div>
        </div>

    </div>
  )
}

Toolbar.Skeleton = function ToolbarSkeleton(){
  return(
    <div className="flex gap-4 absolute top-[90%] -translate-y-[50%] left-[36%] shadow-md">

    <div className=' bg-white rounded-md  h-12 flex items-center shadow-md w-[320px]'>
      <Skeleton className='h-full w-full bg-muted-foreground'/>
    </div>
    
    <div className=' bg-white rounded-md  h-12 flex items-center shadow-md w-[110px]'>
      <Skeleton className='h-full w-full bg-muted-foreground'/>
    </div>
    </div>
  )
}