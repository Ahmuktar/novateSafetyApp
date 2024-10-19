"use client";

import { Controller, useForm } from "react-hook-form";
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
import { DatePicker } from "@/components/DatePicker"; // You can use your date picker component here
import { useState } from "react";
import { API_URL } from "@/constant";
import { formatDate } from "@/lib/utils";

export default function MedicinePage({ params }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const isFormInvalid = Object.keys(errors).length > 0;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Format the dates before submitting
      const started = formatDate(data.started);
      const stopped = formatDate(data.stopped);

      const updatedData = {
        ...data,
        started, // Use formatted date
        stopped, // Use formatted date
        case_id: params.caseId, // Add the params.caseId to the data
      };
      // Make your API call here with form data
      const response = await fetch(`${API_URL}/medicines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      console.log("Form Data: ", updatedData);
      const res = await response.json();
      if (response.ok && res.id) {
        router.push(`/case/${params.caseId}/reaction`);
      } else {
        throw new Error(res.message || "Failed to add patient to case");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="medchar"
          control={control}
          rules={{ required: "Medicine character is required" }}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="medchar">
                Medicine characterization
                <span className="text-red-600"> *</span>
              </Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="medchar">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Suspected Drug">Suspected Drug</SelectItem>
                  <SelectItem value="Concomitant Drug">
                    Concomitant Drug
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.characterize && (
                <p className="text-red-600 text-sm">
                  Medicine characterization is required
                </p>
              )}
            </div>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="name">
            Medicine name<span className="text-red-600"> *</span>
          </Label>
          <Input
            id="name"
            {...register("name", { required: true })}
            placeholder="Enter medicine name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">Medicine name is required</p>
          )}
        </div>

        <Controller
          name="manufacturer"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Name of the Manufacturer</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="manufacturer">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Emzor Pharmaceutical Ltd">
                    Emzor Pharmaceutical Ltd
                  </SelectItem>
                  <SelectItem value="Orange Drugs Limited">
                    Orange Drugs Limited
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for taking medicine</Label>
          <Input
            id="reason"
            {...register("reason")}
            placeholder="Enter reason"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dose">Medicine dose number</Label>
          <Input id="dose" {...register("dose")} />
        </div>
        <Controller
          name="dose_unit"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="dose_unit">Dose unit (e.g. ml, mg)</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="dose_unit">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KG Kilogram(s)">KG Kilogram(s)</SelectItem>
                  <SelectItem value="G gram(s)">G gram(s)</SelectItem>
                  <SelectItem value="MG Milligram(s)">
                    MG Milligram(s)
                  </SelectItem>
                  <SelectItem value="μg microgram(s)">
                    μg microgram(s)
                  </SelectItem>
                  <SelectItem value="ng nanogram(s)">ng nanogram(s)</SelectItem>
                  <SelectItem value="pg picogram(s)">pg picogram(s)</SelectItem>
                  <SelectItem value="mg/kg milligram(s)/kilogram">
                    mg/kg milligram(s)/kilogram
                  </SelectItem>
                  <SelectItem value="μg/kg microgram(s)/kilogram">
                    μg/kg microgram(s)/kilogram
                  </SelectItem>
                  <SelectItem value="mg/m2 milligram(s)/sq. meter">
                    mg/m2 milligram(s)/sq. meter
                  </SelectItem>
                  <SelectItem value="μg/m2 microgram(s)/sq. meter">
                    μg/m2 microgram(s)/sq. meter
                  </SelectItem>
                  <SelectItem value="1 litre(s)">1 litre(s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          name="form"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="form" {...register("form")}>
                Pharmaceutical form (e.g. tablet, injection)
              </Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="form">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Year">Year</SelectItem>
                  <SelectItem value="Aerosol/Spray">Aerosol/Spray</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Cream">Cream</SelectItem>
                  <SelectItem value="Drop">Drop</SelectItem>
                  <SelectItem value="Emulsion">Emulsion</SelectItem>
                  <SelectItem value="Gel">Gel</SelectItem>
                  <SelectItem value="Granules">Granules</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Inhale">Inhale</SelectItem>
                  <SelectItem value="Lotion">Lotion</SelectItem>
                  <SelectItem value="Lozenge">Lozenge</SelectItem>
                  <SelectItem value="Ointment">Ointment</SelectItem>
                  <SelectItem value="Patch">Patch</SelectItem>
                  <SelectItem value="Powder">Powder</SelectItem>
                  <SelectItem value="Solution">Solution</SelectItem>
                  <SelectItem value="Suspension">Suspension</SelectItem>
                  <SelectItem value="Suppository">Suppository</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Transdermal System">
                    Transdermal System
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Input id="batch" {...register("batch")} />
        </div>

        <Controller
          name="route"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="route">Route of administration</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="route">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Oral">Oral</SelectItem>
                  <SelectItem value="Sublingual">Sublingual</SelectItem>
                  <SelectItem value="Buccal">Buccal</SelectItem>
                  <SelectItem value="Rectal">Rectal</SelectItem>
                  <SelectItem value="Intravenous">Intravenous</SelectItem>
                  <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                  <SelectItem value="Subcutaneous">Subcutaneous</SelectItem>
                  <SelectItem value="Intradermal">Intradermal</SelectItem>
                  <SelectItem value="Nasal">Nasal</SelectItem>
                  <SelectItem value="Pulmonary">Pulmonary</SelectItem>
                  <SelectItem value="Topical">Topical</SelectItem>
                  <SelectItem value="Transdermal">Transdermal</SelectItem>
                  <SelectItem value="Intraperitoneal">
                    Intraperitoneal
                  </SelectItem>
                  <SelectItem value="Intraarticular">Intraarticular</SelectItem>
                  <SelectItem value="Intrathecal">Intrathecal</SelectItem>
                  <SelectItem value="Subconjunctival">
                    Subconjunctival
                  </SelectItem>
                  <SelectItem value="Intraocular">Intraocular</SelectItem>
                  <SelectItem value="Vaginal">Vaginal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="started">
            Start Date<span className="text-red-600"> *</span>
          </Label>
          <Input
            type="date"
            id="started"
            {...register("started", { required: true })}
          />
          {errors.started && (
            <p className="text-red-600 text-sm">Start date is required</p>
          )}
        </div>

        <Controller
          name="prevent"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="prevent">
                Did the reaction prevent continuation of the medications?
              </Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="prevent">
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Drug withdrawn">Drug withdrawn</SelectItem>
                  <SelectItem value="Dose increased">Dose increased</SelectItem>
                  <SelectItem value="Dose reduced">Dose reduced</SelectItem>
                  <SelectItem value="Dose not changed">
                    Dose not changed
                  </SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                  <SelectItem value="Not applicable">Not applicable</SelectItem>
                </SelectContent>
              </Select>
              {errors.prevent && (
                <p className="text-red-600 text-sm">Prevent is required</p>
              )}
            </div>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="stopped">
            Stopped Date<span className="text-red-600"> *</span>
          </Label>
          <Input
            type="date"
            id="stopped"
            {...register("stopped", { required: true })}
            dateFormat="yyyy-MM-dd"
          />
          {errors.stopped && (
            <p className="text-red-600 text-sm">Stopped date is required</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/case/${params.caseId}/patient`)}
        >
          Back
        </Button>
        <Button type="submit" disabled={isLoading || isFormInvalid}>
          {isLoading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
