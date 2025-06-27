"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [queryCLient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
    </>
  );
};

export default Provider;
