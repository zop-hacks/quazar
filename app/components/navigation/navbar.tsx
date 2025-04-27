"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks } from "@/components/custom/navLinks";
import { MainLogo, SmallLogo } from "@/components/custom/branding";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user: any | null;
  signOut: () => void;
}

export function Navbar({ user, signOut }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md border-b border-border/50"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden">
                <MainLogo />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Quazar
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:justify-center md:space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative group py-2"
              >
                <span className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                  {link.display_name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center justify-center space-x-4">
            {/* User menu or login button */}
            <div className="hidden md:block">
              <div className="flex-shrink-0 flex items-center justify-center">
                {user !== null ? (
                  <form action={signOut}>
                    <Button>Sign Out</Button>
                  </form>
                ) : (
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                )}
              </div>

            </div>
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[350px] pr-0"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center">
                      <SmallLogo />
                      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Quazar
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 ml-3.5 flex flex-col space-y-4">
                    {navLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center py-2 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {link.display_name}
                      </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-border">
                      {user ? (
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 border border-border">
                              <AvatarImage
                                src={user.avatar_url || ""}
                                alt={user.email || "User"}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                                {getUserInitials()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="text-sm font-medium">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <button
                              onClick={() => signOut()}
                              className="flex items-center py-2 text-base font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Link href="/login">
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none">
                            Log In
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
