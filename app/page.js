import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import WelcomePage from "@/components/WelcomePage";

export default function page() {
  return (
    <div className="min-h-screen bg-background flex flex-row">
      {/* Sidebar for larger screens */}
      <Sidebar />

      {/* Main Content */}
      <div className="relative flex min-h-full max-w-full flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Welcome Content */}
        <main className="flex-grow flex flex-col h-full justify-center items-center px-4 sm:px-6 lg:px-8">
          <WelcomePage />
        </main>
      </div>
    </div>
  );
}
