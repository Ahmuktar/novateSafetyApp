"use client";

import { useState, useEffect } from "react";
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
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/Loader";

// Define schema for medicine validation using Zod
const medicineSchema = z.object({
  medchar: z.string().min(1, "Medicine characterization is required"),
  name: z.string().min(1, "Medicine name is required"),
  manufacturer: z.string().optional(),
  reason: z.string().optional(),
  dose: z.string().optional(),
  dose_unit: z.string().optional(),
  form: z.string().optional(),
  batch: z.string().optional(),
  route: z.string().optional(),
  started: z.string().min(1, "Start date is required"),
  prevent: z.string().optional(),
  stopped: z.string().min(1, "Stop date is required"),
  photo: z.string().nullable(),
});

const medicinesArraySchema = z.array(medicineSchema);

const initialMedicineForm = {
  medchar: "",
  name: "",
  manufacturer: "",
  reason: "",
  dose: "",
  dose_unit: "",
  form: "",
  batch: "",
  route: "",
  started: "",
  prevent: "",
  stopped: "",
  photo: null,
};

export default function MedicinePage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/medicines/${params.caseId}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setMedicines(
              data.map((medicine) => ({
                ...medicine,
                started: medicine.started
                  ? new Date(medicine.started).toISOString().split("T")[0]
                  : "",
                stopped: medicine.stopped
                  ? new Date(medicine.stopped).toISOString().split("T")[0]
                  : "",
              }))
            );
          } else {
            setMedicines([initialMedicineForm]);
          }
        } else {
          setMedicines([initialMedicineForm]);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setMedicines([initialMedicineForm]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, [params.caseId]);

  const handlePictureToggle = (index, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      photo: value ? "" : null,
    };
    setMedicines(updatedMedicines);
  };

  const handlePictureUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index] = {
          ...updatedMedicines[index],
          photo: reader.result,
        };
        setMedicines(updatedMedicines);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { ...initialMedicineForm }]);
    setErrors([...errors, {}]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    setErrors(updatedErrors);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: value,
    };
    setMedicines(updatedMedicines);
  };

  const validateMedicines = () => {
    try {
      medicinesArraySchema.parse(medicines);
      setErrors([]);
      return true;
    } catch (error) {
      const formattedErrors = error.errors.map((err) => ({
        [err.path[1]]: err.message,
      }));
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateMedicines()) return;

    setIsLoading(true);
    try {
      const formattedMedicines = medicines.map((medicine) => ({
        ...medicine,
        started: formatDate(medicine.started),
        stopped: formatDate(medicine.stopped),
        case_id: params.caseId,
      }));

      const promises = formattedMedicines.map((medicine) => {
        const cleanMedicineData = {
          medchar: medicine.medchar,
          name: medicine.name,
          manufacturer: medicine.manufacturer,
          reason: medicine.reason,
          dose: medicine.dose,
          dose_unit: medicine.dose_unit,
          form: medicine.form,
          batch: medicine.batch,
          route: medicine.route,
          started: medicine.started,
          prevent: medicine.prevent,
          stopped: medicine.started,
          photo: medicine.photo,
          case_id: params.caseId,
        };
        const method = medicine.id ? "PUT" : "POST";
        const url = medicine.id
          ? `${API_URL}/medicines/${medicine.id}`
          : `${API_URL}/medicines`;
        return fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanMedicineData),
        });
      });

      const responses = await Promise.all(promises);
      const allResponsesOk = responses.every((response) => response.ok);

      if (!allResponsesOk) throw new Error("Failed to save medicines");

      toast({
        title: "Medicine Added Successfully",
        description: "Medicines saved successfully.",
      });
      router.push(`/case/${params.caseId}/reaction`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save medicines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const handleSaveDraft = async () => {
    setIsDraftLoading(true);
    try {
      const formattedMedicines = medicines.map((medicine) => ({
        ...medicine,
        started: formatDate(medicine.started),
        stopped: formatDate(medicine.stopped),
        case_id: params.caseId,
      }));

      const promises = formattedMedicines.map((medicine) => {
        const cleanMedicineData = {
          medchar: medicine.medchar,
          name: medicine.name,
          manufacturer: medicine.manufacturer,
          reason: medicine.reason,
          dose: medicine.dose,
          dose_unit: medicine.dose_unit,
          form: medicine.form,
          batch: medicine.batch,
          route: medicine.route,
          started: medicine.started,
          prevent: medicine.prevent,
          stopped: medicine.started,
          photo: medicine.photo,
          case_id: params.caseId,
        };
        const method = medicine.id ? "PUT" : "POST";
        const url = medicine.id
          ? `${API_URL}/medicines/${medicine.id}`
          : `${API_URL}/medicines`;
        return fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanMedicineData),
        });
      });

      const responses = await Promise.all(promises);
      const allResponsesOk = responses.every((response) => response.ok);

      if (!allResponsesOk) throw new Error("Failed to save medicines");

      toast({
        title: "Draft saved successfully!",
        description: "Your changes have been saved as a draft.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      {isLoading || (isDraftLoading && <Loader />)}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {medicines?.map((medicine, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Medicine {medicines.length > 1 && index + 1}
              </h2>
              <div className="flex space-x-2">
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleRemoveMedicine(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddMedicine}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`medchar-${index}`}>
                  Medicine characterization
                  <span className="text-red-600">*</span>
                </Label>
                <Select
                  id={`medchar-${index}`}
                  value={medicine.medchar}
                  onValueChange={(value) =>
                    handleInputChange(index, "medchar", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select from list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Suspected Drug">
                      Suspected Drug
                    </SelectItem>
                    <SelectItem value="Concomitant Drug">
                      Concomitant Drug
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors[index]?.medchar && (
                  <p className="text-red-600 text-sm">
                    {errors[index].medchar}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>
                  Medicine name
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id={`name-${index}`}
                  value={medicine.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                {errors[index]?.name && (
                  <p className="text-red-600 text-sm">{errors[index].name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`manufacturer-${index}`}>
                  Name of the Manufacturer
                </Label>
                <Select
                  id={`manufacturer-${index}`}
                  value={medicine.manufacturer}
                  onValueChange={(value) =>
                    handleInputChange(index, "manufacturer", value)
                  }
                >
                  <SelectTrigger>
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
                <Label htmlFor={`reason-${index}`}>
                  Reason for taking medicine
                </Label>
                <Input
                  id={`reason-${index}`}
                  value={medicine.reason}
                  onChange={(e) =>
                    handleInputChange(index, "reason", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dose-${index}`}>Medicine dose number</Label>
                <Input
                  id={`dose-${index}`}
                  value={medicine.dose}
                  onChange={(e) =>
                    handleInputChange(index, "dose", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dose_unit-${index}`}>
                  Dose unit (e.g. ml, mg)
                </Label>
                <Select
                  id={`dose_unit-${index}`}
                  value={medicine.dose_unit}
                  onValueChange={(value) =>
                    handleInputChange(index, "dose_unit", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select from list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KG Kilogram(s)">
                      KG Kilogram(s)
                    </SelectItem>
                    <SelectItem value="G gram(s)">G gram(s)</SelectItem>
                    <SelectItem value="MG Milligram(s)">
                      MG Milligram(s)
                    </SelectItem>
                    <SelectItem value="μg microgram(s)">
                      μg microgram(s)
                    </SelectItem>
                    <SelectItem value="ng nanogram(s)">
                      ng nanogram(s)
                    </SelectItem>
                    <SelectItem value="pg picogram(s)">
                      pg picogram(s)
                    </SelectItem>
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

              <div className="space-y-2">
                <Label htmlFor={`form-${index}`}>Medicine form</Label>
                <Select
                  id={`form-${index}`}
                  value={medicine.form}
                  onValueChange={(value) =>
                    handleInputChange(index, "form", value)
                  }
                >
                  <SelectTrigger>
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
                <Label htmlFor={`route-${index}`}>
                  Route of administration
                </Label>
                <Select
                  id={`route-${index}`}
                  value={medicine.route}
                  onValueChange={(value) =>
                    handleInputChange(index, "route", value)
                  }
                >
                  <SelectTrigger>
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
                    <SelectItem value=" Intradermal">Intradermal</SelectItem>
                    <SelectItem value="Nasal">Nasal</SelectItem>
                    <SelectItem value="Pulmonary">Pulmonary</SelectItem>
                    <SelectItem value="Topical">Topical</SelectItem>
                    <SelectItem value="Transdermal">Transdermal</SelectItem>
                    <SelectItem value="Intraperitoneal">
                      Intraperitoneal
                    </SelectItem>
                    <SelectItem value="Intraarticular">
                      Intraarticular
                    </SelectItem>
                    <SelectItem value="Intrathecal">Intrathecal</SelectItem>
                    <SelectItem value="Subconjunctival">
                      Subconjunctival
                    </SelectItem>
                    <SelectItem value="Intraocular">Intraocular</SelectItem>
                    <SelectItem value="Vaginal">Vaginal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`batch-${index}`}>Batch number</Label>
                <Input
                  id={`batch-${index}`}
                  value={medicine.batch}
                  onChange={(e) =>
                    handleInputChange(index, "batch", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`started-${index}`}>
                  Date medicine started
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id={`started-${index}`}
                  type="date"
                  value={medicine.started}
                  onChange={(e) =>
                    handleInputChange(index, "started", e.target.value)
                  }
                />
                {errors[index]?.started && (
                  <p className="text-red-600 text-sm">
                    {errors[index].started}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`stopped-${index}`}>
                  Date medicine stopped
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id={`stopped-${index}`}
                  type="date"
                  value={medicine.stopped}
                  onChange={(e) =>
                    handleInputChange(index, "stopped", e.target.value)
                  }
                />
                {errors[index]?.stopped && (
                  <p className="text-red-600 text-sm">
                    {errors[index].stopped}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`hasPicture-${index}`}
                    checked={medicine.photo !== null}
                    onCheckedChange={(value) =>
                      handlePictureToggle(index, value)
                    }
                  />
                  <Label htmlFor={`hasPicture-${index}`}>Add Picture</Label>
                </div>
                {medicine.photo !== null && (
                  <div className="space-y-2">
                    <Input
                      id={`picture-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handlePictureUpload(index, e.target.files[0])
                      }
                    />
                    {medicine.photo && (
                      <img
                        src={medicine.photo}
                        alt="Medicine"
                        className="max-w-xs max-h-40 object-contain"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/case/${params.caseId}/patient`)}
          >
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
