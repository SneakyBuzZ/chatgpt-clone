import { SidebarProvider } from "@chatgpt/ui";
import React from "react";
import { AppSidebar } from "@/ui/layout/sidebar/app-sidebar";
import MainNav from "../layout/main-nav";

export default function PrivatePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-screen">
        <MainNav />
      </main>
    </SidebarProvider>
  );
}
