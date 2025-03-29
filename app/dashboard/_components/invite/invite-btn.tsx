import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent,DialogTitle } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";
export const InviteBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-2 items-center justify-center "
        >
          <Plus className="size-4" color="black" />
          Invite Collaborators
        </Button>
      </DialogTrigger>
      <DialogContent  className='p-0 bg-transparent border-none max-w-[880px]'>
      <DialogTitle></DialogTitle>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
