import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/db";

export default async function Home() {
  const products = await db.product.findMany();
  return (
    <section className="container pt-20">
      <h1 className="heading-1">Products</h1>
      <div className="py-10 grid grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            className="relative block group transition-all hover:brightness-90"
            key={item.name}
          >
            <Link href={`/p/${item.id}`}>
              <Image
                src={"/placeholder.jpg"}
                alt={item.name}
                width={400}
                height={400}
                className="h-auto relative object-cover rounded-lg aspect-[3/3] brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-primary tracking-[.15em] uppercase text-white">
                  {item.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
