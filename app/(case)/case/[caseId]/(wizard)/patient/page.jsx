"use client";

import { useEffect, useState } from "react";
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
import { API_URL } from "@/constant";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Zod schema for validation
const patientSchema = z.object({
  initials: z.string().min(1, "Initials are required"),
  age: z.number().min(1, "Age is required"),
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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    initials: "",
    age: "",
    age_unit: "",
    age_group: "",
    sex: "",
    weight: "",
    height: "",
    ethnicity: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isExistingPatient, setIsExistingPatient] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${API_URL}/patients/${params.caseId}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData(data);
            setIsExistingPatient(true);
          }
        } else {
          throw new Error("Failed to fetch patient");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [params.caseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async () => {
    // event.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const validation = patientSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.format();
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      // Clean up the form data
      const cleanedFormData = {
        initials: formData.initials,
        age: parseInt(formData.age),
        age_unit: formData.age_unit,
        age_group: formData.age_group,
        sex: formData.sex,
        weight: formData.weight,
        height: formData.height,
        ethnicity: formData.ethnicity,
        case_id: params.caseId,
      };

      const url = isExistingPatient
        ? `${API_URL}/patients/${params?.caseId}`
        : `${API_URL}/patients`;
      const method = isExistingPatient ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) throw new Error("Failed to submit patient.");

      const data = await response.json();
      if (isExistingPatient) {
        router.push(`/case/${params?.caseId}/medicine`);
      } else {
        await updateCase(params.caseId, data.id);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const handleSaveDraft = async () => {
    setIsDraftLoading(true);

    const validation = patientSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.format();
      setFormErrors(errors);
      setIsDraftLoading(false);
      return;
    }

    try {
      await handleSubmit();
      toast({
        title: "Draft saved successfully!",
        description: "Your changes have been saved as a draft.",
      });
    } catch (error) {
      toast({
        title: `Save draft failed${error}`,
        description:
          "An unexpected error occurred. Please check your connection or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDraftLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initials">
              Patient initials<span className="text-red-600">*</span>
            </Label>
            <Input
              id="initials"
              name="initials"
              placeholder="Enter patient initials"
              value={formData.initials}
              onChange={handleInputChange}
            />
            {formErrors.initials && (
              <p className="text-red-600 text-sm">
                {formErrors.initials._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">
              Age<span className="text-red-600">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              placeholder="Enter patient age"
              value={formData.age}
              onChange={handleInputChange}
            />
            {formErrors.age && (
              <p className="text-red-600 text -sm">
                {formErrors.age._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageunit">
              Age unit (years, months, etc.)
              <span className="text-red-600">*</span>
            </Label>
            <Select
              name="age_unit"
              value={formData.age_unit}
              onValueChange={(value) => handleSelectChange("age_unit", value)}
            >
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
            {formErrors.age_unit && (
              <p className="text-red-600 text-sm">
                {formErrors.age_unit._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age_group">Age group</Label>
            <Select
              name="age_group"
              value={formData.age_group}
              onValueChange={(value) => handleSelectChange("age_group", value)}
            >
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
            {formErrors.age_group && (
              <p className="text-red-600 text-sm">
                {formErrors.age_group._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex">
              Sex<span className="text-red-600">*</span>
            </Label>
            <Select
              name="sex"
              value={formData.sex}
              onValueChange={(value) => handleSelectChange("sex", value)}
            >
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.sex && (
              <p className="text-red-600 text-sm">
                {formErrors.sex._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (optional)</Label>
            <Input
              id="weight"
              name="weight"
              placeholder="Enter patient weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (optional)</Label>
            <Input
              id="height"
              name="height"
              placeholder="Enter patient height"
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity (optional)</Label>
            <Input
              id="ethnicity"
              name="ethnicity"
              placeholder="Enter patient ethnicity"
              value={formData.ethnicity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/case/${params.caseId}/reporter`)}
          >
            Back
          </Button>
          <div className="gap-5 flex">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={isDraftLoading}
            >
              {isDraftLoading ? "Submitting..." : "Save as draft"}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
