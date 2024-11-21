"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import React from "react";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button variant="premium" onClick={() => premiumModal.setOpen(true)}>
      Get
    </Button>
  );
}
