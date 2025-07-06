import { Sidebar, SidebarContent, SidebarFooter } from "@chatgpt/ui";
import Header from "@/ui/layout/sidebar/header";
import Groups from "@/ui/layout/sidebar/groups";
import Footer from "@/ui/layout/sidebar/footer";

export function AppSidebar() {
  return (
    <Sidebar className="hidden sm:flex">
      <Header />
      <SidebarContent className="text-neutral-100 gap-2">
        <Groups />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
