import { Button, Textarea } from "@chatgpt/ui";
import { PrompSuggestionList } from "@chatgpt/utils";
import { AudioLines, Globe, Paperclip } from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8">
      <h1 className="text-3xl text-white">What can I help with?</h1>
      <div className="flex w-[770px] flex-col rounded-3xl bg-dark-200 p-3">
        <Textarea
          placeholder="Ask anything"
          className="max-h-[200px] border-0 text-lg  font-semibold resize-none text-neutral-100"
        />
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-1">
            <Button size={"sm"} variant={"outline"} className="rounded-full">
              <Paperclip size={17} />
              Attach
            </Button>
            <Button size={"sm"} variant={"outline"} className="rounded-full">
              <Globe size={17} />
              Search
            </Button>
          </div>
          <Button size={"sm"} variant={"secondary"} className="rounded-full">
            <AudioLines />
            Voice
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        {PrompSuggestionList.map((item) => (
          <Button
            key={item.title}
            size={"default"}
            variant={"outline"}
            className="rounded-full gap-2 text-neutral-400 font-normal"
          >
            <item.icon size={17} color={item.color} />
            {item.title}
          </Button>
        ))}
        <Button
          size={"default"}
          variant={"outline"}
          className="rounded-full gap-2 text-neutral-400 font-normal"
        >
          More
        </Button>
      </div>
    </div>
  );
}
