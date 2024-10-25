"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  Pill,
  Printer,
} from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/constant";
import Loader from "@/components/Loader";
import { capitalize } from "@/lib/utils";

export default function ViewReport({ params }) {
  const [caseData, setCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCaseDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/cases/${params.caseId}/details`
        );
        const data = await response.json();
        setCaseData(data);
      } catch (error) {
        console.error("Error fetching case details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCaseDetails();
  }, [params.caseId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Downloading report... (This is a placeholder action)");
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log(caseData);
  if (!caseData) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-card text-card-foreground rounded-lg p-6 mb-8">
        <div className="text-center">
          <h3 className="text-6xl font-bold text-primary mb-4">Oops!</h3>
          <p className="text-xl mb-6">Case #{params.caseId} not found.</p>
          <Button variant="outline" asChild>
            <Link href="/case">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-2 lg:py-8 lg:px-4 max-w-4xl">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <h1 className="text-lg lg:text-3xl font-bold">
          Adverse Drug Reaction Report
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Case #{caseData.case.case_id}</span>
            <Badge>{capitalize(caseData.case.status)}</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(caseData.case.date).toLocaleDateString()} |
            Last updated:{" "}
            {new Date(caseData.case.updatedDate).toLocaleDateString()}
          </p>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reporter Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {caseData.reporter.first_name} {caseData.reporter.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{caseData.reporter?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{caseData.reporter?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profession</p>
              <p className="font-medium">{caseData.reporter?.profession}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="font-medium">{caseData.reporter?.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Who is reporting</p>
              <p className="font-medium">{caseData.reporter?.whois}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{caseData.reporter?.company}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{caseData.reporter?.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">{caseData.reporter?.city}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State</p>
              <p className="font-medium">{caseData.reporter?.state}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Initials</p>
              <p className="font-medium">{caseData.patient?.initials}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sex</p>
              <p className="font-medium">{caseData.patient?.sex}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">
                {caseData.patient?.age} {caseData.patient?.ageUnit}s
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Age Group</p>
              <p className="font-medium">{caseData.patient?.ageGroup}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">{caseData.patient?.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-medium">{caseData.patient?.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ethnicity</p>
              <p className="font-medium">{caseData.patient?.ethnicity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Drug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {caseData.medicines.map((medicine, index) => (
              <AccordionItem value={`medicine-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center mb-2">
                    <Pill className="mr-2 h-5 w-5 text-primary" />
                    <h4 className="text-base font-semibold">
                      {medicine?.name}
                    </h4>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Manufacturer
                      </p>
                      <p className="font-medium">{medicine.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Batch</p>
                      <p className="font-medium">{medicine.batch}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dose</p>
                      <p className="font-medium">
                        {medicine.dose} {medicine.dose_unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Route</p>
                      <p className="font-medium">{medicine.route}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">
                        {new Date(medicine.started).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stop Date</p>
                      <p className="font-medium">
                        {new Date(medicine.stopped).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reason</p>
                      <p className="font-medium">{medicine.reason}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Adverse Reactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {caseData.reactions.map((reaction, index) => (
              <AccordionItem value={`reaction-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                    <h4 className="text-base font-semibold">
                      {reaction?.reaction}
                    </h4>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">{reaction?.react_start}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{reaction?.react_stop}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <Badge variant="default">{reaction?.react_state}</Badge>
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">Serious</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {reaction?.seriousness.map((effect, effectIndex) => (
                          <Badge key={effectIndex} variant="default">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">History</p>
                      <p>{reaction?.history}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
