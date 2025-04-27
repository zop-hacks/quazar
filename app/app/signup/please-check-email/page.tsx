import { CheckYourEmail } from "@/components/authentication/confirm_request";
import Link from "next/link";
import { SmallLogo, brand_name } from "@/components/custom/branding";
const page = () => {
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
          <CheckYourEmail />
        </div>
      </div>
    );
  }


export default page