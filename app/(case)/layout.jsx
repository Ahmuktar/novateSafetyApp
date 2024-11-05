import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RootLayout({ children }) {
  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Welcome Content */}
        <main className="flex-1 overflow-y-auto lg:p-6">
          <ScrollArea className="w-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
