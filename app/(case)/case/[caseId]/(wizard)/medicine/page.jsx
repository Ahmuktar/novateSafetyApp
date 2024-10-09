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
import { DatePicker } from "@/components/DatePicker";

export default function MedicinePage({ params }) {
  const [showProfession, setShowProfession] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    // await fetch(`/api/case/${params.caseId}/reporter`, {
    //   method: "POST",
    //   body: formData,
    // })
    router.push(`/case/${params.caseId}/reaction`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="characterize">
            Medicine characterization<span className="text-red-600"> *</span>
          </Label>
          <Select name="characterize">
            <SelectTrigger id="characterize">
              <SelectValue placeholder="Select from list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Suspected Drug">Suspected Drug</SelectItem>
              <SelectItem value="Concomitant Drug">Concomitant Drug</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medname">
            Medicine name<span className="text-red-600"> *</span>
          </Label>
          <Input
            id="medname"
            name="medname"
            placeholder="Enter medicine name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Name of the Manufacturer</Label>
          <Select name="manufacturer">
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
        <div className="space-y-2">
          <Label htmlFor="age">Reason for taking medicine</Label>
          <Input id="age" name="age" placeholder="Enter patient age" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dose">Medicine dose number</Label>
          <Input id="dose" name="dose" placeholder="" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ageunit">Dose unit (e.g. ml, mg)</Label>
          <Select name="ageunit">
            <SelectTrigger id="ageunit">
              <SelectValue placeholder="Select from list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KG Kilogram(s)">KG Kilogram(s)</SelectItem>
              <SelectItem value="G gram(s)">G gram(s)</SelectItem>
              <SelectItem value="MG Milligram(s)">MG Milligram(s)</SelectItem>
              <SelectItem value="μg microgram(s)">μg microgram(s) </SelectItem>
              <SelectItem value="ng nanogram(s)">ng nanogram(s) </SelectItem>
              <SelectItem value="pg picogram(s)">pg picogram(s) </SelectItem>
              <SelectItem value="mg/kg milligram(s)/kilogram">
                mg/kg milligram(s)/kilogram{" "}
              </SelectItem>
              <SelectItem value="μg/kg microgram(s)/kilogram">
                μg/kg microgram(s)/kilogram{" "}
              </SelectItem>
              <SelectItem value="mg/m2 milligram(s)/sq. meter">
                mg/m2 milligram(s)/sq. meter{" "}
              </SelectItem>
              <SelectItem value="μg/m2 milligram(s)/sq. meter">
                μg/m2 milligram(s)/sq. meter{" "}
              </SelectItem>
              <SelectItem value="1 litre(s)">1 litre(s)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pharmform">
            Pharmaceutical form (e.g. tablet, injection)
          </Label>
          <Select name="pharmform">
            <SelectTrigger id="pharmform">
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
        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Input id="batch" name="batch" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="route">Route of administration</Label>
          <Select name="route">
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
              <SelectItem value="Intraperitoneal">Intraperitoneal</SelectItem>
              <SelectItem value="Intraarticular">Intraarticular</SelectItem>
              <SelectItem value="Intrathecal">Intrathecal</SelectItem>
              <SelectItem value="Subconjunctival">Subconjunctival</SelectItem>
              <SelectItem value="Intraocular">Intraocular</SelectItem>
              <SelectItem value="Vaginal">Vaginal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            When was the medicine started?
            <span className="text-red-600"> *</span>
          </Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ageunit">
            Did the reaction prevent continuation of the medications?
          </Label>
          <Select name="ageunit">
            <SelectTrigger id="ageunit">
              <SelectValue placeholder="Select from list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Drug withdrawn">Drug withdrawn</SelectItem>
              <SelectItem value="Dose increased">Dose increased</SelectItem>
              <SelectItem value="Dose reduced">Dose reduced</SelectItem>
              <SelectItem value="Dose not changed">Dose not changed</SelectItem>
              <SelectItem value="Unknown">Unknown</SelectItem>
              <SelectItem value="Not applicable">Not applicable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            When was the medicine started?
            <span className="text-red-600"> *</span>
          </Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <input type="checkbox" id="addImage" className="mr-2" />
          <Label htmlFor="addImage" className="text-sm">
            Would you like to add a picture of the medicine{" "}
            <span className="text-red-600"> *</span>
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
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
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
