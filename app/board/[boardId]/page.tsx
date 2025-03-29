import React from 'react'
import { Canvas } from './_components/canvas'
import { BoardIdProps } from '@/types'
import { Room } from './_components/room'

const BoardPage = ({params}:BoardIdProps) => {
  return (
    <Room roomId={params.boardId}>
    <Canvas boardId={params.boardId}/>
    </Room>
  )
}

export default BoardPage