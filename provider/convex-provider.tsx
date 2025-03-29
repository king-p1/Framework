"use client"
import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk  } from "convex/react-clerk";
import { AuthLoading,Authenticated,ConvexReactClient,Unauthenticated} from "convex/react";
import { ConvexClientProviderProps } from "@/types";
import Loader from "@/components/ui/loader";
import SignInPage from "@/app/(Auth)/sign-in/[[...sign-in]]/page";
 
const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexURL)

export const ConvexClientProvider = ({children}:ConvexClientProviderProps) => {
  return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <Authenticated>
          {children}
          </Authenticated>
          <Unauthenticated>
             <SignInPage/> 
             {/* TODO change the above to a dtandalone and not the route */}
          </Unauthenticated>
          <AuthLoading>
<Loader/>
          </AuthLoading>
        </ConvexProviderWithClerk>
  )
}
