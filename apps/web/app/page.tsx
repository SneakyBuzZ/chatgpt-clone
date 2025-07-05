"use client";

import NewChatForm from "@/ui/forms/new-chat";
import Hero from "@/ui/layout/hero";
import MainNav from "@/ui/layout/main-nav";
import PrivateNav from "@/ui/layout/private-nav";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <UnauthenticatedView />;

  return (
    <main className="relative flex flex-col items-center justify-center h-full">
      <PrivateNav />
      <h3 className="text-[2rem] text-neutral-200 mb-8">
        What&apos;s on your mind today?
      </h3>
      <NewChatForm type="new" />
    </main>
  );
}

function UnauthenticatedView() {
  return (
    <main className="w-full flex flex-col items-center min-h-screen p-2 px-2">
      <MainNav />
      <Hero />
      <span className="w-full text-center text-sm text-neutral-300">
        By using this app, you agree to our terms of service and privacy policy.
      </span>
    </main>
  );
}
