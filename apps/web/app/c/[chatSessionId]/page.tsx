"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCompletion } from "@ai-sdk/react";

import { useGetChatMessages } from "@/lib/queries/message";
import useChatStore from "@/lib/store/chat-store";
import NewChatForm from "@/ui/forms/new-chat";
import ChatBlock from "@/ui/layout/chat-block";
import PrivateNav from "@/ui/layout/private-nav";
import useFileStore from "@/lib/store/file-store";
import { delay } from "@chatgpt/utils";

export default function Page() {
  const path = usePathname();
  const chatSessionId = path.split("/")[2]!;
  useGetChatMessages(chatSessionId);
  const { messages, updateMessage, streamingMessageId } = useChatStore();
  const { reset, uploadedFiles } = useFileStore();

  const { complete, completion } = useCompletion({
    api: `/api/message/${chatSessionId}`,
    onFinish: () => {
      console.log("YES RESET HAPPENING", uploadedFiles.length);
      reset();
      delay(3000).then(() => {
        console.log("YES RESET HAPPENED", uploadedFiles.length);
      });
    },
  });

  const assistantMessageIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, completion, streamingMessageId]);

  useEffect(() => {
    if (assistantMessageIdRef.current && typeof completion === "string") {
      updateMessage(completion, assistantMessageIdRef.current);
    }
  }, [completion, updateMessage]);

  return (
    <main className="relative flex flex-col items-center h-full">
      <div className="sticky top-0 z-50 w-full">
        <PrivateNav />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto w-full py-10">
        <ul className="flex flex-col mx-auto w-[48rem] pt-[50px] pb-[200px] px-1">
          {messages && messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <ChatBlock
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  attachments={message.attachments}
                />
              ))}
            </>
          ) : null}
        </ul>
      </div>

      <div className="z-50 fixed bottom-0 flex justify-center items-center">
        <NewChatForm
          type="existing"
          complete={complete}
          assistantMessageIdRef={assistantMessageIdRef}
        />
      </div>
    </main>
  );
}
