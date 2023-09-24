import { redirect } from "next/navigation";
import Image from "next/image";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }

  if (!params.product) redirect("/");

  const product = await db.product.findFirst({
    where: { id: params.product },
  });
  if (!product) redirect("/");

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex space-y-6 gap-4">
        <Image
          alt="Sneaker Image"
          className="aspect-[1/1] object-cover object-center"
          data-id="3"
          height="500"
          src="/placeholder.jpg"
          width="500"
        />
        <div className="py-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter">
              {product.name}
            </h1>
            <p
              className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50"
              data-id="17"
            >
              ₹ {product.price}
            </p>
            <p
              className="text-base text-zinc-500 dark:text-zinc-400"
              data-id="18"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          <div className="ml-auto">
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
