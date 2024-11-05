"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, Home, List, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const MobileNav = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cases", label: "Cases", icon: List },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div>
          <div className="flex flex-col h-full">
            <div className="p-4 my-4 flex justify-between items-center">
              <Link href="/" className="mx-auto space-x-2">
                <Image
                  src="/images/logo2.png"
                  alt="Novate Logo"
                  width={160}
                  height={160}
                />
              </Link>
            </div>
            <ul className="space-y-2">
              {links.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center space-x-2 px-4 py-4 rounded-md transition-colors duration-200 ${
                      pathname === href
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
