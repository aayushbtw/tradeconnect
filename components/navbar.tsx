import Link from "next/link";
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

const Navbar = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/">{siteConfig.name}</Link>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-3">
            <Link href={"/brands"} className="text-sm">
              Brands
            </Link>
            <Link href={"/products"} className="text-sm">
              Products
            </Link>
            <Link href={"/city"} className="text-sm">
              City
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  {/* <AvatarImage src="..." /> */}
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/store" className="w-full">
                    Sell
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutForm />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
