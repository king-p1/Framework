import { cn } from "@/lib/utils";
import { BoardFooterProps } from "@/types";
import { Star } from "lucide-react";

export const BoardFooter = ({
  authorLabel,
  createdAtLabel,
  disable,
  isFavourite,
  onClick,
  title,
}: BoardFooterProps) => {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  }

  return (<div className="relative bg-white p-3" >
<p className="text-[13px] truncate max-w-[calc(100%-20px)]">
    {title}
</p>

<p className="opacity-0 text-[11px] group-hover:opacity-100 text-muted-foreground truncate">{authorLabel}, {createdAtLabel}</p>


<button
disabled={disable} 
className={cn("opacity-0 transition absolute top-3 right-3 hover:text-yellow-300 group-hover:opacity-100 text-muted-foreground truncate",disable && "cursor-not-allowed opacity-75")}
onClick={handleClick}
>
    {/* m */}
    <Star className={cn("size-4 outline-black",isFavourite && "fill-yellow-300 text-yellow-300")} color={isFavourite ? 'yellow' : 'black'}/>
</button>

  </div>)
};
