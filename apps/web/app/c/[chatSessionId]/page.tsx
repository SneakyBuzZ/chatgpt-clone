"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCompletion } from "@ai-sdk/react";

import { useGetChatMessages } from "@/lib/queries/message";
import useChatStore from "@/lib/store/chat-store";
import NewChatForm from "@/ui/forms/new-chat";
import ChatBlock from "@/ui/layout/chat-block";
import PrivateNav from "@/ui/layout/private-nav";

export default function Page() {
  const path = usePathname();
  const chatSessionId = path.split("/")[2]!;
  useGetChatMessages(chatSessionId);
  const { messages, updateMessage } = useChatStore();

  const { complete, completion } = useCompletion({
    api: `/api/message/${chatSessionId}`,
  });

  const assistantMessageIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "auto",
      });
    }
    hasMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) return;
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, completion]);

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
        <ul className="mx-auto w-[48rem] space-y-10 pt-4 pb-[200px] px-1">
          {messages && messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <ChatBlock
                  key={message.id}
                  role={message.role}
                  content={message.content}
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
