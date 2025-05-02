/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { useOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export const NewBoardBtn = ({OrgId,disabled}:{
    OrgId: string, disabled?: boolean
}) => {

    const {organization} = useOrganization()
    const router = useRouter()

    const { isLoading,mutate} = useApiMutation(api.board.create)
  
    const handleCreate = ()=>{
      if(!organization) return
  
      mutate({
        orgId:organization?.id,
        title: "Untitled Board",
        description: "New Collaborative Board"
      })
  .then((id)=>{
    toast.success('Board created successfully.')
    router.push(`/board/${id}`)
  })
  .catch(()=> toast.error('Failed to create new Board'));
  
    }


  return (
    <Button 
    disabled={disabled}
    onClick={handleCreate}
className={cn('col-span-1 aspect-[100/127] rounded-lg flex flex-col items-center justify-center py-6 h-full hover:opacity-50 opacity-80 hover:cursor-pointer')}
    >
        <Plus color='white' className='size-20' />
        <p className='text-lg font-normal'>New Board</p>
    </Button>
  )
}
