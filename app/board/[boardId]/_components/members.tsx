"use client"
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { UserAvatar } from './user-avatar'
import { useOthers,useSelf } from '@liveblocks/react'

const MAX_SHOWN_USER = 2
export const Members = () => {

  const users = useOthers()
  const currentUser = useSelf()
  const showMoreUsers = users.length>MAX_SHOWN_USER

  return (
    <div className='absolute h-12 top-2 right-2 bg-white p-3 rounded-md shadow-md flex items-center '>
      <div className="flex gap-x-2">
        {users.slice(0,MAX_SHOWN_USER).map(({connectionId,info:{avatar,color,name}})=>(
      <UserAvatar key={connectionId} 
      src={avatar}
      name={name}
      // role={role}
       borderColor={color}
       fallback={name[0]||"M"}
      />
        ))}


        {currentUser && (<UserAvatar key={currentUser.connectionId}
         name={currentUser.info.name}
         fallback={currentUser.info.name[0]}
         src={currentUser.info.avatar}
         borderColor={currentUser.info.color}
        //  role={currentUser.info.role}
         />)}

         {showMoreUsers && (<UserAvatar 
         name={`${users.length-MAX_SHOWN_USER} more`}
         fallback={`${users.length-MAX_SHOWN_USER}`}
         
         />)}
      </div>
    </div>
  )
}

Members.Skeleton = function MembersSkeleton(){
  return(
    <div className='absolute top-2 right-2 bg-white rounded-md  h-12 flex items-center shadow-md w-[100px]'>
      <Skeleton className='h-full w-full bg-muted-foreground'/>
    </div>
  )
}