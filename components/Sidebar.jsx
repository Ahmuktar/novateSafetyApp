import React from "react";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  BookOpenIcon,
  SettingsIcon,
  LogInIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex-1 flex flex-col min-h-0 border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1">
              <ul className="space-y-1">
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <HomeIcon className="mr-3 h-6 w-6" />
                    Home
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpenIcon className="mr-3 h-6 w-6" />
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <SettingsIcon className="mr-3 h-6 w-6" />
                    Settings
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
