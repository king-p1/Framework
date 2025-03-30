"use client"

import { OrgHint } from "@/app/dashboard/_components/sidebar/hint"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

export const ToolBtn = ({label,icon:Icon,isActive,isDisabled,onClick}:{
    label: string,
    icon: LucideIcon,
    isActive?: boolean,
    isDisabled?: boolean,
    onClick: () => void,
}) => {
  return (
    <div>
        <OrgHint label={label} side="top"  sideOffset={14}>
            <Button
                variant={isActive ? "secondary" : "ghost"}
                disabled={isDisabled}
                onClick={onClick}
            >
                <Icon  size="16" color="black" />
            </Button>
        </OrgHint>
    </div>
  )
}
