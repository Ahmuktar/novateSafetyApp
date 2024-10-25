"use client";

import { Suspense, useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { API_URL } from "@/constant";
import { formatDate } from "@/lib/utils";

const SummaryCard = ({ caseId }) => {
  const router = useRouter();
  const [caseData, setCaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCaseDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/cases/${caseId}/details`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setCaseData(data);
        console.log(data);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getCaseDetails();
  }, []);

  return (
    <div>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Reporter Information</CardTitle>
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
              <p className="text-sm text-muted-foreground">Firstname</p>
              <p className="font-medium">{caseData.reporter?.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lastname</p>
              <p className="font-medium">{caseData.reporter?.last_name}</p>
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

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Patient Information</CardTitle>
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

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Medicine Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/medicine`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {caseData.medicines &&
            caseData.medicines.map((medicine, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                  <Pill className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="text-lg font-semibold">{medicine?.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-7">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Manufacturer
                    </p>
                    <p className="font-medium">{medicine?.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dose</p>
                    <p className="font-medium">
                      {medicine?.dose} {medicine?.dose_unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Start Date {"(YYYY-MM-DD)"}
                    </p>
                    <p className="font-medium">
                      {formatDate(medicine?.started)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      End Date {"(YYYY-MM-DD)"}
                    </p>
                    <p className="font-medium">
                      {formatDate(medicine?.stopped)}
                    </p>
                  </div>
                </div>
                {index < caseData.medicines?.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Reaction Information</CardTitle>
          <Button
            variant="ghost"
            onClick={() => router.push(`/case/${caseId}/reaction`)}
          >
            Edit <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {caseData.reactions &&
            caseData.reactions.map((reaction, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                  <h4 className="text-lg font-semibold">
                    {reaction?.reaction}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-7">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
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
                {index < caseData.reactions.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCard;
