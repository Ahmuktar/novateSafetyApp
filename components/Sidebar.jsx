"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  PlusIcon,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Fake ADR Report
  const [chats, setChats] = useState([
    { id: 1, title: "Adverse Drug Reaction 1", date: "2023-06-15" },
    { id: 2, title: "Adverse Drug Reaction 2", date: "2023-06-14" },
    { id: 3, title: "Adverse Drug Reaction 3", date: "2023-06-13" },
  ]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "Adverse Drug Reaction 1",
      date: new Date().toISOString().split("T")[0],
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`
          bg-gray-900 text-white transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Button
              className={`w-full justify-start text-white hover:text-white hover:bg-gray-700
                ${isCollapsed ? "px-0 justify-center" : ""}
              `}
              onClick={addNewChat}
            >
              <PlusIcon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">New case</span>}
            </Button>
          </div>

          <ScrollArea className="flex-grow px-4">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 mb-1
                  ${isCollapsed ? "px-0 justify-center" : ""}
                `}
              >
                <MessageSquare className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-2 truncate">{chat.title}</span>
                )}
              </Button>
            ))}
          </ScrollArea>

          <div className="p-4 border-t border-gray-700">
            <Button
              variant="ghost"
              className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 mb-2
                ${isCollapsed ? "px-0 justify-center" : ""}
              `}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Button>

            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              {!isCollapsed && <span className="text-sm">Dark mode</span>}
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-gray-700"
              />
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <span className="text-sm font-medium">John Doe</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 dark:text-white ${
          isCollapsed ? "left-16" : "left-64"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
}
