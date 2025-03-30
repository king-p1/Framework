import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OrgHint } from '@/app/dashboard/_components/sidebar/hint'

export const UserAvatar = ({src,name,fallback,borderColor,role}:{
    src?: string,
    role?: string,
    name?: string,
    fallback?: string,
    borderColor?: string,
  
}) => {
  return (
    <OrgHint
    label={`${name||'Member'}, ${role}`}
    side={'bottom'}
    sideOffset={10}

    >

<Avatar className='size-8 border-2'
style={{
    borderColor: borderColor || 'transparent',
    backgroundColor: borderColor || 'transparent',
}}
>
  <AvatarImage src={src} width={70} height={70} />
  <AvatarFallback className='text-xs font-semibold'>{fallback}</AvatarFallback>
</Avatar>
    </OrgHint>
  )
}
