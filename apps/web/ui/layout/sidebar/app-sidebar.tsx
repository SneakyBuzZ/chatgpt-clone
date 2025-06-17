import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@chatgpt/ui";
import Header from "@/ui/layout/sidebar/header";
import Groups from "@/ui/layout/sidebar/groups";
import Footer from "@/ui/layout/sidebar/footer";

export function AppSidebar() {
  return (
    <Sidebar>
      <Header />
      <SidebarContent className="text-neutral-100">
        <Groups />
        <GroupThree />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}

function GroupThree() {
  return (
    <SidebarGroup className=" flex flex-col flex-1 overflow-y-scroll hide-scrollbar">
      <SidebarGroupLabel className="text-neutral-400">Chats</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenuButton className="text-base">
          Summarizing the meeting notes
        </SidebarMenuButton>
        <SidebarMenuButton>Discussing the project plan</SidebarMenuButton>
        <SidebarMenuButton>
          Brainstorming ideas for the new feature
        </SidebarMenuButton>
        <SidebarMenuButton>Reviewing the design mockups</SidebarMenuButton>
        <SidebarMenuButton>Planning the marketing strategy</SidebarMenuButton>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
