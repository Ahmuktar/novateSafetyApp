"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, MessageSquare, PlusIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarLinks } from "@/constant";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div>
          <div className="flex flex-col h-full">
            <div className="my-5">
              <Button
                className="w-full flex text-white hover:text-white hover:bg-gray-700"
                onClick={{}}
              >
                <Link href="/case/new" className="w-full flex">
                  <PlusIcon className="h-5 w-5" />
                  <span className="ml-2">New case</span>
                </Link>
              </Button>
            </div>
            <ScrollArea>
              {/* {sidebarLinks.map((item) => {
                const fullRoute = `/case/${item.caseId}`;
                const isActive = pathname === fullRoute;

                return (
                  <Link
                    href={`/case/${item.caseId}`}
                    className={cn(
                      "w-full flex h-11 px-4 py-2 rounded-md justify-start items-center gap-2 dark:text-gray-400 text-gray-800 hover:text-white hover:bg-gray-700 mb-1",
                      { "bg-gray-700 dark:text-white text-white": isActive }
                    )}
                  >
                    <MessageSquare className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate flex-1 w-12 overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                  </Link>
                );
              })} */}
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
