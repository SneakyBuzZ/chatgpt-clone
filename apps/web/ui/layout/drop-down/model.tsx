import React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
} from "@chatgpt/ui";
import Image from "next/image";

export default function Model() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="px-2 rounded-lg text-lg font-normal"
        >
          ChatGPT
          <ChevronDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-0 w-[320px] rounded-2xl shadow-lg shadow-neutral-900/70 bg-dark-200 text-white p-0"
        align="start"
      >
        <Image
          src="/images/art-bg.webp"
          alt="Art Background"
          width={50}
          height={50}
          className="w-full h-[120px]"
          rel="noopener noreferrer"
        />
        <div className="flex flex-col items-start justify-center p-5 py-6">
          <h3 className="text-lg font-semibold">
            Try advance features for free
          </h3>
          <p className="text-sm text-neutral-300 mb-4 font-medium">
            Get smarter responses, upload files, create images and more by
            logging in.
          </p>
          <div className="flex gap-2">
            <Button className="w-full mt-2">Log in</Button>
            <Button variant="outline" className="w-full mt-2">
              Learn More
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
