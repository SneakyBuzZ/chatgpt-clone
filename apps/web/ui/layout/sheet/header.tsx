import { Button, SheetHeader, SheetTrigger } from "@chatgpt/ui";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <SheetHeader className="flex flex-col items-center justify-between w-full">
      <div className="flex justify-between items-center w-full">
        <Button variant={"ghost"} size={"icon"} className="rounded-lg">
          <Image
            src={"/vectors/logo.svg"}
            alt="ChatGPT Logo"
            width={10}
            height={10}
            className="w-6 h-6"
          />
        </Button>
        <div className="hover:bg-dark-300 rounded-lg w-9 h-9 flex items-center justify-center">
          <SheetTrigger className="h-5 w-5 text-neutral-400 flex justify-center items-center">
            <X className="w-5 h-5" />
          </SheetTrigger>
        </div>
      </div>
    </SheetHeader>
  );
}
