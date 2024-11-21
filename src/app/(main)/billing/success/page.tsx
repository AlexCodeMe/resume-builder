import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Billing Success</h1>
      <p>
        You have successfully subscribed to the premium plan. You can now use
        all the features of the premium plan.
      </p>
      <Button asChild>
        <Link href="/resumes">Go to Resumes</Link>
      </Button>
    </div>
  );
}
