"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

export const ContainerScroll = () => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] w-full md:h-[80rem] flex items-center justify-center absolute p-2 md:p-20 mt-14"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          //   users={users}
        />
      </div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  const users = [
    {
      name: "John Doe",
      designation: "CEO",
      badge: "Pro",
      image: "/influencers/1.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/2.png",
    },
    {
      name: "John Doe",
      designation: "CEO",
      badge: "Pro",
      image: "/influencers/3.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/4.png",
    },
    {
      name: "John Doe",
      designation: "CEO",
      badge: "Pro",
      image: "/influencers/5.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/6.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/7.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/8.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/9.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/10.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/11.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/12.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/13.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/14.png",
    },
    {
      name: "Jane Doe",
      designation: "CTO",
      badge: "Pro",
      image: "/influencers/7.png",
    },
  ];
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden p-4">
        {users.map((user, idx: number) => (
          <motion.div
            key={`user-${idx}`}
            className="bg-white rounded-md cursor-pointer relative"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className="absolute text-gray-700 top-2 right-2 rounded-full text-xs font-bold bg-white px-2 py-1">
              {user.badge}
            </div>
            <Image
              src={user.image}
              className="rounded-tr-md rounded-tl-md text-sm"
              alt="thumbnail"
              width={170}
              height={170}
            />
            <div className="p-4">
              <h1 className="font-semibold text-sm text-gray-700">
                {user.name}
              </h1>
              <h2 className=" text-xs text-gray-700">{user.designation}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
