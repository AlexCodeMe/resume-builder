import LoadingButton from "@/components/loading-button";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/zod";
import { WandSparkles } from "lucide-react";
import React, { useState } from "react";
import { generateSummary } from "./actions";
import usePremiumModal from "@/hooks/use-premium-modal";
import { useSubscriptionLevel } from "@/app/(main)/_components/subscription-level-provider";
import { canUseAITools } from "@/lib/permissions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
    
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
