"use client";

import NewChatForm from "@/ui/forms/new-chat";
import PublicPage from "@/ui/pages/public";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <PublicPage />;
  }

  return (
    <main className="relative flex flex-col h-full">
      <NewChatForm type="new" />
    </main>
  );
}
