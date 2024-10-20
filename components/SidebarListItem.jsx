"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const SidebarListItem = ({ href, icon, label, isActive }) => {
  let Icon = icon;
  return (
    <Link
      href={href}
      className={cn(
        "w-full flex h-11 px-4 py-2 rounded-md justify-start items-center gap-2 hover:bg-gray-200 mb-1",
        { "bg-primary text-white": isActive }
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="truncate flex-1 w-12 overflow-hidden text-ellipsis">
        {label}
      </span>
    </Link>
  );
};

export default SidebarListItem;
