"use client";

import { useCallback, useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

// Zod schema for validation
const reactionSchema = z.object({
  reaction: z.string().min(1, "Reaction is required"),
  react_start: z.string().min(1, "Start date is required"),
  react_stop: z.string().min(1, "Stop date is required"),
  react_state: z.string().min(1, "State is required"),
  isSerious: z.boolean(),
  serious: z.array(z.string()).optional().default([]),
  history: z.string().optional().default(""),
});

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const ReactionPage = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    if (reactions.length > 1) {
      setReactions(reactions.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = useCallback((index, field, value) => {
    setReactions((prev) =>
      prev.map((reaction, i) =>
        i === index ? { ...reaction, [field]: value } : reaction
      )
    );
  }, []);

  const handleSeriousEffectSelection = useCallback((index, effect) => {
    setReactions((prev) =>
      prev.map((reaction, i) => {
        if (i === index) {
          let serious = [...(reaction.serious || [])];

          if (effect === "Not applicable") {
            serious = ["Not applicable"];
          } else {
            if (serious.includes("Not applicable")) {
              serious = [];
            }
            serious = serious.includes(effect)
              ? serious.filter((e) => e !== effect)
              : [...serious, effect];
          }

          return {
            ...reaction,
            serious,
            isSerious: serious.length > 0,
          };
        }
        return reaction;
      })
    );
  }, []);

  const handleSeriousChange = useCallback((index, isSerious) => {
    setReactions((prev) =>
      prev.map((reaction, i) =>
        i === index
          ? {
              ...reaction,
              isSerious,
              serious: isSerious ? reaction.serious : [],
            }
          : reaction
      )
    );
  }, []);

  useEffect(() => {
    const fetchReactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/reactions/${params.caseId}`);
        if (!response.ok) throw new Error("Failed to fetch reactions");

        const data = await response.json();
        if (data && data.length > 0) {
          setReactions(
            data.map((reaction) => ({
              ...reaction,
              react_start: formatDate(reaction.react_start),
              react_stop: formatDate(reaction.react_stop),
              serious: reaction.serious ? reaction.serious.split(",") : [],
              isSerious: reaction.serious ? true : false,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
        alert("Failed to fetch reactions");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.caseId) {
      fetchReactions();
    }
  }, [params.caseId]);

  const submitSingleReaction = useCallback(
    async (reactionData) => {
      const updatedData = { ...reactionData };
      updatedData.case_id = params.caseId;
      updatedData.serious = updatedData.serious.join(",");
      updatedData.react_start = formatDate(updatedData.react_start);
      updatedData.react_stop = formatDate(updatedData.react_stop);
      delete updatedData.isSerious;
      delete updatedData.created_at;
      delete updatedData.updated_at;

      const endpoint = updatedData.id
        ? `${API_URL}/reactions/${updatedData.id}`
        : `${API_URL}/reactions`;
      const method = updatedData.id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit reaction");
      }

      return response.json();
    },
    [params.caseId]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors([]);

    try {
      // Validate all reactions
      const validationResults = reactions.map((reaction) =>
        reactionSchema.safeParse(reaction)
      );

      const errors = validationResults.filter((result) => !result.success);
      if (errors.length > 0) {
        setFormErrors(
          errors.map((error) => ({
            fieldErrors: error.error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          }))
        );
        return;
      }

      // Submit all reactions
      await Promise.all(
        reactions.map((reaction) => submitSingleReaction(reaction))
      );
      router.push(`/case/${params.caseId}/summary`);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to submit reactions");
    } finally {
      setIsLoading(false);
    }
  };

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const handleSaveDraft = async () => {
    setIsDraftLoading(true);
    try {
      // Submit all reactions with draft status
      await Promise.all(
        reactions.map((reaction) => {
          const draftData = { ...reaction };
          draftData.case_id = params.caseId;
          draftData.serious = draftData.serious.join(",");
          draftData.react_start = formatDate(draftData.react_start);
          draftData.react_stop = formatDate(draftData.react_stop);
          delete draftData.isSerious;
          delete draftData.created_at;
          delete draftData.updated_at;

          const endpoint = draftData.id
            ? `${API_URL}/reactions/${draftData.id}`
            : `${API_URL}/reactions`;
          const method = draftData.id ? "PUT" : "POST";

          return fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(draftData),
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to save draft");
            }
            return response.json();
          });
        })
      );

      // Update case status to draft
      await fetch(`${API_URL}/cases/${params.caseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "draft" }),
      });

      toast({
        title: "Draft saved successfully!",
        description: "Your changes have been saved as a draft.",
      });
      // router.push("/dashboard");
    } catch (error) {
      console.error("Draft saving error:", error);
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

  if (isLoading || isDraftLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      {isLoading || (isDraftLoading && <Loader />)}

      {reactions.map((reaction, index) => (
        <div key={index} className="mb-8 border p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">
            Reaction {reactions.length > 1 && index + 1}
          </h2>
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
                disabled={isLoading}
              />
              {formErrors[index]?.fieldErrors?.map((error) =>
                error.field === "reaction" ? (
                  <p key={error.message} className="text-red-600 text-sm mt-1">
                    {error.message}
                  </p>
                ) : null
              )}
            </div>

            <div>
              <Label htmlFor={`reactstart-${index}`}>
                Side effect/Reaction Start Date{" "}
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
                disabled={isLoading}
              />
              {formErrors[index]?.fieldErrors?.map((error) =>
                error.field === "react_start" ? (
                  <p key={error.message} className="text-red-600 text-sm mt-1">
                    {error.message}
                  </p>
                ) : null
              )}
            </div>

            <div>
              <Label htmlFor={`reactstate-${index}`}>
                Is the side effect/reaction still occurring?{" "}
                <span className="text-red-600">*</span>
              </Label>
              <Select
                value={reaction.react_state}
                onValueChange={(value) =>
                  handleInputChange(index, "react_state", value)
                }
                disabled={isLoading}
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
              {formErrors[index]?.fieldErrors?.map((error) =>
                error.field === "react_state" ? (
                  <p key={error.message} className="text-red-600 text-sm mt-1">
                    {error.message}
                  </p>
                ) : null
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
                disabled={isLoading}
              />
              {formErrors[index]?.fieldErrors?.map((error) =>
                error.field === "react_stop" ? (
                  <p key={error.message} className="text-red-600 text-sm mt-1">
                    {error.message}
                  </p>
                ) : null
              )}
            </div>

            <div>
              <Label>
                Is the reaction/side effect serious?{" "}
                <span className="text-red-600">*</span>
              </Label>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={reaction.isSerious ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSeriousChange(index, true)}
                  disabled={isLoading}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!reaction.isSerious ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSeriousChange(index, false)}
                  disabled={isLoading}
                >
                  No
                </Button>
              </div>
            </div>

            {reaction.isSerious && (
              <div className="col-span-2">
                <Label>
                  If it is serious, what did the reaction/Side effect lead to:{" "}
                  <span className="text-red-600">*</span>
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
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
                      type="button"
                      variant={
                        reaction.serious.includes(effect)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSeriousEffectSelection(index, effect)
                      }
                      disabled={isLoading}
                    >
                      {effect}
                    </Button>
                  ))}
                </div>
                {formErrors[index]?.fieldErrors?.map((error) =>
                  error.field === "serious" ? (
                    <p
                      key={error.message}
                      className="text-red-600 text-sm mt-1"
                    >
                      {error.message}
                    </p>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor={`history-${index}`}>
              Please give a short description of any relevant medical history
            </Label>
            <Textarea
              id={`history-${index}`}
              name="history"
              value={reaction.history}
              onChange={(e) =>
                handleInputChange(index, "history", e.target.value)
              }
              disabled={isLoading}
              className="mt-1"
            />
            <small className="text-gray-500 block mt-1">
              This is important to help our understanding of other factors that
              may have contributed to the reaction(s)/event(s)
            </small>
          </div>

          {index !== 0 && (
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveReaction(index)}
                disabled={isLoading}
              >
                Remove Reaction
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end mb-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddReaction}
          disabled={isLoading}
        >
          Add another reaction/side effect
        </Button>
      </div>

      <div className="flex justify-between space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/case/${params.caseId}/medicine`)}
          disabled={isLoading}
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
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReactionPage;
