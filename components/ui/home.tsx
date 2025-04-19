"use client"
import { motion } from "motion/react";
import { ThreeDCardDemo } from "./threeD";

 


export const HomePageComponents =()=> {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl  text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Collaborate  visually  in real-time  with Framework"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Transform your team&apos;s ideas into visual masterpieces with our digital canvas designed for seamless creativity and productivity. Organize thoughts, map workflows, and make decisions together—all in real-time, regardless of where your team is located.
        </motion.p>
        
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-purple-600 px-6 py-2 font-medium  transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-purple-600 dark:bg-white  text-cyan-300 dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-cyan-300 bg-white px-6 py-2 font-medium text-purple-600  transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200 hover:border-purple-500 hover:text-cyan-400 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-8 rounded-3xl   border-neutral-200       dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl   border-gray-300 dark:border-gray-700">
           
<ThreeDCardDemo/>
          </div>
        </motion.div>
      </div>


<div className="-mb-8   flex w-full justify-between items-center p-3">

<p>Framework. Opaulo inc</p>

<p className="">&copy; 2025. All rights reserved.</p>

</div>

    </div>
  );
}

 
