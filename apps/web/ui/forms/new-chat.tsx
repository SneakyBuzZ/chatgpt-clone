import { Button, Textarea } from "@chatgpt/ui";
import React from "react";
import { AudioLines, Mic, Plus, Settings2 } from "lucide-react";

export default function NewChatForm() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8">
      <h1 className="text-3xl text-white">Whats on the agenda today?</h1>
      <div className="flex w-[770px] flex-col rounded-3xl bg-dark-200 p-3">
        <Textarea
          placeholder="Ask anything"
          className="max-h-[200px] border-0 text-lg  font-semibold resize-none text-neutral-100"
        />
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-1">
            <Button size={"icon"} variant={"ghost"} className="rounded-full">
              <Plus size={17} />
            </Button>
            <Button size={"sm"} variant={"ghost"} className="rounded-full">
              <Settings2 size={17} />
              Tools
            </Button>
          </div>
          <div className="flex justify-center items-center gap-1">
            <Button size={"icon"} variant={"ghost"} className="rounded-full">
              <Mic size={17} />
            </Button>
            <Button
              size={"icon"}
              variant={"secondary"}
              className="rounded-full"
            >
              <AudioLines size={17} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
