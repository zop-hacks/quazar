import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
