"use client";

import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "../actions";

export default function ManageSubscriptionButton() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const url = await createCustomerPortalSession();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to manage subscription",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage Subscription
    </LoadingButton>
  );
}
