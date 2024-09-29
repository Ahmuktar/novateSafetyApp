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

export default function CasePage() {
  const [showReportType, setShowReportType] = useState(false);
  const [showReporterSection, setShowReporterSection] = useState(false);
  const [showProfession, setShowProfession] = useState(false);

  return (
    <ScrollArea className="container mx-auto py-10">
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
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="describeSection">
                  What best describes you?
                </Label>
                <Select
                  onValueChange={(value) => setShowReportType(value !== "")}
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
              {showReportType && (
                <div className="space-y-2">
                  <Label>What would you like to report?</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowReporterSection(true)}
                      className="flex-grow"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Suspected side effect
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowReporterSection(true)}
                      className="flex-grow"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Vaccine reaction
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showReporterSection && (
            <>
              <Separator />
              {/* Reporter Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Reporter Information
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To submit a report, we require certain details from you as the
                  reporter.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporter">Who is reporting?</Label>
                    <Select
                      onValueChange={(value) =>
                        setShowProfession(value === "Healthcare professional")
                      }
                    >
                      <SelectTrigger id="reporter">
                        <SelectValue placeholder="Select from list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Patient">Patient</SelectItem>
                        <SelectItem value="Patient relatives">
                          Patient relatives
                        </SelectItem>
                        <SelectItem value="Healthcare professional">
                          Healthcare professional
                        </SelectItem>
                        <SelectItem value="Pharmaceutical company">
                          Pharmaceutical company
                        </SelectItem>
                        <SelectItem value="Lawyer">Lawyer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {showProfession && (
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession</Label>
                      <Select>
                        <SelectTrigger id="profession">
                          <SelectValue placeholder="Select from list" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                          <SelectItem value="Nurse">Nurse</SelectItem>
                          <SelectItem value="Dentist">Dentist</SelectItem>
                          <SelectItem value="Optometrist">
                            Optometrist
                          </SelectItem>
                          <SelectItem value="Radiographer">
                            Radiographer
                          </SelectItem>
                          <SelectItem value="Pharmacy Technician">
                            Pharmacy Technician
                          </SelectItem>
                          <SelectItem value="Sales Rep">Sales Rep</SelectItem>
                          <SelectItem value="Community Health Worker">
                            Community Health Worker
                          </SelectItem>
                          <SelectItem value="Other">
                            Other Healthcare Professional
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Select>
                      <SelectTrigger id="title">
                        <SelectValue placeholder="Select from list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pharm.">Pharm.</SelectItem>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Miss.">Miss.</SelectItem>
                        <SelectItem value="Ms.">Ms.</SelectItem>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                        <SelectItem value="Sir.">Sir.</SelectItem>
                        <SelectItem value="Prof.">Prof.</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {showProfession && (
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        Hospital/Company/Organisation
                      </Label>
                      <Input
                        id="company"
                        placeholder="Enter your organization"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Town/City</Label>
                    <Input id="city" placeholder="Enter your town or city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abia">Abia</SelectItem>
                        <SelectItem value="Adamawa">Adamawa</SelectItem>
                        {/* Add other states here */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal code</Label>
                    <Input id="postal" placeholder="Enter your postal code" />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Submit Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
