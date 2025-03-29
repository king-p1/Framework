"use client"
import { BoardListProps } from "@/types"
import { EmptyBoard, EmptyFav, Emptysearch } from "../empty-org/empty-cases"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { BoardCard } from "./board-card"
import { NewBoardBtn } from "./new-btn"

export const BoardList = ({OrgId,query}:BoardListProps) => {
  
    const data = useQuery(api.boards.getBoards,{OrgId,...query})

    console.log(data)


    if(data === undefined) {
        return(
            <div>
            <h2 className={"text-3xl font-semibold p-2"}>{query.favourites?'Favourite Boards':'Team Boards'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
<NewBoardBtn OrgId={OrgId} disabled={true} />
{/* TODO consider rewriting this to dispaly based off how many the user has */}
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
           <BoardCard.Skeleton/>
            </div>
            </div>
    )}

    if(!data?.length && query.search) {
        return (
            <Emptysearch/>
        )
    }
   
    if(!data?.length && query.favourites) {
        return (
            <EmptyFav/>
        )
    }
   
    if(!data?.length) {
        return (
            <EmptyBoard/>
        )
    }
  
    return (
    <div>
        <h2 className={"text-3xl font-semibold p-2"}>{query.favourites?'Favourite Boards':'Team Boards'}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">

<NewBoardBtn OrgId={OrgId} disabled={false} />

{data?.map(({OrgId,_creationTime,_id:id,authorId,authorName,description,imageUrl,title,isFavourite})=>(
<BoardCard
isFavourite={isFavourite}
key={id}
id={id}
OrgId={OrgId}
createdAt={_creationTime}
authorId={authorId}
authorName={authorName}
description={description}
imageUrl={imageUrl}
title={title}
/>
))}
    </div>
    
    </div>

  )
}
