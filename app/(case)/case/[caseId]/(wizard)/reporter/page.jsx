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
import { API_URL } from "@/constant";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

// Zod schema for validation
const reporterSchema = z.object({
  describes: z.string().min(1, "Select a description"),
  whois: z.string().min(1, "Select who is reporting"),
  title: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().optional(),
  // useInFuture: z.number().optional(),
});

export default function ReporterPage({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    describes: "",
    whois: "",
    profession: "",
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    useInFuture: false,
  });

  // State to track form errors
  const [formErrors, setFormErrors] = useState({});
  const [showProfession, setShowProfession] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Fetch existing reporter data if it exists
  useEffect(() => {
    const fetchReporter = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/reporters/${params?.caseId}/case`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data) {
            // Populate the form with the existing reporter data
            setFormData({
              describes: data.describes || "",
              whois: data.whois || "",
              profession: data.profession || "",
              title: data.title || "",
              first_name: data.first_name || "",
              last_name: data.last_name || "",
              email: data.email || "",
              phone: data.phone || "",
              company: data.company || "",
              address: data.address || "",
              city: data.city || "",
              state: data.state || "",
              postal_code: data.postal_code || "",
              useInFuture: data.useInFuture || false,
            });
            setShowProfession(data.whois === "Healthcare professional");
          }
        } else {
          throw new Error("Failed to fetch reporter");
        }
      } catch (error) {
        console.error("Error fetching reporter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReporter();
  }, [params?.caseId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitReporter = async (caseId) => {
    try {
      const isExistingReporter =
        formData.email !== "" &&
        formData.first_name !== "" &&
        formData.last_name !== "";

      const url = isExistingReporter
        ? `${API_URL}/reporters/${params?.caseId}`
        : `${API_URL}/reporters`;
      const method = isExistingReporter ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, case_id: caseId }),
      });

      if (!response.ok) throw new Error("Failed to submit reporter.");

      const data = await response.json();
      if (isExistingReporter) {
        router.push(`/case/${params?.caseId}/patient`);
      } else {
        await updateCase(caseId, data.id);
      }
    } catch (error) {
      console.error("Error submitting reporter:", error);
      setIsLoading(false);
    }
  };

  // Function to update the case with the reporter_id
  const updateCase = async (caseId, reporterId) => {
    try {
      const updateResponse = await fetch(`${API_URL}/cases/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reporter_id: reporterId }),
      });

      if (updateResponse.ok) {
        router.push(`/case/${caseId}/patient`);
      } else {
        const updateData = await updateResponse.json();
        throw new Error(updateData.message || "Failed to update case");
      }
    } catch (error) {
      console.error("Error updating case:", error);
      setIsLoading(false);
    }
  };

  const createCase = async () => {
    try {
      const response = await fetch(`${API_URL}/cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.ok && data.caseId) {
        return data.caseId;
      } else {
        throw new Error(data.message || "Failed to create case.");
      }
    } catch (error) {
      console.error("Error creating case:", error);
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setFormErrors({}); // Reset form errors

  //   // Validate form data using Zod
  //   const validation = reporterSchema.safeParse(formData);
  //   if (!validation.success) {
  //     const errors = validation.error.format(); // Get error messages
  //     setFormErrors(errors); // Store errors in state
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const caseId = params?.caseId || (await createCase());
  //     if (caseId) {
  //       await submitReporter(caseId);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    // Validate form data using Zod
    const validation = reporterSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.format();
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      if (params?.caseId) {
        // If caseId exists, update the existing reporter
        await updateReporter(params.caseId);
      } else {
        // If no caseId, create a new case and reporter
        await createCaseAndReporter();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateReporter = async (caseId) => {
    const response = await fetch(`${API_URL}/reporters/${caseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update reporter");
    }

    router.push(`/case/${caseId}/patient`);
  };

  const createCaseAndReporter = async () => {
    // First, create the case with the reporter_id
    const caseResponse = await fetch(`${API_URL}/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });

    if (!caseResponse.ok) {
      throw new Error("Failed to create case");
    }

    const caseData = await caseResponse.json();
    // Then, create the reporter
    const reporterResponse = await fetch(`${API_URL}/reporters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, case_id: caseData.caseId }),
    });

    if (!reporterResponse.ok) {
      throw new Error("Failed to create reporter");
    }

    const reporterData = await reporterResponse.json();

    const updateCaseData = await updateCase(caseData.caseId, reporterData.id);

    router.push(`/case/${caseData.caseId}/patient`);
  };

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const handleSaveDraft = async () => {
    setIsDraftLoading(true);

    try {
      const isExistingReporter =
        formData.email !== "" &&
        formData.first_name !== "" &&
        formData.last_name !== "";

      const url = isExistingReporter
        ? `${API_URL}/reporters/${params?.caseId}`
        : `${API_URL}/reporters`;
      const method = isExistingReporter ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, case_id: params?.caseId }),
      });

      if (!response.ok) throw new Error("Failed to submit reporter.");

      const data = await response.json();

      const updateResponse = await fetch(`${API_URL}/cases/${params?.caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "draft" }),
      });

      toast({
        title: "Draft saved successfully!",
        description: "Your changes have been saved as a draft.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Save draft failed",
        description:
          "An unexpected error occurred. Please check your connection or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDraftLoading(false);
    }
  };

  if (isLoading || isDraftLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      {isLoading || (isDraftLoading && <Loader />)}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
          <div className="space-y-2">
            <Label htmlFor="describes">What best describes you?</Label>
            <Select
              name="describes"
              value={formData.describes}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, describes: value }))
              }
            >
              <SelectTrigger id="describes">
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
            {formErrors.describes && (
              <p className="text-red-600 text-xs">
                {formErrors.describes._errors[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reporter">
              Who is reporting?<span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.whois}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, whois: value }));
                setShowProfession(value === "Healthcare professional");
              }}
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
            {formErrors.whois && (
              <p className="text-red-600 text-xs">
                {formErrors.whois._errors[0]}
              </p>
            )}
          </div>
          {showProfession && (
            <div className="space-y-2">
              <Label htmlFor="profession">
                Profession<span className="text-red-600">*</span>
              </Label>
              <Select
                name="profession"
                value={formData.profession}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, profession: value }))
                }
              >
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
              {formErrors.profession && (
                <p className="text-red-600 text-xs">
                  {formErrors.profession._errors[0]}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Select
              name="title"
              value={formData.title}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, title: value }))
              }
            >
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
            <Label htmlFor="first_name">
              First name<span className="text-red-600">*</span>
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
            {formErrors.first_name && (
              <p className="text-red-600 text-sm">
                {formErrors.first_name._errors[0]}
              </p>
            )}
          </div>

          {/* Form field for 'last_name' */}
          <div className="space-y-2">
            <Label htmlFor="last_name">
              Last name<span className="text-red-600">*</span>
            </Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
            {formErrors.last_name && (
              <p className="text-red-600 text-sm">
                {formErrors.last_name._errors[0]}
              </p>
            )}
          </div>

          {/* Form field for 'email' */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email<span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-600 text-sm">
                {formErrors.email._errors[0]}
              </p>
            )}
          </div>

          {/* Form field for 'phone' */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone number<span className="text-red-600">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {formErrors.phone && (
              <p className="text-red-600 text-sm">
                {formErrors.phone._errors[0]}
              </p>
            )}
          </div>
          {showProfession && (
            <div className="space-y-2">
              <Label htmlFor="company">Hospital/Company/Organisation</Label>
              <Input
                id="company"
                name="company"
                placeholder="Enter your organization"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Town/City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your town or city"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">
              State<span className="text-red-600">*</span>
            </Label>
            <Select
              name="state"
              value={formData.state}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, state: value }))
              }
            >
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
            {formErrors.state && (
              <p className="text-red-600 text-xs">
                {formErrors.state._errors[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal">Postal code</Label>
            <Input
              id="postal"
              name="postal_code"
              placeholder="Enter your postal code"
              value={formData.postal_code}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="useInFuture"
            checked={
              formData?.useInFuture === 1 || formData.useInFuture === true
                ? true
                : false
            } // Controlled checkbox value
            onChange={(e) =>
              setFormData({ ...formData, useInFuture: e.target.checked })
            } // Update the state on change
            className="mr-2"
          />
          <label
            htmlFor="useInFuture"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Use this information in future
          </label>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <div className="gap-5 flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={isDraftLoading}
              className="w-full"
            >
              {isDraftLoading ? "Submitting..." : "Save as draft"}
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
