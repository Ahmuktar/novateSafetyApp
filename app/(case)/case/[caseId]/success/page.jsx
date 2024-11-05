"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ArrowRight, FileText, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessPage({ params }) {
  const { caseId } = params;
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Report Submitted Successfully
          </CardTitle>
          <CardDescription>
            Thank you for your contribution to drug safety
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Your adverse drug reaction report has been successfully submitted
            and will be reviewed by our team.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <p className="font-semibold">Case ID: {caseId}</p>
            <p className="text-sm text-muted-foreground">
              Please save this ID for your records
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" asChild>
            <Link href={`/case/${caseId}`}>
              <FileText className="mr-2 h-4 w-4" />
              View Submitted Report
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/cases">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
        <ol className="text-left space-y-4">
          <li className="flex items-start">
            <ArrowRight className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
            <span>
              Our team will review your report and may contact you for
              additional information if needed.
            </span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
            <span>
              The report will be analyzed to identify potential safety signals
              and contribute to ongoing drug safety monitoring.
            </span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
            <span>
              You can track the status of your report in your dashboard or by
              using the provided Case ID.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
