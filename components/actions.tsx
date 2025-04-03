import { ActionsProps } from '@/types'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link2,  Sparkles,  Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { ConfimModal } from './ui/modals/confim-modal'
import { Button } from './ui/button'
import { partyModeAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { Switch } from './ui/switch'
import { usePathname } from 'next/navigation'

export const Actions = ({children,title,id,side,sideOffset}:ActionsProps) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [partyMode, setPartyMode] = useAtom(partyModeAtom)

    const pathName = usePathname()
    const isOnBoardPath = pathName === '/board' || pathName.startsWith('/board/')

       
    const togglePartyMode = () => {
      setPartyMode(!partyMode)
      toast.success(partyMode ? 'Party mode disabled' : 'Party mode enabled!')
  }

//TODO look for how to refactor this onCopy when in board and only show Party mode when in board route

    const onCopyLink = () =>{
        navigator.clipboard.writeText(`${window.location.href}/board/${id}`).then(() => toast.success('Link copied successfully'))
        .catch(() => toast.error('Failed to copy link'))
    }

    const {organization} = useOrganization()


    const { isLoading,mutate} = useApiMutation(api.board.remove)
  
    const handleDelete = ()=>{
      if(!organization) return
  
      mutate({id})
  .then(()=>{
    toast.success(`${title} deleted successfully.`)
  })
  .catch(()=> toast.error(`Failed to delete ${title}`));
  
    }


  return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
  <DropdownMenuTrigger asChild  >{children}</DropdownMenuTrigger>
  <DropdownMenuContent 
  side={side}
  sideOffset={sideOffset}
  className='w-60'
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();  // Add this line
  }}  >
    <DropdownMenuLabel>Board Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem className=''
    onClick={onCopyLink}
    >
        <Button variant={'ghost'} className='flex gap-2 w-full justify-start items-center '
    >
            <Link2 className='size-4 -ml-2 ' color='black'/>
            <h2 className='font-semibold'>Copy Link</h2>
        </Button>
    </DropdownMenuItem>
   

   

    <ConfimModal
    header={`Delete ${title}`}
    desc={`This will delete ${title} and all of its contents.`}
    onConfirm={handleDelete}
    disabled={isLoading}
    >
    <Button variant={'ghost'} className='flex gap-2 w-[97%] justify-start p-4  items-center'
    >

        <Trash2 className='size-4  ' color='black'/>
        <h2 className='font-semibold'>Delete Board</h2>
    </Button>
        </ConfimModal>

        {isOnBoardPath && (
          

        <DropdownMenuItem 
                    className='flex items-center justify-between px-3 py-2 cursor-default'
                    onClick={(e) => e.preventDefault()}
                >
                    <div className='flex items-center gap-2'>
                        <Sparkles className='size-4' color={partyMode ? 'gold' : 'black'}/>
                        <span className='font-semibold'>Party Mode</span>
                    </div>
                    <Switch 
                        checked={partyMode} 
                        onCheckedChange={togglePartyMode}
                    />
                </DropdownMenuItem>
        )}
                

    
  </DropdownMenuContent>
</DropdownMenu>

  )
}
