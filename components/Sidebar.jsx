// components/Sidebar.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlusIcon,
  PanelRightOpen,
  PanelLeftOpen,
  HomeIcon,
  MessageCircleWarning,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarListItem from "./SidebarListItem";
import Image from "next/image";

const sidebarLinks = [
  { href: "", icon: HomeIcon, label: "Home" },
  { href: "/case/new", icon: PlusIcon, label: "New Case" },
  { href: "/case", icon: MessageCircleWarning, label: "Cases" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen max-sm:hidden">
      <div
        className={`
          bg-background  min-h-0 border-r max-md:hidden transition-all duration-300 ease-in-out
          ${isCollapsed ? "hidden" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Image
              src="/images/logo2.png"
              width={200}
              height={200}
              alt="Logo"
              className="dark:hidden"
            />
            <Image
              src="/images/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="dark:block hidden"
            />
          </div>

          <div className="p-4">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarListItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`absolute max-md:hidden max-md:left-1 top-4 dark:text-white ${
          isCollapsed ? "left-4" : "left-64"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="text-gray-500" />
        ) : (
          <PanelRightOpen className="text-gray-500" />
        )}
      </Button>
    </div>
  );
}
