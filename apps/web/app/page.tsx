"use client";

import PrivatePage from "@/ui/pages/private";
import PublicPage from "@/ui/pages/public";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn } = useUser();
  return isSignedIn ? <PrivatePage /> : <PublicPage />;
}
