import { BoardCardProps } from "@/types";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { BoardFooter } from "./board-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import {  MoreHorizontal, SquarePen, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RenameModal } from "@/components/ui/modals/rename-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
export const BoardCard = ({
  createdAt,
  OrgId,
  authorId,
  authorName,
  id,
//   imageUrl,
  isFavourite,
  title,
  description,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const { isLoading:loadFav,mutate:onFav } = useApiMutation(api.board.favourite);
  const { isLoading:loadUnFav,mutate:onUnFav } = useApiMutation(api.board.unFavourite);

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

const toggleFav = () =>{
    if(isFavourite){
        onUnFav({id, orgId: OrgId})
        .catch(() => toast.error('Failed to remove from favorites'))
    } else {
        onFav({id, orgId: OrgId})
        .catch(() => toast.error('Failed to add to favorites'))
    }
}


  return (
<div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden opacity-70 hover:opacity-100">
        <div className="relative flex-1 bg-neutral-400/20 justify-between ">
          {/* <Image
src={imageUrl}
fill 
    alt={title}
    className="object-fit"
/> */}
 <RenameModal
    id={id}
    title={title}
    description={description!}
    >
    <Button variant={'secondary'} className='absolute top-1 left-1 px-3 py-2 outline-none group-hover:opacity-100 opacity-0 transition border-none z-50'
    >
            <SquarePen  className='opacity-75 hover:opacity-100 ' color='black'                 
            />
        </Button>
    </RenameModal>


          <Actions id={id} title={title} side="right" description={description}>
            <Button
              className="absolute top-1 right-1 px-3 py-2 outline-none group-hover:opacity-100 opacity-0 transition border-none "
              variant="secondary"
            >
              <MoreHorizontal
                color="black"
                className="opacity-75 hover:opacity-100"
              />
            </Button>
          </Actions>

          <Button asChild className="flex justify-center items-center   relative left-[40%] top-[35%] outline-none group-hover:opacity-80 opacity-0 transition border-none"
          variant='secondary'
          size='icon'
          >

          <Link href={`/board/${id}`} className="opacity-50 hover:opacity-100" >
           <View color="black"/>
        </Link>
          </Button>
        </div>


        <BoardFooter
          isFavourite={isFavourite}
          title={title}
          description={description}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disable={loadFav||loadUnFav}
          onClick={toggleFav}
          />
      </div>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="  aspect-[100/127]   rounded-lg  overflow-hidden ">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
