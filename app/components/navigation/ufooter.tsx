import Link from "next/link";
import { Button } from "@/components/ui/button";
import { footerNavLinks } from "@/components/custom/navLinks";
import { brand_name, footer_desc, FooterLogo } from "@/components/custom/branding";

export function Footer() {
  return (
    <footer className="border-t bg-muted dark:bg-background flex w-screen justify-center">
      <div className="w-screen max-w-screen-xl p-5 flex flex-col md:flex-row items-center justify-between py-10 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <FooterLogo />
          <span className="text-sm font-medium">{brand_name}</span>
        </div>

        <div className="text-center md:text-left max-w-md">
          <p className="text-sm text-muted-foreground">
            {footer_desc}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <nav className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2">
            {footerNavLinks.map((link, index) => (
              <Link className="text-sm hover:underline" href={link.href} key={index}>{link.display_name}</Link>
            )
          )}
          </nav>
          <Button className="w-full md:w-auto">Contact Me</Button>
        </div>
      </div>
    </footer>
  );
}
