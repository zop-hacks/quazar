"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { JSX } from "react";
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const OAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github className="size-5" />,
    },
  ];
  return (
    <>
      {OAuthProviders.map((provider) => (
        <Button
          className="flex items-center justify-center gap-2 w-full"
          variant="outline"
          key={provider.name}
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
