"use client";

import { useState } from "react";
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

// Fake data for the dashboard
const fakeCases = [
  {
    id: "143454",
    patientInitials: "JD",
    reportDate: "2023-06-15",
    status: "draft",
    progress: 60,
    drug: "Lisinopril",
    reaction: "Cough",
    lastUpdated: "2023-06-18",
  },
  {
    id: "143455",
    patientInitials: "AS",
    reportDate: "2023-06-14",
    status: "submitted",
    progress: 100,
    drug: "Metformin",
    reaction: "Nausea",
    lastUpdated: "2023-06-17",
  },
  {
    id: "143456",
    patientInitials: "TM",
    reportDate: "2023-06-16",
    status: "in_progress",
    progress: 30,
    drug: "Atorvastatin",
    reaction: "Muscle pain",
    lastUpdated: "2023-06-16",
  },
  {
    id: "143457",
    patientInitials: "EL",
    reportDate: "2023-06-13",
    status: "submitted",
    progress: 100,
    drug: "Amoxicillin",
    reaction: "Rash",
    lastUpdated: "2023-06-15",
  },
  {
    id: "143458",
    patientInitials: "RK",
    reportDate: "2023-06-17",
    status: "draft",
    progress: 45,
    drug: "Sertraline",
    reaction: "Insomnia",
    lastUpdated: "2023-06-18",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = fakeCases.filter(
    (case_) =>
      case_.id.includes(searchTerm) ||
      case_.patientInitials.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.reaction.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Adverse Drug Report Dashboard</h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases..."
            className="pl-8 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => router.push("/case/new")}>New Report</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((case_) => (
              <Card key={case_.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Case #{case_.id}</span>
                    <Badge
                      variant={
                        case_.status === "submitted" ? "default" : "secondary"
                      }
                      className="ml-2"
                    >
                      {getStatusIcon(case_.status)}
                      <span className="ml-1">
                        {getStatusText(case_.status)}
                      </span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Patient: {case_.patientInitials}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Drug:
                      </span>
                      <span className="font-medium">{case_.drug}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Reaction:
                      </span>
                      <span className="font-medium">{case_.reaction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Report Date:
                      </span>
                      <span className="font-medium">{case_.reportDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Last Updated:
                      </span>
                      <span className="font-medium">{case_.lastUpdated}</span>
                    </div>
                    {case_.status !== "submitted" && (
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">
                            {case_.progress}%
                          </span>
                        </div>
                        <Progress value={case_.progress} className="w-full" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {case_.status === "submitted" ? (
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link href={`/case/${case_.id}`}>
                        <File className="mr-2 h-4 w-4" />
                        Continue Editing
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="draft">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases
              .filter((case_) => case_.status === "draft")
              .map((case_) => (
                // Render case card (same as above)
                <Card key={case_.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Case #{case_.id}</span>
                      <Badge variant="secondary" className="ml-2">
                        <FilePenLine className="h-4 w-4 text-yellow-500" />
                        <span className="ml-1">Draft</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Patient: {case_.patientInitials}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Drug:
                        </span>
                        <span className="font-medium">{case_.drug}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Reaction:
                        </span>
                        <span className="font-medium">{case_.reaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Report Date:
                        </span>
                        <span className="font-medium">{case_.reportDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Updated:
                        </span>
                        <span className="font-medium">{case_.lastUpdated}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">
                            {case_.progress}%
                          </span>
                        </div>
                        <Progress value={case_.progress} className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button className="w-full" asChild>
                      <Link href={`/case/${case_.id}`}>
                        <File className="mr-2 h-4 w-4" />
                        Continue Editing
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in_progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases
              .filter((case_) => case_.status === "in_progress")
              .map((case_) => (
                // Render case card (same as above)
                <Card key={case_.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Case #{case_.id}</span>
                      <Badge variant="secondary" className="ml-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="ml-1">In Progress</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Patient: {case_.patientInitials}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Drug:
                        </span>
                        <span className="font-medium">{case_.drug}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Reaction:
                        </span>
                        <span className="font-medium">{case_.reaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Report Date:
                        </span>
                        <span className="font-medium">{case_.reportDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Updated:
                        </span>
                        <span className="font-medium">{case_.lastUpdated}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">
                            {case_.progress}%
                          </span>
                        </div>
                        <Progress value={case_.progress} className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button className="w-full" asChild>
                      <Link href={`/case/${case_.id}`}>
                        <File className="mr-2 h-4 w-4" />
                        Continue Editing
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="submitted">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases
              .filter((case_) => case_.status === "submitted")
              .map((case_) => (
                // Render case card (same as above)
                <Card key={case_.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Case #{case_.id}</span>
                      <Badge variant="default" className="ml-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="ml-1">Submitted</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Patient: {case_.patientInitials}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Drug:
                        </span>
                        <span className="font-medium">{case_.drug}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Reaction:
                        </span>
                        <span className="font-medium">{case_.reaction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Report Date:
                        </span>
                        <span className="font-medium">{case_.reportDate}</span>
                      </div>
                      <div className="flex  justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Updated:
                        </span>
                        <span className="font-medium">{case_.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
