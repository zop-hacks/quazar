'use client'

import { LoginForm } from "@/components/authentication/login-form";
import { brand_name, SmallLogo } from "@/components/custom/branding";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <SmallLogo />
          </div>
          {brand_name}
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
