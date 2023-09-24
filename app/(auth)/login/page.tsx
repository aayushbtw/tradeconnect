import Link from "next/link";

import { LoginForm } from "@/components/form/login";

export default function AuthenticationPage() {
  return (
    <>
      {/* <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:px-0"> */}
      <div className="container h-full items-center grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign-in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Register now
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
