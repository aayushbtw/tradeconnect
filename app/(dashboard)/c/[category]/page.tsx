import { redirect } from "next/navigation";
import Image from "next/image";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { Separator } from "@/components/ui/separator";

import { ProductCategory } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: { category: ProductCategory };
}) {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }

  if (!params.category) redirect("/");

  const products = await db.product.findMany({
    where: { category: params.category },
  });

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex flex-col space-y-6">
        <h3 className="heading-1">{params.category}</h3>

        <Separator />

        <div className="pb-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                id={product.id}
                name={product.name}
                price={product.price}
                imgSrc={"/p5.jpg"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
