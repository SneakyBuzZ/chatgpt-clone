"use client";

import Hero from "@/ui/layout/hero";
import MainNav from "@/ui/layout/main-nav";
import NewChatPage from "@/ui/shared/new-chat-page";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <UnauthenticatedView />;

  return <NewChatPage />;
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
