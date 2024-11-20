import LoadingButton from "@/components/loading-button";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/zod";
import { WandSparkles } from "lucide-react";
import React, { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // todo: block for non-premium users
    try {
      setLoading(true);
      const summary = await generateSummary(resumeData);
      onSummaryGenerated(summary);
      
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to generate summary",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      type="button"
      variant="outline"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparkles className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
