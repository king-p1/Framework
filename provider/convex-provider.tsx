"use client"
import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk  } from "convex/react-clerk";
import { AuthLoading,Authenticated,ConvexReactClient,Unauthenticated} from "convex/react";
import { ConvexClientProviderProps } from "@/types";
import Loader from "@/components/ui/loader";
import SignInPage from "@/components/ui/sign-in";
 
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
          </Unauthenticated>
          <AuthLoading>
<Loader/>
          </AuthLoading>
        </ConvexProviderWithClerk>
  )
}
