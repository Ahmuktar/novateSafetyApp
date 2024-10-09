import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <MobileNav />
            <div className="flex-shrink-0 ml-5 flex items-center">
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
