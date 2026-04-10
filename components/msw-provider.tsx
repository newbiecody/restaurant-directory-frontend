"use client";

import { useEffect, type ReactNode } from "react";

export default function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;
    import("../src/mocks/browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" })
    );
  }, []);

  return <>{children}</>;
}
