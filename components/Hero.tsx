import React from "react";
import GridLayout from "./GridLayout";
import { Button } from "./ui/button";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Hero = () => {
  return (
    <GridLayout>
      <div
        className={
          "container h-[65rem] flex flex-col justify-start items-center"
        }
      >
        <h2 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pt-8 pb-6">
          Invest Creatively, <br /> Live Prosperously
        </h2>
        <p className="text-zinc-300 mb-8 md:w-[40%] text-center z-50">
          Unlock the potential of your favorite creator&apos;s journey and watch
          your wealth flourish alongside their success.
        </p>
        <div className="flex">
          <Button className="z-50 mx-4">Get Started</Button>
          <Button className="z-50 mx-4 bg-transparent" variant="outline">
            Invest Now
          </Button>
        </div>

        <ContainerScroll />

        {/* <div className="bg-red-700 h-[20rem] w-[30rem]"></div> */}
      </div>
    </GridLayout>
  );
};

export default Hero;
