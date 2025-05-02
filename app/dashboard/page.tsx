"use client"
import React  from 'react'
import { EmptyOrg } from './_components/empty-org/empty-org'
import { useOrganization } from '@clerk/nextjs'
import { DashboardProps } from '@/types'
import { BoardList } from './_components/board/board-list'

const Dashboard = ({searchParams}:DashboardProps) => {
  const { organization } = useOrganization()

  // const query = React.use(searchParams)

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-3 -mt-3 '>
      {!organization ? (
        <EmptyOrg/>
):(
  <BoardList
  OrgId={organization.id}
  // query={query}
  query={searchParams}
  />
)}
    </div>
  )
}

export default Dashboard