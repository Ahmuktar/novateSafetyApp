"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  BookOpenIcon,
  SettingsIcon,
  LogInIcon,
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <nav className="border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                {/* <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                </Button> */}
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col flex-1">
                  <ul className="flex flex-col gap-4 mt-8">
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        <BookOpenIcon className="mr-2 h-4 w-4" />
                        Documentation
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Safety App
              </span>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <ModeToggle />
            <Button variant="default">
              <LogInIcon className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
