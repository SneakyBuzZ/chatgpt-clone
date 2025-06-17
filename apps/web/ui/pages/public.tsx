"use client";

import Hero from "@/ui/layout/hero";
import MainNav from "@/ui/layout/main-nav";
import React from "react";

export default function PublicPage() {
  return (
    <>
      <main className="w-full flex flex-col items-center min-h-screen p-2 px-2">
        <MainNav />
        <Hero />
        <span className="w-full text-center text-sm text-neutral-300">
          By using this app, you agree to our terms of service and privacy
          policy.
        </span>
      </main>
    </>
  );
}
