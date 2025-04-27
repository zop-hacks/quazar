import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function CheckYourEmail({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Please Confirm Your Email</CardTitle>
          <CardDescription>
            to generate awesome things!
            <Link href="/login">
          <Button className="w-9/12 my-3">Log in</Button>
          </Link>
          </CardDescription>
          
        </CardHeader>
      </Card>
    </div>
  );
}
