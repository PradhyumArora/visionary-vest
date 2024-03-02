import React from "react";
import Card, { CardContent, CardProps } from "@/components/ui/card";
import SCard from "@/components/ui/stockcard";
import { ArrowUpDownIcon, DollarSign, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const cardData: CardProps[] = [
  {
    label: "Total Invested",
    amount: "$2000",
    discription: "",
    icon: DollarSign,
  },
  {
    label: "Total Returns",
    amount: "$2350",
    discription: "+18% from last month",
    icon: Users,
  },
  {
    label: "1D Return",
    amount: "$23",
    discription: "+0.01% from Yesterday",
    icon: ArrowUpDownIcon,
  },
];
const invoices = [
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
  {
    symbol: "SJVN-EQ",
    totalqty: 100,
    buyprice: 1000.76,
    buyvalue: 100076.00,
    curvalue: 120000.00,
    profitloss: 110034,
  },
]
const page = () => {
  const totalBuyValue = invoices.reduce((total, invoice) => total + invoice.buyvalue, 0);
  const totalCurValue = invoices.reduce((total, invoice) => total + invoice.curvalue, 0);
  const PL = invoices.reduce((total, invoice) => total + (invoice.curvalue-invoice.buyvalue), 0);
  return (
    <div className="flex flex-col gap-5 w-full min-h-screen">
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
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
      <CardContent>
        <h2 className="text-stone-200 text-5xl ">
          Holding Details
        </h2>
        <section className="w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 rounded">
          <Separator />
          {/* {stockData.map((d) => (
            <>
              <SCard
                key={Date.now()}
                name={d.name}
                quantity={d.quantity}
                current={d.current}
                invested={d.invested}
              />
              <Separator />
            </>
          ))} */}<Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Total qty.</TableHead>
          <TableHead>Buy Price</TableHead>
          <TableHead>Buy Val.</TableHead>
          <TableHead>Cur. Val.</TableHead>
          <TableHead>P/L</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={Date.now()}>
            <TableCell className="font-medium">{invoice.symbol}</TableCell>
            <TableCell>{invoice.totalqty}</TableCell>
            <TableCell>{invoice.buyprice}</TableCell>
            <TableCell>{invoice.buyvalue}</TableCell>
            <TableCell>{invoice.curvalue}</TableCell>
            <TableCell className="text-emerald-400"> + {invoice.curvalue - invoice.buyvalue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="">
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>{totalBuyValue}</TableCell>
          <TableCell>{totalCurValue}</TableCell>
          <TableCell className="">{PL}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </section>
      </CardContent>
    </div>
  );
};

export default page;
