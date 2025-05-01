"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
export const ConfimModal = ({children,onConfirm,disabled,header,desc}:{
    children: React.ReactNode
    header?: string
    desc?: string
    disabled: boolean
    onConfirm: ()=>void
}) => {

    const handleConfirm = () => {
        onConfirm()
    }

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
    <AlertDialogContent
      onClick={(e) => e.stopPropagation()}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>{header}</AlertDialogTitle>
        <AlertDialogDescription>
         {desc}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            handleConfirm();
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }}
        >Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}
