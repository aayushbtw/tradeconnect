import { redirect } from "next/navigation";
import Image from "next/image";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";

export default async function Page({ params }: { params: { brand: string } }) {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }

  const brand = await db.kyc.findFirst({ where: { brand_name: params.brand } });
  if (!brand) redirect("/");

  const products = await db.product.findMany({
    where: { brand_name: params.brand },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="py-20 flex flex-col space-y-6">
        <Image
          src="/placeholder.jpg"
          alt="brand name"
          width={200}
          height={200}
          className="h-auto object-cover transition-all rounded-full aspect-[3/3] mx-auto"
        />
        <div className="mx-auto">
          <h3 className="text-4xl tracking-wide	font-medium">
            {brand.brand_name}
          </h3>
        </div>
      </div>

      <div className="pb-10">
        <h2 className="text-2xl pb-4">Products</h2>
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
  );
}
