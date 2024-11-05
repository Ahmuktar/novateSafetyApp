"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, List, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cases", label: "Cases", icon: List },
  ];

  return (
    <div className="lg:block hidden transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-30 w-64 bg-gray-100 text-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
      <div className="p-4 flex justify-between items-center">
        <Link href="/" className="mx-auto space-x-2">
          <Image
            src="/images/logo2.png"
            alt="Novate Logo"
            width={160}
            height={160}
          />
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4">
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
      </nav>
    </div>
  );
};

export default Sidebar;
