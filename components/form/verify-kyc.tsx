"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  full_name: z.string({ required_error: "Required." }),
  brand_name: z.string({ required_error: "Required." }),
  city: z.string({ required_error: "Required." }),
  gst_number: z.string({ required_error: "Required." }),
  pancard_id: z.string({ required_error: "Required." }),
});

export function VerifyKycForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      brand_name: "",
      city: "",
      gst_number: "",
      pancard_id: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(false);
    setIsLoading(true);
    const response = await fetch(`/api/kyc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: values.full_name,
        brand_name: values.brand_name,
        city: values.city,
        gst_number: values.gst_number,
        pancard_id: values.pancard_id,
      }),
    });
    setIsLoading(false);

    if (!response?.ok) {
      console.log("error", response);
      setError(true);
      return;
    }

    router.push("/store");
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Internal Server Error</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    id="full_name"
                    placeholder="Full Legal Name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand_name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    id="brand_name"
                    placeholder="Your Brand Name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    id="city"
                    placeholder="Your city"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gst_number"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    id="gst_number"
                    placeholder="GST Number"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pancard_id"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input
                    id="pancard_id"
                    placeholder="Pancard ID"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Verify
          </Button>
        </form>
      </Form>
    </div>
  );
}
