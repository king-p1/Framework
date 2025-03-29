import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { OrgHintProps } from '@/types'
  
export const OrgHint = ({label,children,side,align,sideOffset,alignOfffset}:OrgHintProps) => {
  return (
    <TooltipProvider >
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent 
      className='text-white bg-black border-black'
      align={align}
      side={side}
      alignOffset={alignOfffset}
      sideOffset={sideOffset}
      >
        <p className='font-semibold capitalize'>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  
  )
}
