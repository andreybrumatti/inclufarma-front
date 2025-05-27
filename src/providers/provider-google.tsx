"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function ProviderGoogle({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}