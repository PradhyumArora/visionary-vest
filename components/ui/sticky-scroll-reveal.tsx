"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
  }[];
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });

  const influencers = [
    "url('/influencers/9.png')",
    "url('/influencers/13.png')",
    "url('/influencers/3.png')",
    "url('/influencers/14.png')",
  ];

  return (
    <motion.div
      style={{
        scrollbarWidth: "none" /* For Firefox */,
        msOverflowStyle: "none" /* For Internet Explorer and Edge */,
      }}
      className="h-[30rem] w-full overflow-y-auto flex justify-between relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-4xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-xl mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: influencers[activeCard % influencers.length],
        }}
        className="hidden lg:block h-[100%] w-[40%] rounded-md bg-white sticky top-10 overflow-hidden"
      ></motion.div>
    </motion.div>
  );
};
