/** @format */
"use client";

import {useEffect, useState} from "react";
// import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  Settings,
  ChevronRight,
  GitGraph,
  User
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./nav";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
    let mobileWidth = false;
  const onlyWidth = useWindowWidth();
  useEffect(() =>{
      mobileWidth = onlyWidth < 768;
  }, [])


  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[90px] w-auto border-r px-3 pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "John Doe",
            href: "/dashboard/settings",
            icon: User,
            variant: "ghost"
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Portfolio",
            href: "/dashboard/portfolio",
            icon: GitGraph,
            variant: "ghost"
          },
          {
            title: "Orders",
            href: "/dashboard/orders",
            icon: ShoppingCart,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}