"use client";

// @ts-nocheck

import { useGetChatSessions } from "@/lib/queries/chat-session";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@chatgpt/ui";
import { cn } from "@chatgpt/utils";
import { CirclePlay, Grid2x2, Images, Search, SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Groups() {
  const param = usePathname();
  const [path, setPath] = useState(param.split("/")[2] || "new");
  const { data, isPending } = useGetChatSessions();

  useEffect(() => {
    setPath(param.split("/")[2] || "new");
  }, [param]);

  return (
    <>
      <GroupOne />
      <GroupTwo />
      {isPending ? null : (
        <>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-normal text-neutral-400 mb-1">
                Chats
              </SidebarGroupLabel>
              {data &&
                data.map((session) => (
                  <Link
                    key={session.id}
                    href={`/c/${session.id}`}
                    className={cn(
                      "block w-full text-left text-sm py-2 px-2 rounded-lg",
                      path === session.id && "bg-neutral-800 text-white"
                    )}
                  >
                    {session.title}
                  </Link>
                ))}
            </SidebarGroup>
          </SidebarMenu>
        </>
      )}
    </>
  );
}

function GroupOne() {
  const router = useRouter();
  return (
    <SidebarGroup key={"functio-group"}>
      <SidebarMenu>
        <SidebarMenuItem key={"new-chat"}>
          <SidebarMenuButton onClick={() => router.push("/")}>
            <SquarePen />
            New chat
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key={"search-chats"}>
          <SidebarMenuButton>
            <Search />
            Search chats
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key={"library"}>
          <SidebarMenuButton>
            <Images />
            Library
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function GroupTwo() {
  return (
    <SidebarGroup key={"gpt-group"}>
      <SidebarMenu>
        <SidebarMenuItem key={"sora"}>
          <SidebarMenuButton>
            <CirclePlay />
            Sora
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem key={"gpts"}>
          <SidebarMenuButton>
            <Grid2x2 />
            GPTs
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
