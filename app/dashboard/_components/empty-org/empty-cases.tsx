"use client"
import Image from "next/image"
import retrySearch from '@/public/retry-search.svg'
import noBoards from '@/public/no-boards.svg'
import noFavourites from '@/public/no-favourite.svg'
import { Button } from "@/components/ui/button"
import { Brush } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export const Emptysearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <Image src={retrySearch} alt="retry search" width={250} height={250} />
        <p className="text-gray-600 mt-4 text-2xl font-semibold">No results found for your search.</p>
        <p className="text-muted-foreground mt-2 text-sm">Try searching again or check your spelling.</p>
        
    </div>
  )
}
export const EmptyFav = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <Image src={noFavourites} alt="retry search" width={250} height={250} />
        <p className="text-gray-600 mt-4 text-2xl font-semibold">No favourites found...</p>
        <p className="text-muted-foreground mt-2 text-sm">Try adding a board.</p>
        
    </div>
  )
}

export const EmptyBoard = () => {

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
  router.push(`board/${id}`)

})
.catch(()=> toast.error('Failed to create new Board'));

  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <Image src={noBoards} alt="retry search" width={250} height={250} />
        <p className="text-gray-600 mt-4 text-2xl font-semibold">No boards found.</p>
        <Button className="flex items-center justify-center gap-2 mt-2"
        onClick={handleCreate}
        disabled={isLoading}
        >
          {/* TODO when create board is clicked a modal opens and you can input a title and description for the new board and maybe upload a pic*/}
            <Brush color="white"/>
            Create a new board
        </Button>
    </div>
  )
}
