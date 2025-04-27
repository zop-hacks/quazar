"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { bottomNavLinks } from "@/components/custom/navLinks"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="grid grid-cols-4 h-16">
          {bottomNavLinks.map((item, index) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className="relative">
                  {item.icon}
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-t-full bg-primary"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </div>
                <span className="mt-1 text-xs">{item.display_name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
