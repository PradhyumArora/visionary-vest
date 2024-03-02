import { HoverEffect } from "./ui/card-hover-effect";

export const projects = [
  {
    title: "1. Sign Up & Explore",
    description:
      "Register and browse influencers across niches to match your investment preferences.",
    link: "/",
  },
  {
    title: "2. Learn About Creators",
    description:
      "Access detailed profiles, including growth trends and engagement metrics.",
    link: "/",
  },
  {
    title: "3. Make Your Investment",
    description:
      "Select an amount to invest in your chosen creator, pooling funds for growth.",
    link: "/",
  },
  {
    title: "4. Track Creator Growth",
    description:
      "Monitor your creator's audience and engagement increases in real-time.",
    link: "/",
  },
  {
    title: "5. Receive Earnings",
    description:
      "Earn a share of the creator's revenue as they grow and secure deals.",
    link: "/",
  },
  {
    title: "6. Reinvest or Withdraw",
    description:
      "Opt to reinvest your profits or withdraw them as per your financial strategy.",
    link: "/",
  },
];

const HowItWorks = () => {
  return (
    <section>
      <h1 className="text-center text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pt-8 pb-6">
        How it works?
      </h1>
      <div className="container">
        <HoverEffect items={projects} />
      </div>
    </section>
  );
};

export default HowItWorks;
