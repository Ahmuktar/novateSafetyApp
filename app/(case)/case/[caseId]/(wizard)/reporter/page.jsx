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

export default function ReporterPage({ params }) {
  const [showProfession, setShowProfession] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    // await fetch(`/api/case/${params.caseId}/reporter`, {
    //   method: "POST",
    //   body: formData,
    // })
    router.push(`/case/${params.caseId}/patient`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Select name="profession">
              <SelectTrigger id="profession">
                <SelectValue placeholder="Select from list" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                <SelectItem value="Nurse">Nurse</SelectItem>
                <SelectItem value="Dentist">Dentist</SelectItem>
                <SelectItem value="Optometrist">Optometrist</SelectItem>
                <SelectItem value="Radiographer">Radiographer</SelectItem>
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
          <Select name="title">
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
          <Input
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Last name</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
        {showProfession && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="company">Hospital/Company/Organisation</Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter your organization"
            />
          </div>
        )}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" placeholder="Enter your address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Town/City</Label>
          <Input id="city" name="city" placeholder="Enter your town or city" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select name="state">
            <SelectTrigger id="state">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Abia">Abia</SelectItem>
              <SelectItem value="Adamawa">Adamawa</SelectItem>
              <SelectItem value="Akwa Ibom">Akwa Ibom</SelectItem>
              <SelectItem value="Anambra">Anambra</SelectItem>
              <SelectItem value="Bauchi">Bauchi</SelectItem>
              <SelectItem value="Bayelsa">Bayelsa</SelectItem>
              <SelectItem value="Benue">Benue</SelectItem>
              <SelectItem value="Borno">Borno</SelectItem>
              <SelectItem value="Cross River">Cross River</SelectItem>
              <SelectItem value="Delta">Delta</SelectItem>
              <SelectItem value="Ebonyi">Ebonyi</SelectItem>
              <SelectItem value="Edo">Edo</SelectItem>
              <SelectItem value="Ekiti">Ekiti</SelectItem>
              <SelectItem value="Enugu">Enugu</SelectItem>
              <SelectItem value="FCT">
                Federal Capital Territory (FCT)
              </SelectItem>
              <SelectItem value="Gombe">Gombe</SelectItem>
              <SelectItem value="Imo">Imo</SelectItem>
              <SelectItem value="Jigawa">Jigawa</SelectItem>
              <SelectItem value="Kaduna">Kaduna</SelectItem>
              <SelectItem value="Kano">Kano</SelectItem>
              <SelectItem value="Katsina">Katsina</SelectItem>
              <SelectItem value="Kebbi">Kebbi</SelectItem>
              <SelectItem value="Kogi">Kogi</SelectItem>
              <SelectItem value="Kwara">Kwara</SelectItem>
              <SelectItem value="Lagos">Lagos</SelectItem>
              <SelectItem value="Nasarawa">Nasarawa</SelectItem>
              <SelectItem value="Niger">Niger</SelectItem>
              <SelectItem value="Ogun">Ogun</SelectItem>
              <SelectItem value="Ondo">Ondo</SelectItem>
              <SelectItem value="Osun">Osun</SelectItem>
              <SelectItem value="Oyo">Oyo</SelectItem>
              <SelectItem value="Plateau">Plateau</SelectItem>
              <SelectItem value="Rivers">Rivers</SelectItem>
              <SelectItem value="Sokoto">Sokoto</SelectItem>
              <SelectItem value="Taraba">Taraba</SelectItem>
              <SelectItem value="Yobe">Yobe</SelectItem>
              <SelectItem value="Zamfara">Zamfara</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal">Postal code</Label>
          <Input
            id="postal"
            name="postal"
            placeholder="Enter your postal code"
          />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="useInFuture" className="mr-2" />
        <label htmlFor="useInFuture" className="text-sm">
          Use this information in future
        </label>
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
