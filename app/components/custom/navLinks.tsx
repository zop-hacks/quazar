import { HomeIcon, LogIn, CirclePlus, BookOpenText } from "lucide-react";
import { NavLinkProps, NavLinkIconProps } from "@/components/navigation/navtypes";

export const navLinks: Array<NavLinkProps> = [
  {
    display_name: "Home",
    href: "/",
  },
  {
    display_name: "My Quizzes",
    href: "/teach/my-quizzes",
  },
  {
    display_name: "Create Quiz",
    href: "/gen-quiz",
  },
  {
    display_name: "Repo",
    href: "",
  },
];

export const bottomNavLinks: Array<NavLinkIconProps> = [
  {
    display_name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    display_name: "My Quizzes",
    href: "/teach/my-quizzes",
    icon: <BookOpenText />,
  },
  {
    display_name: "Create Quiz",
    href: "/gen-quiz",
    icon: <CirclePlus />,
  },
  {
    display_name: "Login",
    href: "/login",
    icon: <LogIn/>,
  },
];

export const footerNavLinks: Array<NavLinkProps> = [
  {
    display_name: "Home",
    href: "/",
  },
  {
    display_name: "My Quizzes",
    href: "/teach/my-quizzes",
  },
  {
    display_name: "Create Quiz",
    href: "/gen-quiz",
  },
];
