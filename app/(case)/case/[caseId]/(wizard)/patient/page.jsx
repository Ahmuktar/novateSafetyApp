"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PatientPage({ params }) {
  const [showProfession, setShowProfession] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    // await fetch(`/api/case/${params.caseId}/reporter`, {
    //   method: "POST",
    //   body: formData,
    // })
    router.push(`/case/${params.caseId}/medicine`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="initials">
            Patient initials<span className="text-red-600"> *</span>
          </Label>
          <Input
            id="initials"
            name="initials"
            placeholder="Enter patient name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sex">
            Sex<span className="text-red-600"> *</span>
          </Label>
          <Select name="sex">
            <SelectTrigger id="sex">
              <SelectValue placeholder="Select Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">
            Patient age<span className="text-red-600"> *</span>
          </Label>
          <Input id="age" name="age" placeholder="Enter patient age" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ageunit">
            Age unit (years, month, etc.){" "}
            <span className="text-red-600">*</span>
          </Label>
          <Select name="ageunit">
            <SelectTrigger id="ageunit">
              <SelectValue placeholder="Select from list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Year">Year</SelectItem>
              <SelectItem value="Month">Month</SelectItem>
              <SelectItem value="Week">Week</SelectItem>
              <SelectItem value="Day">Day</SelectItem>
              <SelectItem value="Hour">Hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ageunit">
            Patient age group, if exact age is unknown
          </Label>
          <Select name="ageunit">
            <SelectTrigger id="ageunit">
              <SelectValue placeholder="Select from list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Year">Year</SelectItem>
              <SelectItem value="Neonant">Neonant</SelectItem>
              <SelectItem value="Infant">Infant</SelectItem>
              <SelectItem value="Child">Child</SelectItem>
              <SelectItem value="Adolescent">Adolescent</SelectItem>
              <SelectItem value="Adult">Adult</SelectItem>
              <SelectItem value="Elderly">Elderly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (Kg)</Label>
          <Input id="weight" name="weight" placeholder="Enter patient weight" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (CM)</Label>
          <Input id="height" name="height" placeholder="Enter patient height" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Input
            id="ethnicity"
            name="ethnicity"
            placeholder="Enter patient ethnicity"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/case/${params.caseId}/reporter`)}
        >
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
