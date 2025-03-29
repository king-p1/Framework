import React from 'react'
import { NewButton } from './new-button'
import { OrgList } from './org-list'

export const Sidebar = () => {
  return (
    <aside className='fixed z-[1] left-0 bg-neutral-300 h-full w-[60px] p-4 space-y-2.5'>
<NewButton/>
<OrgList/>

{/* <div className="bottom-0">
  user TODO: add settings options
</div> */}
    </aside >
  )
}
