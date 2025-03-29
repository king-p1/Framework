import { SignedIn,UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import logo from '@/public/framework-logo.png'

export const Navbar = () => {
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
{/* <h2>Framework</h2> */}
</Link>

        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>
  )
}
