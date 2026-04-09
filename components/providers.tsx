"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { UserProvider } from "@/context/user-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            toast.error(`Oops: ${(err as Error).message}`);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          {children}
          <Toaster position="top-right" />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
