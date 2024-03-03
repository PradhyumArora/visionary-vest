"use client";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import {TrendingInfluencers} from "@/components/TrendingInfluencers";
import {useEffect} from "react";
import { useTheme } from "next-themes"


export default function Home() {
    //     const { setTheme } = useTheme()
    // useEffect(() => {
    //     setTheme("dark")
    // }, []);

  return (
    <div className="h-full">
      <Hero />
      <HowItWorks />
      <TrendingInfluencers />
    </div>
  );
}
