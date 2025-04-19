import { ChildrenProps } from '@/types'
 
import { ConvexClientProvider } from "@/provider/convex-provider";
const DashboardLayout = async({children}:ChildrenProps) => {
 
  return (
    <ConvexClientProvider>
        {children} 
    </ConvexClientProvider>
  )
}

export default DashboardLayout