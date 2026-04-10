import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import NavBar from "@/components/custom/navbar/NavBar";
import MSWProvider from "@/components/msw-provider";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Where to Next",
  description: "Find your next meal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", quicksand.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans">
        <MSWProvider>
          <Providers>
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
          </Providers>
        </MSWProvider>
      </body>
    </html>
  );
}
