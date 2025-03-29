"use client"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import logo from '@/public/framework-logo.png'
import Link from 'next/link'
import { OrgHint } from '@/app/dashboard/_components/sidebar/hint'
import { RenameModal } from '@/components/ui/modals/rename-modal'
import { Actions } from '@/components/actions'
import { Menu } from 'lucide-react'
//TODO look for how to refactor this onCopy when in board, consider taking the current location of the page and passing it as a prop.
export const Info = ({boardId}:{
  boardId: string
}) => {

const data = useQuery(api.board.get,{
  id: boardId as Id<"boards">
})

if(!data) return <Info.Skeleton/>

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <OrgHint
      label='Go to boards'
      side='bottom'
      sideOffset={20}
      >

      <Button variant='ghost'
      className='hover:bg-emerald-100'
      asChild
      >
        <Link href={'/dashboard'}>
      <Image 
src={logo}
alt="logo"
width='60'
height='60'
className="-ml-4"
/>
<span className={cn('font-semibold text-black text-xl -ml-2')}>Framework</span>
</Link>
      </Button>
      </OrgHint>

<div className='h-[60%] bg-neutral-500 w-1 rounded-md ml-2 mr-2'/>

 
<RenameModal asChild={true} 
description={data.description}
title={data.title}
id={data._id}
>

      <Button variant={'ghost'} className='font-semibold text-lg'>
        {data.title}
      </Button>
</RenameModal>

<div className='h-[60%] bg-neutral-500 w-1 rounded-md ml-2 mr-2'/>

<Actions
id={data._id}
title={data.title}
side='bottom'
sideOffset={15}
>
<div className="">
<OrgHint
label='Main menu'
side='bottom'
sideOffset={15}
>
  <Button variant={'secondary'}><Menu className='size-6' color='black'/></Button>
</OrgHint>
</div>
</Actions>

    </div>
  )
}

Info.Skeleton = function InfoSkeleton(){
  return(
    <div className='absolute top-2 left-2 bg-white rounded-md  h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='h-full w-full bg-muted-foreground'/>
    </div>
  )
}
