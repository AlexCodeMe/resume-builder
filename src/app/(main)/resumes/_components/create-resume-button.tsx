"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  return canCreate ? (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <Link href="/editor">
        <PlusSquare className="mr-2 size-4" />
        Create Resume
      </Link>
    </Button>
  ) : (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="mr-2 size-4" />
      Create Resume
    </Button>
  );
}
