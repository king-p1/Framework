import { ChildrenProps } from '@/types'
import { Sidebar } from './_components/sidebar'
import { OrgSidebar } from './_components/org-sidebar'
import { Navbar } from './_components/navbar/navbar'
 
import { ConvexClientProvider } from "@/provider/convex-provider";
const DashboardLayout = async({children}:ChildrenProps) => {
 
  return (
    <ConvexClientProvider>
    <main className='h-full'>
        <Sidebar/>
        <div className="pl-[60px] h-full">
            <div className="flex gap-x-3 h-full">
<OrgSidebar/>
<div className="h-full flex-1">
<Navbar/>
        {children}
</div>
            </div>
        </div>
    </main>
    </ConvexClientProvider>
  )
}

export default DashboardLayout