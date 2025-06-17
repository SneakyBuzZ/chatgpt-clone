import React from "react";
import { CircleHelp } from "lucide-react";
import { InfoDropDownList } from "@chatgpt/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  Button,
} from "@chatgpt/ui";

export default function Info() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="px-2">
          <CircleHelp color="white" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-0 w-[280px] rounded-2xl shadow-lg shadow-neutral-900/70 bg-dark-200 text-white p-[5px]"
        align="end"
      >
        {InfoDropDownList.map((item) => (
          <div key={item.label}>
            <DropdownMenuItem>
              <item.icon />
              {item.label}
            </DropdownMenuItem>
            {item.seperator && (
              <DropdownMenuSeparator className="w-[95%] mx-auto h-[0.5px]" />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
