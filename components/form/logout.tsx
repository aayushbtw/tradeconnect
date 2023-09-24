"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";

export function LogoutForm() {
  const router = useRouter();
  async function onSubmit() {
    const response = await fetch(`/api/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    });

    if (!response?.ok) {
      console.log("error", response);
      return;
    }

    router.push("/login");
  }

  return (
    <button onClick={onSubmit} className="w-full">
      <div className="flex justify-between items-center">
        <span>Sign-out</span>
        <ExitIcon />
      </div>
    </button>
  );
}
