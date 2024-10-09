"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export default function CasePage() {
  const [showReportType, setShowReportType] = useState(false);
  const [reporterType, setReporterType] = useState("");
  const [reportType, setReportType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Generate random caseId
    const caseId = Math.floor(Math.random() * 1000000) + 1;

    // const response = await fetch("/api/create-case", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ reporterType, reportType }),
    // });
    // const data = await response.json();
    setIsLoading(false);
    router.push(`/case/${caseId}/reporter`);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Report an Adverse Drug Reaction</CardTitle>
          <CardDescription>
            Please provide the necessary information to report an adverse drug
            reaction or vaccine side effect.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="describeSection">
                  What best describes you?
                </Label>
                <Select
                  onValueChange={(value) => {
                    setReporterType(value);
                    setShowReportType(value !== "");
                  }}
                >
                  <SelectTrigger id="describeSection">
                    <SelectValue placeholder="Select from list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Member of Public">
                      Member of Public
                    </SelectItem>
                    <SelectItem value="Healthcare Professional">
                      Healthcare Professional
                    </SelectItem>
                    <SelectItem value="Pharmaceutical Company">
                      Pharmaceutical Company
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>What would you like to report?</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReportType("Suspected side effect")}
                    className={`flex-grow justify-start ${
                      reportType === "Suspected side effect"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Suspected side effect
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReportType("Vaccine reaction")}
                    className={`flex-grow justify-start ${
                      reportType === "Vaccine reaction"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Vaccine reaction
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={!reporterType || !reportType || isLoading}
              >
                {isLoading ? "Loading..." : "Next"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
