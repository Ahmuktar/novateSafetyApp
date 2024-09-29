"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-row">
      {/* Sidebar for larger screens */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="relative flex min-h-full max-w-full flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Welcome Content */}
        <main className="flex-grow flex flex-col h-full justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image
                src="/images/icon3.png"
                width={200}
                height={200}
                alt="Logo"
                className="block dark:hidden"
              />
              <Image
                src="/images/icon2.png"
                width={200}
                height={200}
                alt="Logo"
                className="hidden dark:block"
              />
            </div>
            <div className="">
              <h1 className="text-5xl font-bold text-center mb-4">
                Novate Safety App
              </h1>
              <p className="text-xl font-semibold text-center max-w-2xl">
                Report Adverse Drug Reactions (ADRs) securely and efficiently
              </p>
              <p className="text-sm text-center text-muted-foreground mt-10 mb-6 max-w-xl">
                Before you start reporting, please read and accept our Terms and
                Conditions. This helps ensure you understand our policies and
                how we handle your reports.
              </p>
            </div>
            <div className="w-full items-center gap-10 flex flex-col max-w-md">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  className="mr-2"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="acceptTerms" className="text-base">
                  I accept the{" "}
                  <Link href="/" className="underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <form className="flex items-center">
                <Button type="submit" className="" disabled={!acceptedTerms}>
                  Start Reporting
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
