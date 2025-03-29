"use client"
import { RenameModal } from '@/components/ui/modals/rename-modal'
import React, { useEffect,useState } from 'react'

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    
    useEffect(() => {
        setIsMounted(true)
        // return () => setIsMounted(false)
    }, [])
    
    if (!isMounted) return null   
  return (
    <div>
        <RenameModal />
    </div>
  )
}
