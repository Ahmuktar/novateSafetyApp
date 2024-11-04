// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export default function RootLayout({ children }) {
//   return (
//     <div className="h-screen bg-background flex">
//       {/* Sidebar for larger screens */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Navbar */}
//         <Navbar />

//         {/* Welcome Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <ScrollArea className="w-full">{children}</ScrollArea>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Welcome Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <ScrollArea className="w-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
