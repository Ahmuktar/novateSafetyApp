"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  File,
  FilePenLine,
  FileText,
  Search,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
const CaseCard = ({ case_ }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "draft":
        return <FilePenLine className="h-4 w-4 text-yellow-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "submitted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "draft":
        return "Draft";
      case "in_progress":
        return "In Progress";
      case "submitted":
        return "Submitted";
      default:
        return "Unknown";
    }
  };

  const calculateProgress = () => {
    // check if patients, medicines, reactions and reporters are not empty then calculate
    let progress = 0;
    if (case_.case.length !== 0) progress += 20;
    if (case_.medicines.length !== 0) progress += 20;
    if (case_.reactions.length !== 0) progress += 20;
    if (case_.reporter.length !== 0) progress += 20;
    if (case_.patient.length !== 0) progress += 20;

    return progress;
  };

  return (
    <Card key={case_?.id}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Case #{case_?.case?.case_id}</span>
          <Badge
            variant={
              case_?.case?.status === "submitted" ? "default" : "secondary"
            }
            className="ml-2"
          >
            {getStatusIcon(case_?.case?.status)}
            <span className="ml-1">{getStatusText(case_?.case?.status)}</span>
          </Badge>
        </CardTitle>
        <CardDescription>Patient: {case_?.patient?.initials}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Drug:</span>
            <span className="font-medium">{case_?.medicines[0].name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Reaction:</span>
            <span className="font-medium">{case_?.reactions[0].reaction}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Report Date:</span>
            <span className="font-medium">{formatDate(case_?.case?.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{formatDate(case_?.case?.date)}</span>
          </div>
          {case_?.case?.status !== "submitted" && (
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {calculateProgress()}%
                </span>
              </div>
              <Progress value={calculateProgress()} className="w-full" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {case_?.case?.status === "submitted" ? (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/case/${case_?.case?.case_id}`}>
              <FileText className="mr-2 h-4 w-4" />
              View Report
            </Link>
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link href={`/case/${case_?.case?.case_id}`}>
              <File className="mr-2 h-4 w-4" />
              Continue Editing
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
