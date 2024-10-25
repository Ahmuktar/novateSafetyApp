"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Calendar,
  User,
  Pill,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { API_URL } from "@/constant";
import { formatDate } from "@/lib/utils";
import SummaryCard from "@/components/SummaryCard";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

export default function SummaryPage({ params }) {
  const { toast } = useToast();
  const caseId = params.caseId;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      const updateResponse = await fetch(`${API_URL}/cases/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "draft" }),
      });

      if (updateResponse.ok) {
        toast({
          title: "Draft saved successfully!",
          description: "Your changes have been saved as a draft.",
        });
      } else {
        const updateData = await updateResponse.json();
        toast({
          title: "Unable to save draft",
          description:
            updateData.message ||
            "There was an issue saving your draft. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Save draft failed",
        description:
          "An unexpected error occurred. Please check your connection or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const updateResponse = await fetch(`${API_URL}/cases/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "submitted" }),
      });

      if (updateResponse.ok) {
        router.push(`/case/${caseId}/success`);
      } else {
        const updateData = await updateResponse.json();
        toast({
          title: "Submission Failed",
          description:
            updateData.message ||
            "An issue occurred while submitting the case. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description:
          error.message ||
          "An unexpected error occurred during submission. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <SummaryCard caseId={caseId} />
      </Suspense>
      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={handleSaveDraft}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Submit Case
        </Button>
      </div>
    </div>
  );
}
