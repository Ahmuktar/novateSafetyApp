"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";

// Fake data for a detailed case report with multiple drugs and reactions
const caseReport = {
  id: "143455",
  status: "submitted",
  submissionDate: "2023-06-17",
  lastUpdated: "2023-06-17",
  reporter: {
    name: "Dr. Jane Smith",
    profession: "Pharmacist",
    organization: "City General Hospital",
    email: "jane.smith@cityhospital.com",
    phone: "+1 (555) 123-4567",
  },
  patient: {
    initials: "AS",
    age: 45,
    ageUnit: "years",
    sex: "Female",
    weight: 70,
    weightUnit: "kg",
    height: 165,
    heightUnit: "cm",
    medicalHistory: "Type 2 Diabetes, Hypertension",
  },
  drugs: [
    {
      name: "Metformin",
      brandName: "Glucophage",
      manufacturer: "Bristol-Myers Squibb",
      batchNumber: "MET20230501",
      dosage: "1000",
      dosageUnit: "mg",
      frequency: "twice daily",
      route: "Oral",
      startDate: "2023-05-01",
      endDate: "2023-06-15",
      indication: "Type 2 Diabetes management",
    },
    {
      name: "Lisinopril",
      brandName: "Zestril",
      manufacturer: "AstraZeneca",
      batchNumber: "LIS20230401",
      dosage: "10",
      dosageUnit: "mg",
      frequency: "once daily",
      route: "Oral",
      startDate: "2023-04-01",
      endDate: "Ongoing",
      indication: "Hypertension management",
    },
  ],
  reactions: [
    {
      description: "Severe nausea and abdominal pain",
      startDate: "2023-06-10",
      endDate: "2023-06-15",
      outcome: "Recovered",
      seriousness: ["Hospitalization"],
      interventions: [
        "Temporary discontinuation of Metformin",
        "IV fluid administration",
        "Antiemetic medication",
      ],
    },
    {
      description: "Persistent dry cough",
      startDate: "2023-05-15",
      endDate: "Ongoing",
      outcome: "Not recovered",
      seriousness: ["Medically significant"],
      interventions: ["Monitoring", "Considering alternative medication"],
    },
  ],
  additionalInfo:
    "Patient was admitted to the hospital for 2 days due to severe dehydration caused by persistent nausea and vomiting. Symptoms improved after discontinuation of Metformin. The persistent dry cough is suspected to be related to Lisinopril use.",
};

export default function ViewReport() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF or other formatted report
    alert("Downloading report... (This is a placeholder action)");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Adverse Drug Reaction Report</h1>
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
            <span>Case #{caseReport.id}</span>
            <Badge>Submitted</Badge>
          </CardTitle>
          <CardDescription>
            Submitted on {caseReport.submissionDate} | Last updated:{" "}
            {caseReport.lastUpdated}
          </CardDescription>
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
              <p className="font-medium">{caseReport.reporter.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profession</p>
              <p className="font-medium">{caseReport.reporter.profession}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Organization</p>
              <p className="font-medium">{caseReport.reporter.organization}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{caseReport.reporter.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{caseReport.reporter.phone}</p>
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
              <p className="font-medium">{caseReport.patient.initials}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">
                {caseReport.patient.age} {caseReport.patient.ageUnit}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sex</p>
              <p className="font-medium">{caseReport.patient.sex}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">
                {caseReport.patient.weight} {caseReport.patient.weightUnit}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-medium">
                {caseReport.patient.height} {caseReport.patient.heightUnit}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Medical History</p>
              <p className="font-medium">{caseReport.patient.medicalHistory}</p>
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
            {caseReport.drugs.map((drug, index) => (
              <AccordionItem value={`drug-${index}`} key={index}>
                <AccordionTrigger>{drug.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Brand Name
                      </p>
                      <p className="font-medium">{drug.brandName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Manufacturer
                      </p>
                      <p className="font-medium">{drug.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Batch Number
                      </p>
                      <p className="font-medium">{drug.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dosage</p>
                      <p className="font-medium">
                        {drug.dosage} {drug.dosageUnit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Frequency</p>
                      <p className="font-medium">{drug.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Route</p>
                      <p className="font-medium">{drug.route}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">{drug.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{drug.endDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Indication
                      </p>
                      <p className="font-medium">{drug.indication}</p>
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
            {caseReport.reactions.map((reaction, index) => (
              <AccordionItem value={`reaction-${index}`} key={index}>
                <AccordionTrigger>{reaction.description}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Start Date
                      </p>
                      <p className="font-medium">{reaction.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{reaction.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Outcome</p>
                      <p className="font-medium">{reaction.outcome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Seriousness
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {reaction.seriousness.map((item, idx) => (
                          <Badge key={idx} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Interventions
                      </p>
                      <ul className="list-disc list-inside font-medium">
                        {reaction.interventions.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
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
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{caseReport.additionalInfo}</p>
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
