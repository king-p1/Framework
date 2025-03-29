"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
 
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = ({
  children,
  id,
  title: propT,
  description: propD,
  asChild
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  description: string;
  asChild?: boolean; 
}) => {
  const { isLoading, mutate } = useApiMutation(api.board.update);
  const [title, setTitle] = useState(propT);
  const [description, setDescription] = useState(propD);

  useEffect(() => {
    setTitle(propT);
    setDescription(propD);
  }, [propT, propD]);

 

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: id,
      title,
      description,
    })
      .then(() => {
        toast.success('Board updated successfully.');
      })
      .catch(() => toast.error('Failed to update board'));
  };

  return (
    <Dialog >
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board Properties</DialogTitle>
          <DialogDescription>
            Edit the following board properties.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-8 mt-2">
          <div className="flex flex-col gap-2">
            <Label>Board Title</Label>
            <Input
              disabled={isLoading}
              required
              maxLength={60}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Board Description</Label>
            <Textarea
              disabled={isLoading}
              required
              maxLength={60}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              rows={8}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
