import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: { city: string } }) {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }

  if (!params.city) redirect("/");

  const brands = await db.kyc.findMany({
    where: { city: params.city },
  });

  return (
    <section className="container pt-20">
      <h1 className="heading-1">cities</h1>
      <div className="py-10 grid grid-cols-4 gap-4">
        {brands.map((item) => (
          <Link href={`/brand/${item.brand_name}`} key={item.brand_name}>
            <div className="relative block group transition-all hover:brightness-90">
              <Image
                src={"/p6.jpg"}
                alt={item.brand_name}
                width={500}
                height={500}
                className="h-auto relative object-cover aspect-[4/4] brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-primary tracking-[.15em] uppercase text-white">
                  {item.brand_name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
