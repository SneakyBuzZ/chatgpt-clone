import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/lib/query-provider";
import { SidebarProvider, Toaster } from "@chatgpt/ui";
import { AppSidebar } from "@/ui/layout/sidebar/app-sidebar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "ChatGPT",
  description: "ChatGPT - Your AI Assistant",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ClerkProvider>
        <html lang="en">
          <body>
            <SidebarProvider>
              <AppSidebar />
              <section className="flex flex-col w-full h-screen">
                {children}
              </section>
            </SidebarProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                className: "bg-dark-200 text-white",
              }}
            />
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
