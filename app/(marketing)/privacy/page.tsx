import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Page() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex flex-col space-y-6">
        <div>
          <h3 className="text-2xl font-medium">Privacy Policy</h3>
        </div>

        <Separator />
      </div>
    </section>
  );
}
