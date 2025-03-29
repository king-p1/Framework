"use client";
import { cn } from "@/lib/utils";
import { OrgItemProps } from "@/types";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { OrgHint } from "./hint";

export const OrgItem = ({ id, imageUrl, name }: OrgItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <OrgHint
        label={name}
        side="right"
        align="start"
        sideOffset={18}
      >
        <Image
          fill
          className={cn(
            "rounded-full cursor-pointer opacity-75 hover:opacity-100",
            isActive && "opacity-100 border-2 border-neutral-700"
          )}
          onClick={onClick}
          src={imageUrl}
          alt={name}
        />
      </OrgHint>
    </div>
  );
};
