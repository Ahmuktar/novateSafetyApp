"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/constant";
import CaseCard from "@/components/CaseCard";
import Loader from "@/components/Loader";
import { FileQuestion, LogIn } from "lucide-react";
import LoginModal from "@/components/LoginModal";

export default function CasesPage() {
  const router = useRouter();
  const [caseData, setCaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const getCases = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("APP_SESSION");
        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }
        const response = await fetch(`${API_URL}/cases/user/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCaseData(data);
      } catch (error) {
        console.error("Error fetching case details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCases();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return (
      <Card className="w-full max-w-md  relative shadow-none border-none mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">Oops!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <LogIn className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-center text-gray-600 mb-4">
            Please log in to access your case history.
          </p>
          <div>
            <LoginModal />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!caseData || caseData.length === 0) {
    return (
      <Card className="w-full max-w-md shadow-none border-none mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">No Cases Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-center text-gray-600 mb-4">
            You haven't created any cases yet. Start by creating a new report.
          </p>
          <Button onClick={() => router.push("/case/new")}>New Report</Button>
        </CardContent>
      </Card>
    );
  }

  if (!caseData || caseData.length === 0) {
    return (
      <Card className="w-full max-w-md shadow-none border-none mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">No Cases Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-center text-gray-600 mb-4">
            You haven't created any cases yet. Start by creating a new report.
          </p>
          <Button onClick={() => router.push("/case/new")}>New Report</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Adverse Drug Report Dashboard</h1>
        <div className="relative"></div>
        <Button onClick={() => router.push("/case/new")}>New Report</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseData?.map((case_) => (
          <CaseCard key={case_.id} case_={case_} />
        ))}
      </div>
    </div>
  );
}
