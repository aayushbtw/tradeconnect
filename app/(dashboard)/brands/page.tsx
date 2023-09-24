import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getPageSession } from "@/auth/lucia";
import { db } from "@/lib/db";

export default async function Home() {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const brands = await db.kyc.findMany();
  return (
    <section className="container pt-20">
      <h1 className="heading-1">BRANDS</h1>
      <div className="py-10 grid grid-cols-4 gap-4">
        {brands.map((item) => (
          <div
            className="relative block group transition-all hover:brightness-90"
            key={item.brand_name}
          >
            <Link href={`/brand/${item.brand_name}`}>
              <Image
                src={"/placeholder.jpg"}
                alt={item.city}
                width={400}
                height={400}
                className="h-auto relative object-cover rounded-lg aspect-[3/3] brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-primary tracking-[.15em] uppercase text-white">
                  {item.brand_name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
