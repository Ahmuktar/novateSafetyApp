"use client";

import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarListItem = ({ item }) => {
  const pathname = usePathname();
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
};

export default SidebarListItem;
