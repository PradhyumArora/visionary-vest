import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { TrendingInfluencers } from "@/components/TrendingInfluencers";

export default function Home() {
  return (
    <div className="h-full">
      <Hero />
      <HowItWorks />
      <TrendingInfluencers />
    </div>
  );
}
