"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Alex Green",
    description:
      "A vibrant travel influencer with a passion for eco-friendly adventures. Alex shares sustainable travel tips, hidden gems across the globe, and guides on how to travel responsibly.",
  },
  {
    title: "Jordan Sparks",
    description:
      "Fitness and wellness guru known for motivational content and practical health advice. Jordan offers workout plans, nutritional tips, and mindfulness techniques to inspire a balanced lifestyle.",
  },
  {
    title: "Mia Lin",
    description:
      "A tech enthusiast and gadget reviewer, Mia explores the latest in technology, from cutting-edge smartphones to innovative home gadgets, providing insightful reviews and tech tips.",
  },
  {
    title: "Charlie Reed",
    description:
      "An up-and-coming food critic and chef, Charlie delights followers with mouth-watering recipes, dining experiences, and culinary tours, focusing on both high-end cuisine and street food treasures.",
  },
];
export function TrendingInfluencers() {
  return (
    <section className="min-h-screen">
      <h1 className="text-center text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pt-8 pb-6">
        Our Trending Influencers
      </h1>
      <div className="p-10 flex container justify-between">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
