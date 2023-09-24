import "../../styles/globals.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Inter } from "next/font/google";

import { getPageSession } from "@/auth/lucia";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();
  if (session) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>{children}</body>
    </html>
  );
}
