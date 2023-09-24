import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { LogoutForm } from "./form/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductCard = (product: {
  id: string;
  name: string;
  price: string;
  imgSrc: string;
}) => {
  return (
    <Link key={product.name} href={`/p/${product.id}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-primary xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.imgSrc}
          alt="product"
          width={300}
          height={400}
          className="w-full object-cover object-center group-hover:opacity-75 aspect-[3/4]"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ₹ {product.price}
      </p>
    </Link>
  );
};

export { ProductCard };
