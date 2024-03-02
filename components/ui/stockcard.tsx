/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


export type CardProps = {
  name: String;
  quantity: number;
  current: number;
  invested: number;
};

export default function SCard(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-xl font-semibold">{props.name}</p>
        {/* icon */}
        <div className="flex flex-col gap-6">
            <p className="text-xs text-emerald-300">{props.current}</p>
        </div>
      </section>
      <section className="flex justify-between gap-1">
      <h2 className="text-2xl font-semibold">{props.quantity}</h2>
      <p className="text-xs text-white-500">{props.invested}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 p-5 ",
        props.className
      )}
    />
  );
}