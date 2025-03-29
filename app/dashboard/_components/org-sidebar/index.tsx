"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export const OrgSidebar = () => {
  const searchParams = useSearchParams();

  const favourites = searchParams.get("favourites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href={"/"}>
        <div className="flex items-center gap-x-2">
          <Image src="/framework-logo.png" alt="logo" width={60} height={60} />
          <span className={cn("font-semibold text-2xl")}>Framework</span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1.5px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />

      <div className="space-y-4 w-full">
        <Button
          asChild
          size={"lg"}
          variant={favourites ? "outline" : "secondary" }
          className="w-full justify-start font-normal px-2"
          >
          <Link href={"/dashboard"}>
            <LayoutDashboard className="size-4" color="grey" />
            All Boards
          </Link>
        </Button>

        <Button
          variant={favourites ? "secondary" : "outline"}
          asChild
          size={"lg"}
          className="w-full justify-start font-normal px-2"
        >
          <Link
            href={{
              pathname: "/dashboard",
              query: { favourites: true },
            }}
          >
            <Star className="size-4" color="yellow" />
            Favourite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
