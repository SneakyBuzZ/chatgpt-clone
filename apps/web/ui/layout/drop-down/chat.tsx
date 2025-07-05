"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@chatgpt/ui";

import { Archive, Ellipsis, Pencil, Share, Trash2 } from "lucide-react";
// import { useDeleteChatSession } from "@/lib/mutations/chat-session";

export default function ChatDropDown() {
  // const { mutateAsync: deleteChatSession } = useDeleteChatSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis
          size={17}
          className="text-neutral-400 opacity-0 group-hover/chat-session:opacity-100 transition-opacity duration-200"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-dark-200 border-0 flex flex-col justify-center items-center text-white rounded-2xl p-[5px]"
      >
        <DropdownMenuItem className="rounded-xl w-full">
          <Share />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl w-full">
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-10/12 h-[0.4px] bg-dark-100" />
        <DropdownMenuItem className="rounded-xl w-full">
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl w-full text-red-400 hover:bg-red-500/10">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
