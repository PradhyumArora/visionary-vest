import BarChart from '@/components/BarChart';
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button';
import Card, {  CardContent, CardProps } from '@/components/ui/card';
import { EvervaultCard } from '@/components/ui/evervault-card';
import {  CoinsIcon, CreditCard, DollarSign, Users } from 'lucide-react';
import React from 'react'

const cardData: CardProps[] = [
  {
    label: "Total Invested",
    amount: "$2000",
    discription: "",
    icon: DollarSign
  },
  {
    label: "Total Returns",
    amount: "$2350",
    discription: "+18% from last month",
    icon: Users
  },
  {
    label: "XIRR",
    amount: "19%",
    discription: "+19% from last month",
    icon: CreditCard
  },
  {
    label: "Available Funds",
    amount: "$5000",
    discription: "Invest in Top Creators",
    icon: CoinsIcon
  },
];
const page = () => {
  return (
    <div className='flex flex-col gap-5 w-full min-h-screen'>
        <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4'> 
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
        </section>
        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>

        
        </section>
    </div>
  )
}

export default page
