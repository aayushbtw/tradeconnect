import { redirect } from "next/navigation";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { VerifyKycForm } from "@/components/form/verify-kyc";

export default async function Page() {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const isKyc = await db.kyc.findFirst({
    where: { user_id: session.user.userId },
  });
  if (isKyc) {
    redirect("/store");
  }
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex flex-col space-y-6">
        <div>
          <h3 className="text-lg font-medium">Verify KYC</h3>
          <p className="text-sm text-muted-foreground">
            Please verify yourself to get your personal store.
          </p>
        </div>
        <Separator />
        <VerifyKycForm />
      </div>
    </section>
  );
}
