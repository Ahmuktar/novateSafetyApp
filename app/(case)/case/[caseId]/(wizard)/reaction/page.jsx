"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { API_URL } from "@/constant";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/toast"; // Assume you have toast for notifications

// Zod schema for validation
const reactionSchema = z.object({
  reaction: z.string().min(1, "Required"),
  react_start: z.string().min(1, "Required"),
  react_stop: z.string().min(1, "Required"),
  react_state: z.string().min(1, "Required"),
  isSerious: z.boolean(),
  serious: z.array(z.string()).optional(),
});

const ReactionPage = ({ params }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSerious, setIsSerious] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [reactions, setReactions] = useState([
    {
      reaction: "",
      react_start: "",
      react_stop: "",
      react_state: "",
      isSerious: false,
      serious: [],
      history: "",
    },
  ]);

  const handleAddReaction = () => {
    setReactions([
      ...reactions,
      {
        reaction: "",
        react_start: "",
        react_stop: "",
        react_state: "",
        isSerious: false,
        serious: [],
        history: "",
      },
    ]);
  };

  const handleRemoveReaction = (index) => {
    setReactions(reactions.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setReactions((prev) =>
      prev.map((reaction, i) =>
        i === index ? { ...reaction, [field]: value } : reaction
      )
    );
  };

  const handleSeriousEffectSelection = (index, effect) => {
    setReactions((prev) =>
      prev.map((reaction, i) => {
        if (i === index) {
          const serious = reaction.serious.includes(effect)
            ? reaction.serious.filter((e) => e !== effect)
            : [...reaction.serious, effect];

          return {
            ...reaction,
            serious: effect === "Not applicable" ? [] : serious,
          };
        }
        return reaction;
      })
    );
  };

  const handleSeriousChange = (index, isSerious) => {
    setReactions((prev) =>
      prev.map((reaction, i) =>
        i === index ? { ...reaction, isSerious } : reaction
      )
    );
  };

  const submitSingleReaction = async (reactionData) => {
    try {
      // Clone the reactionData to avoid mutating the original state
      const updatedData = { ...reactionData };

      // Remove 'isSerious' before submitting the data
      delete updatedData.isSerious;

      // Convert serious array to a comma-separated string (if needed)
      updatedData.serious = updatedData.serious.join(",");

      updatedData.case_id = params.caseId; // Add case_id if needed

      // Log the final data for submission
      console.log("Data to be submitted:", updatedData);

      // Submit to the API (commented out for now)
      const response = await fetch(`${API_URL}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (response.ok && data.id) {
        console.log(data);
        return data.id;
      } else {
        throw new Error(data.message || "Failed to create reaction");
      }
    } catch (error) {
      console.error("Submission error:", error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    setIsLoading(true);
    setFormErrors({}); // Reset form errors

    // Validate form data using Zod
    const validationResults = reactions.map((reaction) =>
      reactionSchema.safeParse(reaction)
    );

    console.log(validationResults);
    const errors = validationResults.filter((result) => !result.success);

    if (errors.length > 0) {
      // Set form errors for invalid fields
      setFormErrors(
        errors.map((error) => ({
          fieldErrors: error.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        }))
      );
      setIsLoading(false);
      return; // Exit if there are validation errors
    }

    try {
      const submittedReaction = await Promise.all(
        reactions.map((reaction) => submitSingleReaction(reaction))
      );

      if (submittedReaction) {
        router.push(`/case/${params.caseId}/summary`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mt-6">
      {reactions.map((reaction, index) => (
        <div key={index} className="mb-8 border p-4 rounded-md">
          <h2>Reaction {reactions.length > 1 && index + 1}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor={`reaction-${index}`}>
                Side effect/Reaction <span className="text-red-600">*</span>
              </Label>
              <Input
                id={`reaction-${index}`}
                name="reaction"
                required
                value={reaction.reaction}
                onChange={(e) =>
                  handleInputChange(index, "reaction", e.target.value)
                }
              />

              {formErrors.length > 0 &&
                formErrors.map((errorSet, index) =>
                  errorSet.fieldErrors.map(
                    (error) =>
                      error.field === "reaction" && (
                        <p
                          key={`${index}-${error.field}`}
                          className="text-red-600 text-sm"
                        >
                          {error.message}
                        </p>
                      )
                  )
                )}
            </div>

            <div>
              <Label htmlFor={`reactstart-${index}`}>
                Side effect/Reaction Start Date?{" "}
                <span className="text-red-600">*</span>
              </Label>
              <Input
                id={`reactstart-${index}`}
                name="react_start"
                type="date"
                value={reaction.react_start}
                onChange={(e) =>
                  handleInputChange(index, "react_start", e.target.value)
                }
              />
              {formErrors.length > 0 &&
                formErrors.map((errorSet, index) =>
                  errorSet.fieldErrors.map(
                    (error) =>
                      error.field === "react_start" && (
                        <p
                          key={`${index}-${error.field}`}
                          className="text-red-600 text-sm"
                        >
                          {error.message}
                        </p>
                      )
                  )
                )}
            </div>

            <div>
              <Label htmlFor={`reactstate-${index}`}>
                Is the side effect/reaction still occurring?
              </Label>
              <Select
                value={reaction.react_state}
                onValueChange={(value) =>
                  handleInputChange(index, "react_state", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select from list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recovered/resolved">
                    Recovered/resolved
                  </SelectItem>
                  <SelectItem value="Recovering/resolving">
                    Recovering/resolving
                  </SelectItem>
                  <SelectItem value="Not recovered/resolved">
                    Not recovered/resolved
                  </SelectItem>
                  <SelectItem value="Recovered/resolved with sequelae">
                    Recovered/resolved with sequelae
                  </SelectItem>
                  <SelectItem value="Fatal">Fatal</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>

              {formErrors.length > 0 &&
                formErrors.map((errorSet, index) =>
                  errorSet.fieldErrors.map(
                    (error) =>
                      error.field === "react_state" && (
                        <p
                          key={`${index}-${error.field}`}
                          className="text-red-600 text-sm"
                        >
                          {error.message}
                        </p>
                      )
                  )
                )}
            </div>

            <div>
              <Label htmlFor={`reactstop-${index}`}>
                Reaction Stop Date <span className="text-red-600">*</span>
              </Label>
              <Input
                id={`reactstop-${index}`}
                name="react_stop"
                type="date"
                value={reaction.react_stop}
                onChange={(e) =>
                  handleInputChange(index, "react_stop", e.target.value)
                }
              />

              {formErrors.length > 0 &&
                formErrors.map((errorSet, index) =>
                  errorSet.fieldErrors.map(
                    (error) =>
                      error.field === "react_stop" && (
                        <p
                          key={`${index}-${error.field}`}
                          className="text-red-600 text-sm"
                        >
                          {error.message}
                        </p>
                      )
                  )
                )}
            </div>

            <div>
              <Label>
                Is the reaction/side effect serious?{" "}
                <span className="text-red-600">*</span>
              </Label>
              <div className="flex space-x-4">
                <Button
                  variant={reaction.isSerious ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSeriousChange(index, true)}
                >
                  Yes
                </Button>
                <Button
                  variant={!reaction.isSerious ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSeriousChange(index, false)}
                >
                  No
                </Button>
              </div>
            </div>

            {reaction.isSerious && (
              <div>
                <Label>
                  If it is serious, what did the reaction/Side effect lead to:{" "}
                  <span className="text-red-600">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Death",
                    "Life threatening",
                    "Caused prolonged hospitalization",
                    "Disabling/Incapacitating",
                    "Congenital anomaly/Birth defect",
                    "Other medical important",
                    "Not applicable",
                  ].map((effect) => (
                    <Button
                      key={effect}
                      variant={
                        reaction.serious.includes(effect)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSeriousEffectSelection(index, effect)
                      }
                    >
                      {effect}
                    </Button>
                  ))}
                </div>

                {formErrors.length > 0 &&
                  formErrors.map((errorSet, index) =>
                    errorSet.fieldErrors.map(
                      (error) =>
                        error.field === "serious" && (
                          <p
                            key={`${index}-${error.field}`}
                            className="text-red-600 text-sm"
                          >
                            {error.message}
                          </p>
                        )
                    )
                  )}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor={`history-${index}`}>
              Please give a short description of any relevant medical history
            </Label>
            <Textarea
              id={`history-${index}`}
              name="history"
              required
              value={reaction.history}
              onChange={(e) =>
                handleInputChange(index, "history", e.target.value)
              }
            />

            <small>
              This is important to help our understanding of other factors that
              may have contributed to the reaction(s)event(s)
            </small>
          </div>

          {index !== 0 && (
            <div className="flex justify-end space-x-4">
              <Button
                variant="link"
                onClick={() => handleRemoveReaction(index)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-4">
        <Button variant="link" onClick={handleAddReaction}>
          Add another reaction/side effect
        </Button>
      </div>

      <div className="flex justify-between space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/case/${params.caseId}/medicine`)}
        >
          Back
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReactionPage;
