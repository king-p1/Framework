"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import logo from '@/public/home.png'

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="   relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]   dark:border-white/[0.2] border-black/[0.1] w-[80%] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
       
       
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={logo}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
         
      </CardBody>
    </CardContainer>
  );
}
