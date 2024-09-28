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
          <div className="flex flex-col space-y-6 items-center w-1/3">
            <div className="mb-20">
              <Image
                src="/images/icon.png"
                width={200}
                height={200}
                alt="Logo"
                className="rounded-full dark:hidden"
              />
              <Image
                src="/images/icon2.png"
                width={200}
                height={200}
                alt="Logo"
                className="rounded-full light:hidden"
              />
            </div>
            <div className="">
              <h1 className="text-4xl font-bold text-center mb-6">
                Welcome to the Novate Safety App
              </h1>
              <p className="text-xl text-center mb-8 max-w-2xl">
                Your trusted platform for reporting Adverse Drug Reactions
                (ADRs).
              </p>
              <p className="text-sm text-center mb-4 max-w-2xl">
                Before you start reporting, please read and accept our Terms and
                Conditions. This helps ensure you understand our policies and
                how we handle your reports.
              </p>
            </div>
            <div className="w-full items-center flex flex-col max-w-md">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  className="mr-2"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="acceptTerms" className="text-sm">
                  I accept the{" "}
                  <Link href="/" className="underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <form className="flex items-center">
                <Button type="submit" disabled={!acceptedTerms}>
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
