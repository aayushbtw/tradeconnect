import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { SewingPinIcon } from "@radix-ui/react-icons";

import { getPageSession } from "@/auth/lucia";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/product-card";
import { db } from "@/lib/db";

export const itemList = [
  {
    name: "Organizer Set",
    price: "400",
    cover: "/p1.jpg",
  },
  {
    name: "Sketchbooks",
    price: "400",
    cover: "/p2.jpg",
  },
  {
    name: "Pen & Pencil Set",
    price: "400",
    cover: "/p3.jpg",
  },
  {
    name: "Leather Wallet",
    price: "400",
    cover: "/p4.jpg",
  },
  {
    name: "Water Bottle",
    price: "400",
    cover: "/p5.jpg",
  },
  {
    name: "Eartern Mug",
    price: "400",
    cover: "/p6.jpg",
  },
];

export const categoryList = [
  {
    name: "ESSENTIAL",
    cover: "/placeholder.jpg",
  },
  {
    name: "CLOTHING",
    cover: "/placeholder.jpg",
  },
  {
    name: "FOOTWEAR",
    cover: "/placeholder.jpg",
  },
  {
    name: "ELECTRONICS",
    cover: "/placeholder.jpg",
  },
  {
    name: "BACKPACKS",
    cover: "/placeholder.jpg",
  },
  {
    name: "COSMETICS",
    cover: "/placeholder.jpg",
  },
];

function Hero() {
  return (
    <section className="hero">
      <div className="backdrop-brightness-50 h-full items-center grid">
        <div className="mx-auto">
          <h1 className="text-5xl max-w-xl text-center text-white">
            India&apos;s largest Platform for businesses & shop-owners
          </h1>
        </div>
      </div>
    </section>
  );
}

function FeaturedItems() {
  return (
    <section className="container pt-20">
      <h1 className="heading-1">featured items</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex py-10 gap-4">
            {itemList.map((item) => (
              <div className="w-[250px]" key={item.name}>
                <ProductCard
                  key={item.name}
                  id=""
                  name={item.name}
                  price={item.price}
                  imgSrc={item.cover}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}

async function FeaturedBrands() {
  const session = await getPageSession();
  if (!session || !session.user.userId) {
    redirect("/login");
  }
  const brands = await db.kyc.findMany({
    where: { user_id: session.user.userId },
  });
  return (
    <section className="container pt-20">
      <h1 className="heading-1">shop by brands</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex py-10 gap-4">
            {brands.map((item) => (
              <div className="space-y-3 w-[250px]" key={item.brand_name}>
                <Link href={`/brand/${item.brand_name}`}>
                  <div className="overflow-hidden">
                    <Image
                      src={"/placeholder.jpg"}
                      alt={item.brand_name}
                      width={250}
                      height={330}
                      className="h-auto object-cover transition-all rounded-full hover:brightness-90 aspect-[4/4]"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <div className="flex justify-center">
                      <SewingPinIcon className="w-4 h-4" />
                      <h3 className="text-sm text-gray-700">{item.city}</h3>
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {item.brand_name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}

async function ShopByCity() {
  const cities = await db.kyc.groupBy({
    by: "city",
  });
  return (
    <section className="container pt-20">
      <h1 className="heading-1">Shop By City</h1>
      <div className="py-10 grid grid-cols-4 gap-4">
        {cities.map((item) => (
          <div
            className="relative block group transition-all hover:brightness-90"
            key={item.city}
          >
            <Link href={`/city/${item.city}`}>
              <Image
                src={"/placeholder.jpg"}
                alt={item.city}
                width={400}
                height={400}
                className="h-auto relative object-cover aspect-[3/3] brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-primary tracking-[.15em] uppercase text-white">
                  {item.city}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShopByCategory() {
  return (
    <section className="container pt-20">
      <h1 className="heading-1">Shop By Category</h1>
      <div className="py-10 grid grid-cols-3 gap-4">
        {categoryList.map((item) => (
          <div
            className="relative block group transition-all hover:brightness-90"
            key={item.name}
          >
            <Link href={`/c/${item.name}`}>
              <Image
                src={item.cover}
                alt={item.name}
                width={500}
                height={500}
                className="h-auto relative object-cover aspect-[4/4] brightness-75"
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

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBrands />
      <FeaturedItems />
      <ShopByCity />
      <ShopByCategory />
    </>
  );
}
