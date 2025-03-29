"use client"

import { CreateOrganization } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { OrgHint } from "./hint"
  
export const NewButton = () => {
  return (
    <Dialog>
  <DialogTrigger>
   <OrgHint label="Create an organisation" side="right" align="start" sideOffset={18}>
    <div className="aspect-square flex items-center justify-center  bg-neutral-400 rounded-sm">
        <Plus className="text-white opacity-60 hover:opacity-100 transition size-7"/>
    </div>
   </OrgHint>

  </DialogTrigger>

  <DialogContent className="bg-transparent border-none p-0">
    <DialogHeader>
        <DialogTitle className="hidden"></DialogTitle>
    </DialogHeader>
    <div className="w-full flex items-center justify-center">
    <CreateOrganization />
    </div>
  </DialogContent>
</Dialog>

  )
}
