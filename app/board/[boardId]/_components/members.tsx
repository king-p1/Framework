import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Members = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white p-3 rounded-md shadow-md flex items-center '>Members</div>
  )
}

Members.Skeleton = function MembersSkeleton(){
  return(
    <div className='absolute top-2 right-2 bg-white rounded-md  h-12 flex items-center shadow-md w-[100px]'>
      <Skeleton className='h-full w-full bg-muted-foreground'/>
    </div>
  )
}