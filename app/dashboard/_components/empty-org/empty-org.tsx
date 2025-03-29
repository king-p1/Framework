import Image from 'next/image'
import React from 'react'
import logo from'/public/empty-org.svg'
import { CreateOrganization } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Dialog,DialogTrigger,DialogContent,DialogTitle } from '@/components/ui/dialog'
import { Brush } from 'lucide-react'
export const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image
        src={logo}
        alt='Empty Organization'
        width={250}
        height={250}
        />
        <h2 className="text-2xl font-semibold mt-6">
            Welcome To Framework
        </h2>
        <p className="mt-2 text-sm">Create an organization</p>
        <div className="mt-6">
        <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center justify-center"
          size={'lg'}
        >
          <Brush className="size-4" color="white" />
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent  className='p-0 bg-transparent border-none max-w-[480px]'>
      <DialogTitle></DialogTitle>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
        </div>
    </div>
  )
}
