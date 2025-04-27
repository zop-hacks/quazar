import { HomeIcon, Code, GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
export const brand_name = "Quazar"
export const footer_desc = `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. 1`
export const MainLogo = () => (<Image
    src="/logo.png"
    width={512}
    height={512}
    alt="quazar logo"
  />);
export const FooterLogo = () => <Code />;
export const SmallLogo = () => <GalleryVerticalEnd className="size-4" />
