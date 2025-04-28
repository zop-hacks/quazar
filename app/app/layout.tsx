import type { Metadata } from "next";
import "./globals.css";
import CollapsibleNavbar from "@/components/navigation/unav-collaps";
import { geistMono, geistSans } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Quazar",
  description: "Generate quizzes with AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} inter.className`}
      >
        <CollapsibleNavbar />
        <div className="h-16"></div>
        {children}
      </body>
    </html>
  );
}
