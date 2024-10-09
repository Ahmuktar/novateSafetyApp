"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

const statusConfig = {
  draft: { color: "bg-gray-500", icon: Clock },
  submitted: { color: "bg-blue-500", icon: FileText },
  under_review: { color: "bg-yellow-500", icon: MessageSquare },
  action_required: { color: "bg-red-500", icon: AlertTriangle },
  closed: { color: "bg-green-500", icon: CheckCircle2 },
};

export default function CaseDashboard({ params }) {
  // fake data
  const caseData = [
    {
      id: 1,
      reportType: "Severe Acute Respiratory Syndrome (SARS-CoV-2)",
      reporterType: "Dr. John Doe",
      status: "draft",
    },
    {
      id: 2,
      reportType: "Coronavirus Disease 2019 (COVID-19)",
      reporterType: "Dr. Jane Smith",
      status: "submitted",
    },
    {
      id: 3,
      reportType: "Pneumonia",
      reporterType: "Dr. Mark Johnson",
      status: "under_review",
    },
    {
      id: 4,
      reportType: "Influenza",
      reporterType: "Dr. Emily Brown",
      status: "action_required",
    },
  ];
  // const [caseData, setCaseData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCaseData = async () => {
      const response = await fetch(`/api/case/${params.caseId}`);
      const data = await response.json();
      setCaseData(data);
    };
    fetchCaseData();
  }, [params.caseId]);

  // if (!caseData) {
  //   return <div>Loading...</div>
  // }

  // const StatusIcon = statusConfig[caseData?.status].icon;

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Case #{caseData?.id}</CardTitle>
              <CardDescription>
                {caseData?.reportType} report by {caseData?.reporterType}
              </CardDescription>
            </div>
            <div className={` text-white`}>
              {/* <StatusIcon className="w-4 h-4 mr-2" /> */}
              {caseData?.status?.replace("_", " ").charAt(0).toUpperCase() +
                caseData?.status?.replace("_", " ").slice(1)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Progress</h3>
            <Progress value={40} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">{40}% complete</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">Case Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Submission Date</p>
                <p>{caseData?.submissionDate || "Not submitted"}</p>
              </div>
              <div>
                <p className="font-medium">Last Updated</p>
                <p>{caseData?.lastUpdated}</p>
              </div>
              <div>
                <p className="font-medium">Reviewer</p>
                <p>{caseData?.reviewer || "Not assigned"}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">Recent Actions</h3>
            <ul className="space-y-2">
              {caseData?.actions?.map((action, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">{action.date}:</span>{" "}
                  {action.action} by {action.by}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to All Cases
          </Button>
          <div className="space-x-2">
            {caseData?.status === "draft" && (
              <Button
                onClick={() =>
                  router.push(`/case/${params.caseId}/(wizard)/reporter`)
                }
              >
                Continue Editing
              </Button>
            )}
            {caseData?.status !== "closed" && (
              <Button
                onClick={() => router.push(`/case/${params.caseId}/messages`)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() =>
                window.open(`/case/${params.caseId}/print`, "_blank")
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Print Report
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
