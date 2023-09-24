import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProductForm } from "@/components/form/create-product";
import { ProductCard } from "@/components/product-card";

export default async function Page() {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const isKyc = await db.kyc.findFirst({
    where: { user_id: session.user.userId },
  });
  if (!isKyc) {
    redirect("/kyc");
  }
  const products = await db.product.findMany({
    where: { user_id: session.user.userId },
  });
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Your Products</h3>
            <p className="text-sm text-muted-foreground">
              List of all of your products.
            </p>
          </div>

          <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "outline" })}>
              Create
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
              </DialogHeader>
              <CreateProductForm />
            </DialogContent>
          </Dialog>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 xl:gap-x-8">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imgSrc="/p1.jpg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
