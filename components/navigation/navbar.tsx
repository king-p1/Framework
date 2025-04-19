import { SignedIn,UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import logo from '@/public/framework-logo.png'
import { currentUser } from "@clerk/nextjs/server"
import { Button } from "../ui/button"
import { LogIn } from "lucide-react"

export const Navbar = async() => {

  const user = await currentUser()


  return (
    <div className="flex w-full justify-between p-3">
<Link href={'/'} className="flex items-center">
<Image 
src={logo}
alt="logo"
width='80'
height='80'
className="-ml-4"
/>
<h2 className="font-semibold text-xl -ml-3">Framework</h2>
</Link>

{user? (
        <SignedIn>
        <UserButton />
      </SignedIn>

) :(
<Button className="text-white flex gap-3 items-center" 
asChild
>
  <Link href={'/dashboard'}>
  <LogIn className="size-5"/>
  Sign In
  </Link>
</Button>
)}
        </div>
  )
}
