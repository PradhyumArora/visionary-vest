import { GitGraph, Plus, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div
      className="
        hidden 
        md:flex 
        flex-col 
        gap-y-2 
        
        h-[700px]  //coz height was not setting to full 
        w-[300px]
        p-2
      "
    >
      <div
        className="bg-slate-800
       rounded-lg
       h-full
       w-full"
      >
        <div className="flex flex-col gap-y-4 px-5 py-4">
          <Link
            href="/dashboard/account"
            className="  flex  flex-row h-auto items-center  w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1"
          >
            <UserIcon />
            <p className="truncate w-full"> My account</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-4 px-5 py-4">
          <Link
            href="/dashboard/portfolio"
            className="  flex  flex-row h-auto items-center  w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1"
          >
            <GitGraph />
            <p className="truncate w-full"> My Portfolio</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-4 px-5 py-4">
          <Link
            href="/dashboard/portfolio"
            className="  flex  flex-row h-auto items-center  w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1"
          >
            <Plus />
            <p className="truncate w-full"> Add Funds</p>
          </Link>
        </div>
        <div className="flex flex-col gap-y-44 px-5 py-4">
          <Link
            href="/dashboard/portfolio"
            className="  flex  flex-row h-auto items-center  w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1"
          >
            <GitGraph />
            <p className="truncate w-full"> Settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
