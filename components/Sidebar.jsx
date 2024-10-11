"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlusIcon,
  MessageSquare,
  PanelRightOpen,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { cases } from "@/constant";

export default function Sidebar() {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen max-sm:hidden">
      <div
        className={`
          bg-gray-900 text-white max-md:hidden transition-all duration-300 ease-in-out
          ${isCollapsed ? "hidden" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Button
              className={`w-full justify-start text-white hover:text-white hover:bg-gray-700
                ${isCollapsed ? "px-0 justify-center" : ""}
              `}
              onClick={{}}
            >
              <PlusIcon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">New case</span>}
            </Button>
          </div>

          <ScrollArea className="px-4">
            {cases.map((item) => {
              const fullRoute = `/case/${item.caseId}`;
              const isActive = pathname === fullRoute;

              return (
                <Link
                  href={`/case/${item.caseId}`}
                  className={cn(
                    "w-full flex h-11 px-4 py-2 rounded-md justify-start items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 mb-1",
                    { "bg-gray-700": isActive }
                  )}
                >
                  <MessageSquare className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate flex-1 w-12 overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </ScrollArea>
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
