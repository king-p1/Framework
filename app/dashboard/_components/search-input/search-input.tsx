"use client";

import { useRouter } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [debouncedVal] = useDebounceValue(value,500);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
  }

  useEffect(() => {
    if (!debouncedVal) return;
    
    const url = qs.stringifyUrl({
      url: '/dashboard',
      query: { search: debouncedVal },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedVal, router]);

  return (
    <div className=" w-full relative">
      <Search
        className="absolute top-1/2 left-3 size-4 transform text-muted-foreground -translate-y-1/2"
        color="black"
      />
      <Input placeholder="Search..." className="w-full pl-9 max-w-[516px]" 
      onChange={handleChange}
      value={value}
      />
    </div>
  );
};
