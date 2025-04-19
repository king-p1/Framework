import { Navbar } from "@/components/navigation/navbar";
import { HomePageComponents } from "@/components/ui/home";
 
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Home = async() => {

  const user = await currentUser()

  if (user) redirect('/dashboard')
    
  return (
    <div className="flex flex-col ">
<Navbar/>
 
<div className="-mt-16">
<HomePageComponents/>
</div>
     
      
    </div>
  );
};

export default Home;



