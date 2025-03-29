import { ReactNode } from "react";
import { Id } from "./convex/_generated/dataModel";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export interface ConvexClientProviderProps {
  children: ReactNode;
}
export interface ChildrenProps {
  children: ReactNode;
}
export interface ActionsProps {
  children: ReactNode;
  side?:DropdownMenuContentProps["side"];
  sideOffset?:DropdownMenuContentProps["sideOffset"];
  id:string;
  title:string;
  description?:string;
}
export interface OrgItemProps {
  id: string;
  imageUrl: string;
  name: string;
}
export interface BoardCardProps {
  id: Id<"boards">;
  imageUrl: string;
  title: string;
  description?: string;
  authorName: string;
  authorId: string;
  OrgId: string;
  isFavourite: boolean;
  createdAt: number;
}

export interface BoardFooterProps {
  title: string;
  description?: string;
  authorLabel: string;
  isFavourite: boolean;
  createdAtLabel: string;
  disable: boolean;
  onClick:()=>void;
}


export interface DashboardProps {
  searchParams: { search?: string; favourites?: string };
}

export interface BoardIdProps {
  params: { boardId: string;  };
}

export interface CanvasProps {
   boardId: string;  
}
export interface BoardListProps {
  OrgId: string;
  query: { search?: string; favourites?: string };
}
export interface OrgHintProps {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOfffset?: number;
}
