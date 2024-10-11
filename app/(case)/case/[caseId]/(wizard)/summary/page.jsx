"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Calendar,
  User,
  Pill,
  AlertTriangle,
} from "lucide-react";

export default function SummaryPage({ params }) {
  const { caseId } = params;
  const router = useRouter();
  const [caseData] = useState({
    reporter: {
      name: "John Doe",
      email: "johndoe@example.com",
      profession: "Pharmacist",
    },
    patient: {
      initials: "JD",
      age: 35,
      ageUnit: "years",
      sex: "Male",
      weight: 70,
      height: 180,
    },
    medicines: [
      {
        medname: "Aspirin",
        manufacturer: "Pharma Inc.",
        dose: "500",
        doseUnit: "mg",
        medstart: "2024-09-15",
        medstop: "2024-09-30",
      },
      {
        medname: "Ibuprofen",
        manufacturer: "Medico Co.",
        dose: "200",
        doseUnit: "mg",
        medstart: "2024-09-20",
        medstop: "2024-09-25",
      },
    ],
    reactions: [
      {
        react: "Nausea",
        reactstart: "2024-09-16",
        reactstop: "2024-09-18",
        reactstate: "Resolved",
        isSerious: true,
        seriousEffects: ["Hospitalization"],
      },
    ],
  });

  const handleSubmit = async () => {
    // try {
    //   const response = await fetch(`/api/case/${caseId}/submit`, {
    //     method: "POST",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to submit case");
    //   }
    router.push(`/case/${caseId}/success`);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSaveDraft = async () => {
    try {
      const response = await fetch(`/api/case/${caseId}/save-draft`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to save draft");
      }
      router.push(`/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Medical Case Summary
      </h1>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Reporter Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/reporter`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{caseData.reporter.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{caseData.reporter.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profession</p>
              <p className="font-medium">{caseData.reporter.profession}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Patient Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/patient`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Initials</p>
              <p className="font-medium">{caseData.patient.initials}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">
                {caseData.patient.age} {caseData.patient.ageUnit}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sex</p>
              <p className="font-medium">{caseData.patient.sex}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">{caseData.patient.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-medium">{caseData.patient.height} cm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Medicine Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/medicine`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {caseData.medicines.map((medicine, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center mb-2">
                <Pill className="mr-2 h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold">{medicine.medname}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-7">
                <div>
                  <p className="text-sm text-muted-foreground">Manufacturer</p>
                  <p className="font-medium">{medicine.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dose</p>
                  <p className="font-medium">
                    {medicine.dose} {medicine.doseUnit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{medicine.medstart}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{medicine.medstop}</p>
                </div>
              </div>
              {index < caseData.medicines.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Reaction Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/reaction`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {caseData.reactions.map((reaction, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center mb-2">
                <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                <h4 className="text-lg font-semibold">{reaction.react}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-7">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{reaction.reactstart}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{reaction.reactstop}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <Badge
                    variant={
                      reaction.reactstate === "Resolved" ? "success" : "warning"
                    }
                  >
                    {reaction.reactstate}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Serious</p>
                  <Badge
                    variant={reaction.isSerious ? "destructive" : "secondary"}
                  >
                    {reaction.isSerious ? "Yes" : "No"}
                  </Badge>
                </div>
                {reaction.isSerious && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Serious Effects
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {reaction.seriousEffects.map((effect, effectIndex) => (
                        <Badge key={effectIndex} variant="outline">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {index < caseData.reactions.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button onClick={handleSubmit}>Submit Case</Button>
      </div>
    </div>
  );
}
