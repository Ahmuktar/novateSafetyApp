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
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/constant";
import { Loader2 } from "lucide-react";

// Zod schema for validation
const patientSchema = z.object({
  initials: z.string().min(1, "Initials are required"),
  age: z.string().min(1, "Age is required"),
  age_unit: z.string().min(1, "Age unit is required"),
  age_group: z.string().optional(),
  sex: z.string().min(1, "Sex is required"),
  weight: z.string().optional(),
  height: z.string().optional(),
  ethnicity: z.string().optional(),
});

export default function PatientPage({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with useForm and Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const updateCase = async (caseId, patientId) => {
    try {
      const updateResponse = await fetch(`${API_URL}/cases/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: patientId }),
      });

      if (updateResponse.ok) {
        router.push(`/case/${caseId}/medicine`);
      } else {
        const updateData = await updateResponse.json();
        throw new Error(updateData.message || "Failed to update case");
      }
    } catch (error) {
      toast({ description: error.message, variant: "destructive" });
      setIsLoading(false);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Form Data: ", data);
      // Add the params.caseId to the data using spread
      const updatedData = { ...data, case_id: params.caseId };
      // Make your API call here with form data
      const response = await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const res = await response.json();
      console.log(res);
      if (response.ok && res.id) {
        await updateCase(params.caseId, res.id);
      } else {
        throw new Error(res.message || "Failed to add patient to case");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initials">
              Patient initials<span className="text-red-600"> *</span>
            </Label>
            <Input
              id="initials"
              name="initials"
              placeholder="Enter patient initials"
              {...register("initials")}
            />
            {errors.initials && (
              <p className="text-red-600 text-sm">{errors.initials.message}</p>
            )}
          </div>

          <Controller
            name="sex"
            control={control}
            rules={{ required: "Sex is required" }}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="sex">
                  Sex<span className="text-red-600"> *</span>
                </Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Select Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && (
                  <p className="text-red-600 text-sm">{errors.sex.message}</p>
                )}
              </div>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="age">
              Patient age<span className="text-red-600"> *</span>
            </Label>
            <Input
              id="age"
              name="age"
              placeholder="Enter patient age"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-red-600 text-sm">{errors.age.message}</p>
            )}
          </div>

          <Controller
            name="age_unit"
            control={control}
            rules={{ required: "Age unit is required" }}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="ageunit">
                  Age unit (years, months, etc.){" "}
                  <span className="text-red-600">*</span>
                </Label>
                <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.age_unit && (
                  <p className="text-red-600 text-sm">
                    {errors.age_unit.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="age_group"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="age_group">Patient age group</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="age_group">
                    <SelectValue placeholder="Select from list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Neonant">Neonant</SelectItem>
                    <SelectItem value="Infant">Infant</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Adolescent">Adolescent</SelectItem>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Elderly">Elderly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.age_group && (
                  <p className="text-red-600 text-sm">
                    {errors.age_group.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (Kg)</Label>
            <Input
              id="weight"
              name="weight"
              placeholder="Enter patient weight"
              {...register("weight")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (CM)</Label>
            <Input
              id="height"
              name="height"
              placeholder="Enter patient height"
              {...register("height")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity</Label>
            <Input
              id="ethnicity"
              name="ethnicity"
              placeholder="Enter patient ethnicity"
              {...register("ethnicity")}
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
