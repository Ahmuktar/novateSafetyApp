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
import { Textarea } from "@/components/ui/textarea";
import { DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ReactionPage = ({ params }) => {
  const router = useRouter();
  const [reactions, setReactions] = useState([
    { reactionData: [], isSerious: false, seriousEffects: [] },
  ]);

  const handleAddReaction = () => {
    setReactions([...reactions, { isSerious: false, seriousEffects: [] }]);
  };

  const handleRemoveReaction = (index) => {
    setReactions(reactions.filter((_, i) => i !== index));
  };

  const handleSeriousEffectSelection = (index, effect) => {
    setReactions((prev) =>
      prev.map((reaction, i) => {
        if (i === index) {
          const seriousEffects = reaction.seriousEffects.includes(effect)
            ? reaction.seriousEffects.filter((e) => e !== effect)
            : [...reaction.seriousEffects, effect];

          return {
            ...reaction,
            seriousEffects: effect === "Not applicable" ? [] : seriousEffects,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    // await fetch(`/api/case/${params.caseId}/reporter`, {
    //   method: "POST",
    //   body: formData,
    // })
    router.push(`/case/${params.caseId}/summary`);
  };

  return (
    <div className="mt-6">
      {reactions.map((reaction, index) => (
        <div key={index} className="mb-8 border p-4 rounded-md">
          <h2>Reaction {reactions.length > 1 && index + 1}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor={`reaction-${index}`}>
                Side effect/Reaction *
              </Label>
              <Input id={`reaction-${index}`} name="react" required />
            </div>

            <div>
              <Label htmlFor={`reactstart-${index}`}>
                Side effect/Reaction Start Date? *
              </Label>
              <Input id={`reactstart-${index}`} name="reactstart" type="date" />
              <small className="text-muted">Select date</small>
            </div>

            <div>
              <Label htmlFor={`reactstate-${index}`}>
                Is the side effect/reaction still occurring, or has it resolved?
              </Label>
              <Select name={`reactstate-${index}`}>
                <SelectTrigger id={`ageunit-${index}`}>
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
              <small className="text-muted">Please select</small>
            </div>

            <div>
              <Label htmlFor={`reactstop-${index}`}>
                If the side effect/reaction has resolved, when did the reaction
                stop? *
              </Label>
              <Input id={`reactstop-${index}`} name="reactstop" type="date" />
              <small className="text-muted">Select date</small>
            </div>

            <div>
              <Label>Is the reaction/side effect serious? *</Label>
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
                  If it is serious, what did the reaction/Side effect lead to: *
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
                        reaction.seriousEffects.includes(effect)
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
              </div>
            )}
          </div>

          {index !== 0 && (
            <div className="flex justify-end space-x-4">
              <Button
                variant="link"
                onClick={() => handleRemoveReaction(index)}
              >
                Remove
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      ))}

      {reactions.length < 2 && (
        <div className="flex justify-end space-x-4">
          <Button variant="link" onClick={handleAddReaction}>
            Add another reaction/side effect
          </Button>
        </div>
      )}
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
