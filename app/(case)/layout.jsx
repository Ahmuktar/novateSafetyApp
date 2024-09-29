import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar for larger screens */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Welcome Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
